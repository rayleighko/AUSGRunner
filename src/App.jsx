import React, {Component} from 'react'
import {Grid, Header, List, Segment } from 'semantic-ui-react'
import {TRexContainer} from './containers'

import {BrowserRouter as Router, Route} from 'react-router-dom'

import { Connect, withAuthenticator } from 'aws-amplify-react'
import Amplify, { graphqlOperation } from 'aws-amplify'

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

// class NewMap extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mapName: ''
//       }
//     }

//   handleChange = (event) => {
//     let change = {}
//     change[event.target.name] = event.target.value
//     this.setState(change)
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault()
//     const NewMap = `mutation NewMap($name: String!) {
//       createMap(input: {name: $name}) {
//         id
//         name
//       }
//     }`

//     const result = await API.graphql(graphqlOperation(NewMap, { name: this.state.mapName }))
//     console.info(`Created map with id ${result.data.createMap.id}`)
//     this.setState({ mapName: '' })
//   }

//   render() {
//     return (
//       <Segment>
//         <Header as='h3'>Add a new map</Header>
//           <Input
//           type='text'
//           placeholder='New Map Name'
//           icon='plus'
//           iconPosition='left'
//           action={{ content: 'Create', onClick: this.handleSubmit }}
//           name='mapName'
//           value={this.state.mapName}
//           onChange={this.handleChange}
//           />
//         </Segment>
//       )
//     }
// }

const ListPlayers = `query ListPlayers {
    listPlayers(limit: 9999) {
        items {
            id
            name
            bestScore
        }
    }
}`

const SubscribeToNewPlayers = `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      name
      bestScore
    }
  }
`

// const GetPlayer = `query GetPlayer($id: ID!, $nextTokenForLevels: String) {
//   getPlayer(id: $id) {
//     id
//     name
//     bestScore
//   }
// }`

class PlayersList extends React.Component {
  playerItems() {
    return this.props.players.sort(makeComparator('name')).map(player =>
      <List.Item key={player.id}>
      {player.name} 
      {player.bestScore}
      </List.Item>
    )
  }

  render() {
    return (
      <Segment>
        <Header as='h3'>Players Ranking</Header>
        <List divided relaxed>
          {this.playerItems()}
        </List>
      </Segment>
    )
  }
}

class PlayersListLoader extends React.Component {
    onNewPlayer = (prevQuery, newData) => {
        // When we get data about a new Player, we need to put in into an object
        // with the same shape as the original query results, but with the new data added as well
        let updatedQuery = Object.assign({}, prevQuery)
        updatedQuery.listPlayers.items = prevQuery.listPlayers.items.concat([newData.onCreatePlayer]);
        return updatedQuery;
    }

    render() {
        return (
            <Connect
                query={graphqlOperation(ListPlayers)}
                subscription={graphqlOperation(SubscribeToNewPlayers)}
                onSubscriptionMsg={this.onNewPlayer}
            >
                {({ data, loading }) => {
                    if (loading) { return <div>Loading...</div>; }
                    if (!data.listPlayers) return;

                return <PlayersList player={data.listPlayers.items} />;
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
            <Route path="/" exact component={TRexContainer}/>
            <Route path="/" exact component={PlayersListLoader}/>
          </Grid.Column>
        </Grid>
		</Router>
	)	
	}
}

export default withAuthenticator(App, {includeGreetings: true})