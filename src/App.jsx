import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Grid} from 'semantic-ui-react'
import { withAuthenticator } from 'aws-amplify-react'
import Amplify from 'aws-amplify'

import {TRexContainer, RankingContainer} from './containers'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports)

// class NewMap extends Component {
//   constructor(props) {
//     super(props)
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

// const GetPlayer = `query GetPlayer($id: ID!, $nextTokenForLevels: String) {
//   getPlayer(id: $id) {
//     id
//     name
//     bestScore
//   }
// }`

const App = () => (
  <Router>
    <Grid padded>
      <Grid.Column>
        <Route path="/" exact component={TRexContainer}/>
        <Route path="/" exact component={RankingContainer}/>
      </Grid.Column>
    </Grid>
  </Router>
)

export default withAuthenticator(App, {includeGreetings: true})