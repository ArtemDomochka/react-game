import React from 'react'
import './RightCP.css'
import settingsImg from '..//resources/settings.png'
import fullscreenImg from '..//resources/fullscreen.png'
import muteImg from '..//resources/mute.png'
import statsImg from '..//resources/stats.png'

const   RightCP = props => {

    return(
        <div className={"RightCP " + props.theme}>
            <div className="rButtonBlock">
                <div className="rButton rtop" onClick={()=>{props.handleSettingsClick(); props.buttonSound.play()}}>
                    <img src={settingsImg} alt="Settings" className="rpicture"/>
                </div>
                <div className="rButton" onClick={()=>{props.handleFullScreenClick(); props.buttonSound.play()}}>
                    <img src={fullscreenImg} alt="Fullscreen" className="rpicture"/>
                </div>
                <div className="rButton" onClick={()=>{props.handleMuteClick(); props.buttonSound.play()}}>
                    <img src={muteImg} alt="Mute" className="rpicture"/>
                </div>
                <div className="rButton rbot" onClick={()=>{props.handleStatsClick(); props.buttonSound.play()}}>
                    <img src={statsImg} alt="Stats" className="rpicture"/>
                </div>
            </div>
            
        </div>
    )
}

export default RightCP