import React from 'react'
import './Statistics.css'

const Statistics = props => {

    return(
        <div className="Statistics" style={{visibility:props.visibility}}>
            <button className="st-button" onClick={props.handleStatsClick}>
                X
            </button>
            <div className="stContent">
                <p>Victory: {props.statistics.win}</p>
                <p>Defeat: {props.statistics.lose}</p>
                <p>Tie: {props.statistics.tie}</p>
            </div>
        </div>
    )
}

export default Statistics
