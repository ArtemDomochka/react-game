import { render } from '@testing-library/react'
import React from 'react'
import './Timer.css'

class Timer extends React.Component { //props : start/stop status
    constructor(props){
        super(props)
        this.state = {
            
        }
    }


    sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    render(){
        return(
            <div>
                {minutes} : {seconds}
                <br/>
                <button onClick={()=>{start()}}>
                Start
                </button>
                <button onClick={()=>{stop()}}>
                Stop
                </button> 
    
            </div>
        )
    }
    
}

export default Timer