import React, {useState} from 'react'
import './Timer.css'

const Timer = props => { //props : start/stop status
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)


    const start = () => {

    }
    
    const stop = () => {
        
    }

    return(
        <div>
            {minutes} : {seconds}
        </div>
    )
}

export default Timer