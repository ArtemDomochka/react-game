import React from 'react'
import './Settings.css'

const Settings = props => {

    return(

        <div className="Settings" style={{visibility:props.visibility}}>
            Settings
        </div>

        // <div className="Settings" >
        //     <input
        //         type = "range"
        //         min = {0}
        //         max = {1}
        //         step={0.01}
        //         value={props.music.value}
        //         onChange={event=>{props.music.volume = event.target.valueAsNumber}}
        //     />
        // </div>
    )
}

export default Settings