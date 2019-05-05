import React from 'react'
import {Header, List } from 'semantic-ui-react'
import {graphqlOperation} from 'aws-amplify'
import {Connect} from 'aws-amplify-react'
import styled from 'styled-components'

const Wrap = styled.div`
    background-color: #1947a2
    color: #ffffff
    padding: 1rem;
    border: solid 0.1rem #9921ff
`

const ListPlayers = `
    query ListPlayers {
        listPlayers(limit: 9999) {
            items {
                id
                name
                bestScore
            }
        }
    }
`

const SubscribeToNewPlayers = `
    subscription OnCreatePlayer {
        onCreatePlayer {
        id
        name
        bestScore
        }
    }
`

const makeComparator = (key, order='asc') => (
    (a, b) => {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }
  
      const aVal = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
      const bVal = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]
  
      let comparison = 0
      if (aVal > bVal) {
          comparison = 1
        }
      if (aVal < bVal) {
          comparison = -1
        }
  
      return order === 'desc' ? (comparison * -1) : comparison
    }
)

export const PlayersList = ({players = []}) => {
    const playerItems = () => {
      return players.sort(makeComparator('name')).map(player =>
      <List.Item key={player.id}>{player.name} / {player.bestScore}</List.Item>
    )}
  
    return (
        <Wrap>
            <Header as='h3'>Players Ranking</Header>
            <List divided relaxed>
                {playerItems()}
            </List>
        </Wrap>
    )
  }
  
export const PlayersListLoader = () => {
    const onNewPlayer = (prevQuery, newData) => {
        // When we get data about a new Player, we need to put in into an object
        // with the same shape as the original query results, but with the new data added as well
        let updatedQueryItem = Object.assign({}, prevQuery).listPlayers.item
        updatedQueryItem = prevQuery.listPlayers.items.concat([newData.onCreatePlayer])
        
        return updatedQueryItem
    }
  
    return (
        <Connect
            query={graphqlOperation(ListPlayers)}
            subscription={graphqlOperation(SubscribeToNewPlayers)}
            onSubscriptionMsg={onNewPlayer}>
            {({ data, loading }) => {
                if (loading) {
                    return <div>Loading...</div> 
                }
                if (!data.listPlayers) {
                    return
                }
                return <PlayersList player={data.listPlayers.items} />
            }}
        </Connect>
    )
}
  