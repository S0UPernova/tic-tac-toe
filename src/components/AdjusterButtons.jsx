import React, { useState, useEffect } from "react"
export default function TestButtons(props) {
  const [gameInProgressStyle, setGameInProgressStyle] = useState("1")
  const [hidden, setHidden] = useState(false)
  const [tileSize, setTileSize] = useState(50)
  
  const resize = () => {
    if (window.innerWidth > 800) {
      setTileSize(100)
    } else {
      setTileSize(50)
    }
  }
  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    }
  })

  useEffect(() => {
    let setter = props.gameInProgress ? "0.5" : "1"
    setter && setGameInProgressStyle(setter)
  }, [props.gameInProgress])

  let styleGameInProgress = {
    opacity: gameInProgressStyle,
  }

  // let styleP = {
  //   margin: "0"
  // }

  let styleButton = {
    padding: "0",
    height: `${tileSize * .4}px`,
    width: `${tileSize * .4}px`,
    fontSize: `${tileSize * .3}px`,
    lineHeight: "5px",
    textAlign: "center",
    alignText: "center",
    margin: `${tileSize * .05}px ${tileSize * .03}px`
  }
  let collapseButton = {
    padding: "0",
    height: `${tileSize * .6}px`,
    width: `${tileSize * .8}px`,
    textAlign: "center",
    fontSize: `${tileSize * .5}px`,
  }
  let styleButtonDiv = {
    display: "flex",
    gap: ".2rem",
  }

  let styleLi = {
    padding: "0 0 0 0",
    width: `${tileSize}px`,
    height: `${tileSize}px`,
    display: "flex",
    flexWrap: "wrap",
    alignContent: "end",
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "dimgrey",
    color: "white",
    // adding boarder without adding width to the element
    boxShadow: "0 0 0 2px #000",
  }
  let styleButtonUl = {
    display: `${hidden ? "none" : "flex"}`,
    flexDirection: "column",
    gap: "1rem",
    listStyle: "none",
    padding: "0px 25px",
    position: "absolute",
    zIndex: "6"
  }
  const handleHidden = (e) => {
    setHidden(!hidden)
  }

  return (
    <>
      <button style={collapseButton} onClick={handleHidden}>{hidden ? ">" : "<"}</button>
      <ul style={styleButtonUl}>
        {props.board.map((row, i) => {
          return (
            <li key={`li${i}`} style={{ ...styleLi, top: `${110 * i}` }}>
              {/* <p style={styleP}>row {i + 1}</p> */}
              <div key={`div2${i}`} style={styleButtonDiv}>
                <button
                  style={styleButton}
                  key={`fifth${i}`}
                  data-offsetindex={i}
                  data-function={"offset"}
                  value={-1}
                  onClick={props.handleOffset}
                >{"<"}
                </button>

                <button
                  style={styleButton}
                  key={`third${i}`}
                  data-offsetindex={i}
                  data-function={"offset"}
                  value={1}
                  onClick={props.handleOffset}
                >{">"}
                </button>
              </div>
              <div key={`div3${i}`} style={styleButtonDiv}>
                <button
                  style={{ ...styleButton, ...styleGameInProgress }}
                  key={`sixth${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={-1}
                  onClick={props.handleRows}
                >-
                </button>

                <button
                  style={styleButton}
                  key={`fourth ${i}`}
                  data-row={i}
                  data-function={"col"}
                  value={1}
                  onClick={props.handleRows}
                >+
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}