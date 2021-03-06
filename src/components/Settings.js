import React from 'react'
import './Settings.css'

const Settings = props => {

    return(

        <div className="Settings" style={{visibility:props.visibility}}>
            <button className="set-button" onClick={props.handleSettingsClick}>
                X
            </button>
            <div className="setContent">

                <div className="tab"> 
                    <label>Music: </label>
                    <br/>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={props.musicVolume}
                        onChange={e=>props.changeMusicVolume(e.target.valueAsNumber)}
                    />
                    </div>
                    <br/>

                    <div className="tab"> 
                    <label>Game Sounds: </label>
                    <br/>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={props.buttonVolume}
                        onChange={e=>props.changeSoundVolume(e.target.valueAsNumber)}
                    />
                    </div>
                    <br/>

                <div className="tab"> 
                    <label>Difficalty:</label>
                    <br/>
                    <div onChange={props.handleDifficalty}>
                        <input type="radio" value="easy" name="dif"/> Easy
                        <input type="radio" value="hard" name="dif"/> Hard
                    </div>
                </div>


                <p>HotKeys:</p>
                <p>Fullscreen: f</p>
                <p>Mute/Unmute music: m</p>
                <p>Statistics: s</p>
                <p>Settings: Esc</p>
                <p>Play vs PC: q</p>
                <p>Play vs player: w</p>
                <p>Play auto-game: e</p>
            </div>          
        </div>

    )
}

export default Settings