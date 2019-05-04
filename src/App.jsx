import React, {Component} from 'react'
import {Divider, Form, Grid, Header, Input, List, Segment } from 'semantic-ui-react'
import {v4 as uuid} from 'uuid'
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

import { Connect, withAuthenticator, S3Image } from 'aws-amplify-react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'

// import {CreatedByContainer, HomeContainer, PlayGroundContainer} from './containers'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

function makeComparator(key, order='asc') {
  return (a, b) => {
    if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;

    const aVal = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
    const bVal = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (aVal > bVal) comparison = 1;
    if (aVal < bVal) comparison = -1;

    return order === 'desc' ? (comparison * -1) : comparison
  };
}

const ListMaps = `query ListMaps {
    listMaps(limit: 9999) {
        items {
            id
            name
        }
    }
}`

const SubscribeToNewMaps = `
  subscription OnCreateMap {
    onCreateMap {
      id
      name
    }
  }
`

const GetMap = `query GetMap($id: ID!, $nextTokenForLevels: String) {
  getMap(id: $id) {
    id
    name
    levels(sortDirection: DESC, nextToken: $nextTokenForLevels) {
      nextToken
      items {
        thumbnail {
          width
          height
          key
        }
      }
    }
  }
}`


class S3ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uploading: false }
  }
  
  uploadFile = async (file) => {
    const fileName = uuid();

    const result = await Storage.put(
      fileName, 
      file, 
      {
        customPrefix: { public: 'uploads/' },
        metadata: { mapid: this.props.mapId }
      }
    );

    console.log('Uploaded file: ', result);
  }

  onChange = async (e) => {
    this.setState({uploading: true});
    
    let files = [];
    for (var i=0; i<e.target.files.length; i++) {
      files.push(e.target.files.item(i));
    }
    await Promise.all(files.map(f => this.uploadFile(f)));

    this.setState({uploading: false});
  }

  render() {
    return (
      <div>
        <Form.Button
          onClick={() => document.getElementById('add-image-file-input').click()}
          disabled={this.state.uploading}
          icon='file image outline'
          content={ this.state.uploading ? 'Uploading...' : 'Add Levels' }
        />
        <input
          id='add-image-file-input'
          type="file"
          accept='image/*'
          multiple
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}


class LevelsList extends React.Component {
  levelItems() {
    return this.props.levels.map(level =>
      <S3Image 
        key={level.thumbnail.key} 
        imgKey={level.thumbnail.key.replace('public/', '')} 
        style={{display: 'inline-block', 'paddingRight': '5px'}}
      />
    )
  }

  render() {
    return (
      <div>
        <Divider hidden />
        {this.levelItems()}
      </div>
    )
  }
}

class NewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapName: ''
      }
    }

  handleChange = (event) => {
    let change = {}
    change[event.target.name] = event.target.value
    this.setState(change)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const NewMap = `mutation NewMap($name: String!) {
      createMap(input: {name: $name}) {
        id
        name
      }
    }`

    const result = await API.graphql(graphqlOperation(NewMap, { name: this.state.mapName }))
    console.info(`Created map with id ${result.data.createMap.id}`)
    this.setState({ mapName: '' })
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>Add a new map</Header>
          <Input
          type='text'
          placeholder='New Map Name'
          icon='plus'
          iconPosition='left'
          action={{ content: 'Create', onClick: this.handleSubmit }}
          name='mapName'
          value={this.state.mapName}
          onChange={this.handleChange}
          />
        </Segment>
      )
    }
}


class MapsList extends React.Component {
  mapItems() {
    return this.props.maps.sort(makeComparator('name')).map(map =>
      <List.Item key={map.id}>
        <NavLink to={`/maps/${map.id}`}>{map.name}</NavLink>
      </List.Item>
    )
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>My Maps</Header>
        <List divided relaxed>
          {this.mapItems()}
        </List>
      </Segment>
    )
  }
}


class MapDetailsLoader extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            nextTokenForLevels: null,
            hasMoreLevels: true,
            map: null,
            loading: true
        }
    }

    async loadMoreLevels() {
        if (!this.state.hasMoreLevels) return;

        this.setState({ loading: true });
        const { data } = await API.graphql(graphqlOperation(GetMap, {id: this.props.id, nextTokenForLevels: this.state.nextTokenForLevels}));
  
        let map;
        if (this.state.map === null) {
            map = data.getMap;
        } else {
            map = this.state.map;
            map.levels.items = map.levels.items.concat(data.getMap.levels.items);
        }
        this.setState({ 
            map: map,
            loading: false,
            nextTokenForLevels: data.getMap.levels.nextToken,
            hasMoreLevels: data.getMap.levels.nextToken !== null
        });
    }

    componentDidMount() {
        this.loadMoreLevels()
    }

    render() {
        return (
            <MapDetails 
                loadingLevels={this.state.loading} 
                map={this.state.map} 
                loadMoreLevels={this.loadMoreLevels.bind(this)} 
                hasMoreLevels={this.state.hasMoreLevels} 
            />
        );
    }
}


class MapDetails extends Component {
  render() {
        if (!this.props.map) return 'Loading map...'
        return (
            <Segment>
            <Header as='h3'>{this.props.map.name}</Header>
            <S3ImageUpload mapId={this.props.map.id}/>        
            <LevelsList levels={this.props.map.levels.items} />
            {
                this.props.hasMoreLevels && 
                <Form.Button
                onClick={this.props.loadMoreLevels}
                icon='refresh'
                disabled={this.props.loadingLevels}
                content={this.props.loadingLevels ? 'Loading...' : 'Load more levels'}
                />
            }
            </Segment>
        )
  }
}

class MapsListLoader extends React.Component {
    onNewMap = (prevQuery, newData) => {
        // When we get data about a new map, we need to put in into an object
        // with the same shape as the original query results, but with the new data added as well
        let updatedQuery = Object.assign({}, prevQuery)
        updatedQuery.listMaps.items = prevQuery.listMaps.items.concat([newData.onCreateMap]);
        return updatedQuery;
    }

    render() {
        return (
            <Connect
                query={graphqlOperation(ListMaps)}
                subscription={graphqlOperation(SubscribeToNewMaps)}
                onSubscriptionMsg={this.onNewMap}
            >
                {({ data, loading }) => {
                    if (loading) { return <div>Loading...</div>; }
                    if (!data.listMaps) return;

                return <MapsList maps={data.listMaps.items} />;
                }}
            </Connect>
        );
    }
}

class App extends Component {
	render() {
	return (
		<Router>
        <Grid padded>
          <Grid.Column>
            <Route path="/" exact component={NewMap}/>
            <Route path="/" exact component={MapsListLoader}/>

            <Route
              path="/maps/:mapId"
              render={ () => <div><NavLink to='/'>Back to Map list</NavLink></div> }
            />
            <Route
              path="/maps/:mapId"
              render={ props => <MapDetailsLoader id={props.match.params.mapId}/> }
            />
          </Grid.Column>
        </Grid>
		</Router>
	)	
	}
}

export default withAuthenticator(App, {includeGreetings: true})