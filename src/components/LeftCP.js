import React from 'react'
import './LeftCP.css'
import vsPC from '../resources/monitor.jpeg'
import PvP from '../resources/PvP.png'
import autoGame from '..//resources/autoplay.png'

const   LeftCP = props => {

    return(
        <div className="LeftCP">
            <div className="ButtonBlock">
                <div className="Button" onClick={props.playNewGameVsPc}>
                    <img src={vsPC} alt="VS PC" className="picture"/>
                </div>
                <div className="Button" onClick={props.playNewGameVsPlayer}>
                    <img src={PvP} alt="PvP" className="picture"/>
                </div>
                <div className="Button" onClick={props.playAutoGame}> 
                    <img src={autoGame} alt="Auto Game" className="picture"/>
                </div>
            </div>

            <div className="Stats">
                WINS:
                <br/>
                {props.wins}
            </div>
          
            

        </div>
    )
}

export default LeftCP