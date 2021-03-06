import React from 'react'
import './Message.css'

const Message = props => {
    return(
        <div className={"MessageM " + props.theme} style={{visibility: props.messageVisibility}}>
            {props.message}
        </div>
    )
}

export default Message