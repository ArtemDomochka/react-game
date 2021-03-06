import React from 'react'
import './Settings.css'

const Settings = props => {

    return(

        <div className={"Settings " + props.theme} style={{visibility:props.visibility}}>
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
                        <input type="radio" value="hard" name="dif" defaultChecked/> Hard
                    </div>
                </div>

                <br/>
                <div className="tab"> 
                    <label>Theme:</label>
                    <br/>
                    <div onChange={props.handleChangeTheme}>
                        <input type="radio" value="blue" name="theme" defaultChecked/> Blue
                        <input type="radio" value="red" name="theme"/> Red
                    </div>
                </div>
                <br/>

                <div className="tab"> 
                    <label>Board Size:</label>
                    <br/>
                    <div onChange={props.handleChangeBoardSize}>
                        <input type="radio" value={70} name="size" defaultChecked/> 70%
                        <input type="radio" value={85} name="size"/> 85%
                        <input type="radio" value={100} name="size"/> 100%
                    </div>
                </div>

                <p>HOTKEYS: Fullscreen=F; Mute/Unmute music=M; Statistics=S; Settings=Esc; PlayVsPC=Q; PlayVsPlayer=W; PlayAutoGame=E</p>
 
            </div>          
        </div>

    )
}

export default Settings