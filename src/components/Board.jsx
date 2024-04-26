import {useState} from 'react'

import Square from "./Square"

const Board = ({ playerOneWins, setPlayerOneWins, playerTwoWins, setPlayerTwoWins, setTies, ties }) => {
    
    const [squareValues, setSquareValues] = useState(new Array(9).fill(''))
    const [nextMark, setNextMark] = useState('X')
    const [needsReset, setNeedsReset] = useState(false)


    //const squareArray = [1,2,3,4,5,6,7,8,9]
    const squareArray = new Array(9).fill(1)

    const clickSquare = (idx) => {
        if(needsReset) { return }
        if(squareValues[idx]) { return }
        const newVals = [...squareValues]
        //initially only equal X
        newVals[idx] = nextMark
        setSquareValues(newVals)
        checkWinConditions(newVals)
        changeNextMark()
    }

    const changeNextMark = () => {
        const m = nextMark === 'X' ? 'O' : 'X'
        setNextMark(m)
    }

    const checkWinConditions = (vals) => {

        const winConditions = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        let won = false;
        winConditions.forEach((wc => {
            if(vals[wc[0]] && vals[wc[0]] === vals[wc[1]] && vals[wc[0]] === vals[wc[2]]) {
                handleWin(vals[wc[0]])
                won = true
            }
        }))
        if(!vals.includes('') && !won) {
            handleTie()
        }
    }

    const handleWin = (mark) => {
        setNeedsReset(true)
        if(mark === 'X') {
            setPlayerOneWins(playerOneWins + 1)
        }
        if(mark=='O') {
            setPlayerTwoWins(playerTwoWins + 1)
        }
    }

    const handleTie = () => {
        setNeedsReset(true)
        setTies(ties + 1)
    }
    const handleReset = () => {
        setSquareValues(new Array(9).fill(''))
        setNextMark('X')
        setNeedsReset(false)
    }

    return (
        <div data-testid='tttboard' className='board'>
            {squareArray.map((s, idx) =>
                <Square key={'square' + idx} idx={idx} mark={squareValues[idx]} clickSquare={clickSquare}/>
            )}
            <button onClick={handleReset}>Reset Board</button>
        </div>
    )
}

export default Board