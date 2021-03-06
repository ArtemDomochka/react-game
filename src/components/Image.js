import React from 'react'
import './Image.css'

class Image extends React.Component{
    constructor(props){
        super(props)
        this.state={
            style : "image"
        }
        this.onClick = this.onClick.bind(this)
    }

    onClick(e){
        if(this.state.style === "image"){
            this.setState({
                style: "imageR1"
            })
        }else{
            let style = this.state.style==="imageR1" ? "imageR2" : "imageR1"
            this.setState({
                style: style
            })
        } 
        this.props.onCellClick(e)
    }

    render(){
        return(
            <img src={this.props.crossImg} alt="Cross" 
             className={this.state.style}
             id={this.props.id}
             onClick={e=>this.onClick(e)}
            />
        )
    }
}

export default Image