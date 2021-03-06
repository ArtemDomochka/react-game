import React from 'react'
import './Image.css'

class Image extends React.Component{



    

    render(){
        return(
            <img src={this.props.crossImg} alt="Cross" className="image"/>
        )
    }
}

export default Image