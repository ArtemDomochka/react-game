import React from 'react'
import './MessageScreen.css'

const MessageScreen = props => {

    return(
        <div className={"MessageScreen " + props.theme}>
            {props.message}
        </div>
    )
}

export default MessageScreen