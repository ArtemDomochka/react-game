import React from 'react'
import './RightCP.css'
import pic from '../resources/logo.png'

const   RightCP = props => {

    return(
        <div className="RightCP">
            <div className="rButton" onClick={props.handleSettings}>
                <img src={pic} alt="Auto Game" className="rpicture"/>
            </div>
            <div className="rButton" onClick={props.handleFullScreenClick}>
                <img src={pic} alt="Auto Game" className="rpicture"/>
            </div>
            <div className="rButton" onClick={props.handleMuteClick}>
                <img src={pic} alt="Auto Game" className="rpicture"/>
            </div>
            <div className="rButton" onClick={()=>{alert("Stats")}}>
                <img src={pic} alt="Auto Game" className="rpicture"/>
            </div>
        </div>
    )
}

export default RightCP