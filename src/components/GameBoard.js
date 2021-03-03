import React from 'react'
import './GameBoard.css'

const GameBoard = props => {

    return(
        <table className="GameBoard" style={{borderCollapse: 'collapse'}}>
            <tbody>
                <tr>
                    <td id={0} className={props.boardStatus[0]} onClick={props.onCellClick}></td>
                    <td id={1} className={props.boardStatus[1]} onClick={props.onCellClick}></td>
                    <td id={2} className={props.boardStatus[2]} onClick={props.onCellClick}></td>
                </tr>
                <tr>
                    <td id={3} className={props.boardStatus[3]} onClick={props.onCellClick}></td>
                    <td id={4} className={props.boardStatus[4]} onClick={props.onCellClick}></td>
                    <td id={5} className={props.boardStatus[5]} onClick={props.onCellClick}></td>
                </tr>
                <tr>
                    <td id={6} className={props.boardStatus[6]} onClick={props.onCellClick}></td>
                    <td id={7} className={props.boardStatus[7]} onClick={props.onCellClick}></td>
                    <td id={8} className={props.boardStatus[8]} onClick={props.onCellClick}></td>
                </tr>
            </tbody>
        </table>  
    )
}

export default GameBoard