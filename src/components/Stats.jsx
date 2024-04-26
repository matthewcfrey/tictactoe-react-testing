import {useState} from 'react'

const Stats = ({playerOneWins, playerTwoWins, ties}) => {

    return (
        <div>
            <h3>Player One Wins: {playerOneWins}</h3>
            <h3>Player Two Wins: {playerTwoWins} </h3>
            <h3>Ties: {ties}</h3>
        </div>
    )
}

export default Stats