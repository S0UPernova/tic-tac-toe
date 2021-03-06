import React, { useState, useEffect } from "react"

import WinningLength from "./winLineLength"
import ResetButtons from "./ResetAndClear"

export default function TopBarAndDropdown(props) {

  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    props.tileSize < 100 ? setHidden(true) : setHidden(false)
  }, [props.tileSize])

  const style = {
    div: {
      padding: "0",
      width: "100%",
      overflowX: "hidden",
      marginTop: "0",
      justifyContent: "center",
      flexDirection: `${props.tileSize < 100 ? "column" : "row"}`,
      display: `${hidden ? "none" : "flex"}`,
      marginBottom: "1rem"
    },
    collapseButton: {
      pointerEvents: "auto",
      display: `${props.tileSize < 100 ? "inline-block" : "none"}`,
      float: `${props.rightHanded ? "right" : "left"}`,
      // left: `${props.rightHanded ? "auto" : "1rem"}`,
      // right: `${props.rightHanded ? "1rem" : "auto"}`,
      padding: "0",
      height: `${props.tileSize * .6}px`,
      width: `${props.tileSize}px`,
      textAlign: "center",
      fontSize: `${props.tileSize * .5}px`,
      // zIndex: "8",
      border: "none",
      boxShadow: "1px 2px 3px grey",
    },
    handSwap: {
      padding: ".5rem",
      marginLeft: `${props.tileSize < 100 ? "auto" : "1rem"}`,
      marginRight: `${props.tileSize < 100 ? "auto" : "1rem"}`,
      marginBottom: `${props.tileSize < 100 ? "0" : "1rem"}`,
      height: "2.5rem"
    },
    container: {
      position: `absolute`,
      overflow: `${!hidden && props.tileSize < 100 ? "hidden" : "visible"}`,
      zIndex: "9",
      pointerEvents: `${hidden && props.tileSize < 100 ? "none" : "auto"}`,
      top: `${props.tileSize < 100 ? "120px" : "70px"}`,
      width: "80%",
      left: "10%",
      marginRight: "auto",
      backgroundColor: `${!hidden && props.tileSize < 100 ? "rgba(175, 175, 175, 0.5)" : "transparent"}`,
      // kind of like this color... seems a bit like glass, maybe make that a theme of some of this
      // backgroundColor: `${!hidden && props.tileSize < 100 ? "rgba(175, 200, 200, 0.5)" : "transparent"}`,
      backdropFilter: `${!hidden && props.tileSize < 100 ? "blur(4px)" : "blur(0px)"}`,
      borderRadius: "20px",
      boxShadow: `${!hidden && props.tileSize < 100 ? `${props.tileSize * 0.02}px ${props.tileSize * 0.02}px ${props.tileSize * 0.04}px grey` : "0 0 0 0 transparent"}`,

    }
  }

  const handleHidden = () => {
    setHidden(!hidden)
  }

  return (
    <div style={style.container}>
      <button style={style.collapseButton} onClick={handleHidden}>{
        hidden ? "\\/" : "/\\"
      }</button>
      <div style={style.div}>

        <button style={style.handSwap} onClick={() => {
          props.dispatch({ type: "rightHanded" })
        }}>swap hands</button>
        <WinningLength
          dispatch={props.dispatch}
          winLength={props.winLength}
          tileSize={props.tileSize}
          handleWinLength={props.handleWinLength}
          gameInProgress={props.gameInProgress}
        />
        <ResetButtons
          dispatch={props.dispatch}
          handleOffset={props.handleOffset}
          handleRows={props.handleRows}
          gameInProgress={props.gameInProgress}
        />
      </div>
    </div>
  )
}
