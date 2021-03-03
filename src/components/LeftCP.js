import React from 'react'
import './LeftCP.css'
import pic from '../resources/logo.png'

const   LeftCP = props => {

    return(
        <div className="LeftCP">
            <div className="ButtonBlock">
                <div className="Button" onClick={props.playNewGameVsPc}>
                    <img src={pic} alt="Auto Game" className="picture"/>
                </div>
                <div className="Button" onClick={props.playNewGameVsPlayer}>
                    <img src={pic} alt="Auto Game" className="picture"/>
                </div>
                <div className="Button" onClick={props.playAutoGame}> 
                    <img src={pic} alt="Auto Game" className="picture"/>
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