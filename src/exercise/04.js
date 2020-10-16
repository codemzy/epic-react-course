// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils'; // extra 2

function Board({onClick, squares}) {

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
    // state
    // const [squares, setSquares] = useLocalStorageState("squares", Array(9).fill(null)); // now handled in history
    const [history, setHistory] = useLocalStorageState("ttt-history", [Array(9).fill(null)]); // extra 3 - add history
    const [currentStep, setCurrentStep] = useLocalStorageState("ttt-step", 0);
    // status
    const currentSquares = history[currentStep];
    const nextValue = calculateNextValue(currentSquares);
    const winner = calculateWinner(currentSquares);
    const status = calculateStatus(winner, currentSquares, nextValue);
    const moves = history.map((stepSquares, step) => {
        let isCurrent = step === currentStep;
        return (
            <li key={step}>
                <button disabled={isCurrent} onClick={() => setCurrentStep(step)}>{ step === 0 ? "Go to game start" : `Go to move ${step}` } {isCurrent ? '(current)' : null}</button>
            </li>
        );
    });


  function selectSquare(square) {
        let squaresCopy = [...history[currentStep]];
        if (winner || squaresCopy[square]) {
            return false;
        } else {
            let nextStep = currentStep + 1;
            squaresCopy[square] = nextValue;
            let prevHistory = history.slice(0, nextStep);
            setHistory([...prevHistory, squaresCopy]);
            setCurrentStep(nextStep);
        }
  }

  function restart() {
    setCurrentStep(0);
    setHistory([Array(9).fill(null)]);
  }
    
  return (
    <div className="game">
        <div className="game-board">
            <Board onClick={selectSquare} squares={currentSquares} />
            <button className="restart" onClick={restart}>restart</button>
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
        </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
