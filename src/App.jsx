import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Stats from './components/Stats'
import Board from './components/Board'

function App() {

  const [playerOneWins, setPlayerOneWins] = useState(0)
  const [playerTwoWins, setPlayerTwoWins] = useState(0)
  const [ties, setTies] = useState(0)

  return (
    <div>
      <Header />
      <Stats playerOneWins={playerOneWins} playerTwoWins={playerTwoWins} ties={ties}/>
      <Board 
      setPlayerOneWins={setPlayerOneWins}
      playerOneWins={playerOneWins}
      setPlayerTwoWins={setPlayerTwoWins}
      playerTwoWins={playerTwoWins}
      setTies={setTies}
      ties={ties}
      />
    </div>
  )
}

export default App
