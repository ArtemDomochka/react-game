import React from 'react'
import './GameBoard.css'
import crossImg from '..//resources/cross.png'
import circleImg from '..//resources/circle.png'
import emptyImg from '..//resources/empty.png'
import winnerImg from '..//resources/crown.png'
import Image from './Image'

const GameBoard = props => {
    

const formatBoard = () => {
    let board = []

    for(let i = 0; i < 3; i++){
        let row = []
        for(let j = 0; j < 3; j++){
            row.push(props.boardStatus[i*3 + j])
        }
        board.push(row)
    }
    
    let boardJSX = board.map((item, index1) => {
        return(
            <div key={index1} className="btn-clm">
                {item.map((item, index2) => {
                    return(
                        <div key={index2} className="btn" onClick={props.onCellClick}>
                            {
                                item === "winner"
                                ? <img src={winnerImg} alt="Empty" className="pct" id={index1*3 + index2}/>
                                : item === "empty"
                                  ? <img src={emptyImg} alt="Empty" className="pct" id={index1*3 + index2}/>
                                  : item === "cross"
                                    ? <Image crossImg={crossImg} id={index1*3 + index2}
                                        />  //<img src={crossImg} alt="Cross" className="pct" id={index1*3 + index2}/>
                                    : <img src={circleImg} alt="Circle" className="pct" id={index1*3 + index2}  />
                                
                            }
                        </div>
                    )
                })}
            </div>
        )
    })

    return boardJSX
}


    return(
        <div className="GameBoard">
            {formatBoard()}
        </div>
    )
}

export default GameBoard