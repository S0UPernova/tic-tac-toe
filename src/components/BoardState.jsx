import React, { useState, useEffect } from "react"
import Gameboard from "./BoardDisplay"
import CheckForWinOrDraw from "../functions/checkForWinOrDraw"
import CurrentPlayerDisplay from "./CurrentPlayerDisplay"
import GameOverModal from "./GameOverModal"
import ChangeOffset from "../functions/changeOffset"
import ChangeNumberOfRows from "../functions/changeNumberOfRows"
import ChangeRowColLength from "../functions/changeRowColLength"
import ShiftButtons from "./BoardShiftButtons"
import AddRemoveRowButtons from "./AddRemoveRowButtons"
import AdjusterBottons from "./RowAdjusterButtons"
import ControlBar from "./ContolBar"

export default function GameState() {
  // setup
  const startingWinLength = 3
  const startingOffset = [0, 0, 0]
  const offsetRange = 6
  const playerOne = "X"
  const playerTwo = "O"
  // board can be changed, and getLongestLine will adapt
  const startingBoard = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ]

  // state
  const [board, setBoard] = useState(startingBoard)
  const [message, setMessage] = useState(``)
  const [offset, setOffset] = useState(startingOffset)
  const [gameover, setGameover] = useState(false)
  const [curPlayerX, setCurPlayerX] = useState(true)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [winLength, setWinLength] = useState(startingWinLength)
  const [boardShift, setBoardShift] = useState(0)
  const [rightHanded, setRightHanded] = useState(false)
  const [tileSize, setTileSize] = useState(100)


  useEffect(() => {
    let checkForWin = CheckForWinOrDraw(board, playerOne, playerTwo, winLength, offset)
    switch (checkForWin) {
      case "draw":
        setMessage(`Draw`)
        setGameover(true)
        break
      case "player1":
        setMessage(`${playerOne} wins`)
        setGameover(true)
        break
      case "player2":
        setMessage(`${playerTwo} wins`)
        setGameover(true)
        break
      default:
        break
    }
  }, [board, offset, winLength])

  const resize = () => {
    const sizeOne = 100
    const sizeTwo = 75
    const sizeThree = 60
    const sizeFour = 50
    if (window.innerWidth > 800) {
      setTileSize(sizeOne)
    } else if (window.innerWidth > 600) {
      setTileSize(sizeTwo)
    } else if (window.innerWidth > 400) {
      setTileSize(sizeThree)
    } else {
      setTileSize(sizeFour)
    }
  }
  useEffect(() => {
    resize()
  })
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    }
  })

  function resetGame() {
    setMessage(``)
    setCurPlayerX(true)
    setBoard(startingBoard)
    setOffset(startingOffset)
    setGameover(false)
    setWinLength(startingWinLength)
    setGameInProgress(false)
  }
  function resetBoard() {
    setBoard(startingBoard)
    setOffset(startingOffset)
    setCurPlayerX(true)
    setGameInProgress(false)
  }
  function clearBoard() {
    let boardMutalator = board
    boardMutalator.forEach((row, i) => {
      row.forEach((col, j) => {
        boardMutalator[i][j] = " "
      })
    })
    setBoard(boardMutalator)
    setCurPlayerX(true)
    setGameInProgress(false)
    setGameover(false)
  }
  function resetOffset() {
    if (!gameInProgress) {
      let offsetArr = []
      board.forEach(arr => offsetArr.push(Number(0)))
      setOffset(offsetArr)
    }
  }

  let handleOffset = (event) => {
    if (gameover === false) {
      switch (event.target.value) {
        case "1":
        case "-1":
          let setter = ChangeOffset(event, offset, offsetRange)
          setter && setOffset(setter)
          gameInProgress && setCurPlayerX(!curPlayerX)
          break
        case "reset":
          resetOffset()
          break
        default:
          break
      }
    }
  }

  let handleRows = (e) => {
    if (gameover === false) {
      switch (e.target.dataset.function) {
        case "row":
          switch (e.target.value) {
            case "1":
              gameInProgress && setCurPlayerX(!curPlayerX)
            case "-1":
              let returnedObj = ChangeNumberOfRows(e, board, offset, gameInProgress)
              if (returnedObj) {
                setBoard(returnedObj.board)
                setOffset(returnedObj.offset)
              }
              break
            case "reset":
              if (!gameInProgress) {
                resetBoard()
              }
              break
            default:
              break
          }
          break
        case "col":
          switch (e.target.value) {
            case "1":
              gameInProgress && setCurPlayerX(!curPlayerX)
            case "-1":
              let returnedVal = ChangeRowColLength(e, board, gameInProgress)
              returnedVal && setBoard(returnedVal)
              break
            case "reset":
              resetBoard()
              break
            case "clear":
              clearBoard()
              break
            default:
              break
          }
          break
        default:
          break
      }
    }
  }
  const handleHanded = (e) => {
    setRightHanded(!rightHanded)
  }

  let handleWinLength = (e) => {
    if (!gameInProgress) {
      switch (e.target.value) {
        case "1":
          if (winLength + 1 <= 15) {
            setWinLength(winLength + 1)
          }
          break
        case "-1":
          if (winLength - 1 > 1) {
            setWinLength(winLength - 1)
          }
          break
        default:
          break
      }
    }
  }

  const handleShift = (input) => {
    switch (input) {
      case "-1":
        setBoardShift(boardShift - 1)
        break
      case "1":
        setBoardShift(boardShift + 1)
        break
      case "reset":
        setBoardShift(0)
        break
      default:
        break
    }
  }

  let handleClick = (e) => {
    let stateMutatorVariable = board
    let row = e.target.dataset.row
    let col = e.target.dataset.col
    if (gameover === false
      && board[row][col] === " ") {
      stateMutatorVariable[row][col] = curPlayerX ? playerOne : playerTwo
      setBoard([
        ...stateMutatorVariable
      ])
      setCurPlayerX(!curPlayerX)
      setGameInProgress(true)
    }
  }

  return (
    <>
      <ControlBar
        tileSize={tileSize}
        rightHanded={rightHanded}
        winLength={winLength}
        gameInProgress={gameInProgress}
        handleWinLength={handleWinLength}
        handleHanded={handleHanded}
        handleOffset={handleOffset}
        handleRows={handleRows}
      />
      <AddRemoveRowButtons
        handleRows={handleRows}
        gameInProgress={gameInProgress}
      />
      <CurrentPlayerDisplay
        curPlayerX={curPlayerX}
        playerOne={playerOne}
        playerTwo={playerTwo}
      />
      <GameOverModal
        message={message}
        gameover={gameover}
        resetGame={resetGame}
        clearBoard={clearBoard}
      />
      <AdjusterBottons
        board={board}
        offset={offset}
        tileSize={tileSize}
        rightHanded={rightHanded}
        gameInProgress={gameInProgress}
        handleOffset={handleOffset}
        handleRows={handleRows}
      />
      <Gameboard
        board={board}
        offset={offset}
        tileSize={tileSize}
        boardShift={boardShift}
        handleRows={handleRows}
        handleClick={handleClick}
        handleOffset={handleOffset}
      />
      <ShiftButtons
        handleShift={handleShift}
      />
    </>
  )
}