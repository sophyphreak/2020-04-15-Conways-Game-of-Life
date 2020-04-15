import React, {useState, useEffect} from 'react'

const GameOfLife = () => {
    const [board, setBoard] = useState(initialBoard())
        
    useEffect(() => {
        setTimeout(() => {
            setBoard(incrementTime(board))
        }, 100)
    }, [board])


    return (
    <div>{
        board.map((row, rowIndex) => (
            <><div key={rowIndex} style={{display: 'flex'}}>{
            row.map((cell, cellIndex) => 
                <div key={cellIndex} style={{backgroundColor: (cell ? 'white' : 'black'), height: '10px', width: '10px'}}></div>
)}</div></>
        ))
        }</div>
    )
}

export default GameOfLife

const initialBoard = () => {
    let board = Array(75)
    board.fill([])
    board = board.map(row => Array(100).fill(false))
    board = board.map(row => row.map((cell, cellIndex) => Math.random() > .5))
    return board
}

const incrementTime = board => {
    let newBoard = board.map((row, rowIndex) => row.map((cell, cellIndex) => {
        let neighboringAlive = 0

        let prevRow = rowIndex === 0 ? board.length - 1 : rowIndex - 1
        let prevCell = cellIndex === 0 ? row.length - 1 : cellIndex - 1
        let nextRow = rowIndex === board.length - 1 ? 0 : rowIndex + 1
        let nextCell = cellIndex === row.length - 1 ? 0 : rowIndex + 1

        if (board[prevRow][prevCell]) neighboringAlive++
        if (board[prevRow][cellIndex]) neighboringAlive++
        if (board[prevRow][nextCell]) neighboringAlive++
        if (board[rowIndex][prevCell]) neighboringAlive++
        if (board[rowIndex][nextCell]) neighboringAlive++
        if (board[nextRow][prevCell]) neighboringAlive++
        if (board[nextRow][cellIndex]) neighboringAlive++
        if (board[nextRow][nextCell]) neighboringAlive++

        if (cell) {
            if (neighboringAlive < 2) {
                return false
            }
            if (2 === neighboringAlive || neighboringAlive === 3) {
                return true
            }
            if (3 < neighboringAlive) {
                return false
            }
        }
        if (!cell && neighboringAlive === 3) {
            return true
        }
        return false
    }))
    return newBoard
}