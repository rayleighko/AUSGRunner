import React from 'react'
import styled from 'styled-components'
import {PlayersListLoader} from '../components/PlayerList'

const Wrap = styled.div`
    background-color: #1947a2
    color: #ffffff
    padding: 1rem;
    border: solid 0.1rem #9921ff
`

export const RankingContainer = () => {
    return (
        <Wrap>
            <PlayersListLoader />
        </Wrap>
    )
}