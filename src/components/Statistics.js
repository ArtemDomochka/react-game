import React from 'react'
import './Statistics.css'

const Statistics = props => {

    return(
        <div className={"Statistics " + props.theme} style={{visibility:props.visibility}}>
            <button className="st-button" onClick={props.handleStatsClick}>
                X
            </button>

            <div className="tabS"> 
                <div className="head">
                    Date/Mode/Winner:
                </div>
                
                {props.statistics.map((item, index)=>{
                    return(
                        <div key={index} className="lineS">
                            {item.date} || {item.mode==="vsPc"?"versComp":item.mode} || {item.winner}
                        </div>
                    )
                })}

                
            </div>

        </div>
    )
}

export default Statistics
