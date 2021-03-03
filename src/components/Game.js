import React from 'react'
import './Game.css'
import GameBoard from './GameBoard'
import Footer from './Footer'
import LeftCP from './LeftCP'
import RightCP from './RightCP'
import MessageScreen from './MessageScreen'
import musicSound from '../resources/soundtrack.mp3'

const music = new Audio(musicSound)

class Game extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status: "playing",
            player: "X",
            message: "Welcome!",
            mode: "vsPc",   
            boardStatus : [
                "empty","empty","empty",
                "empty","empty","empty",
                "empty","empty","empty"
            ],
            wins: 0
        }

        this.onCellClick = this.onCellClick.bind(this);
        this.refreshGame = this.refreshGame.bind(this);
        this.playAutoGame = this.playAutoGame.bind(this);
    }

    componentDidMount(){
        music.volume = 0
        music.loop = true
        music.play()
    }

    onCellClick(event){
        if(this.state.status !== "playing"){
            return
        }
        //change color
        const cellId = event.target.id
        if(this.state.boardStatus[cellId] === "empty"){
            let boardStatus = this.state.boardStatus
            if(this.state.player === "X"){
                boardStatus[cellId] = "cross"
                this.setState({
                    boardStatus: boardStatus,
                    player: "O"
                })
            }else{
                boardStatus[cellId] = "circle"
                this.setState({
                    boardStatus: boardStatus,
                    player: "X"
                })
            }
        }else{
            console.log("you cant play there");
        }

        if(this.state.mode === "vsPc"){
            this.makePcTurn()
        }

        if(this.isGameFinished()){
            this.setState({
                status: "notPlaying"
            })
        }


    }

    makePcTurn(){ 
        for(let i = 0; i < this.state.boardStatus.length; i++){ 
            if(this.state.boardStatus[i] === "empty"){
                let boardStatus = this.state.boardStatus
                boardStatus[i] = "circle"
                this.setState({
                    boardStatus: boardStatus,
                    player: "X"
                })
                break;
            }
        }
    }

    isGameFinished(){
        let victoryCells = []
        //check for victory
        if(this.state.boardStatus[0] !== "empty"
            && this.state.boardStatus[0] === this.state.boardStatus[1]
            && this.state.boardStatus[1] === this.state.boardStatus[2])
        {
            victoryCells = [0,1,2]    
        } else if(this.state.boardStatus[3] !== "empty"
            && this.state.boardStatus[3] === this.state.boardStatus[4]
            && this.state.boardStatus[4] === this.state.boardStatus[5])
        {
            victoryCells = [3,4,5]    
        } else if(this.state.boardStatus[6] !== "empty"
            && this.state.boardStatus[6] === this.state.boardStatus[7]
            && this.state.boardStatus[7] === this.state.boardStatus[8])
        {
            victoryCells = [6,7,8]    
        }  else if(this.state.boardStatus[0] !== "empty"
            && this.state.boardStatus[0] === this.state.boardStatus[3]
            && this.state.boardStatus[3] === this.state.boardStatus[6])
        {
            victoryCells = [0,3,6]    
        }  else if(this.state.boardStatus[1] !== "empty"
            && this.state.boardStatus[1] === this.state.boardStatus[4]
            && this.state.boardStatus[4] === this.state.boardStatus[7])
        {
            victoryCells = [1,4,7]    
        }  else if(this.state.boardStatus[2] !== "empty"
            && this.state.boardStatus[2] === this.state.boardStatus[5]
            && this.state.boardStatus[5] === this.state.boardStatus[8])
        {
            victoryCells = [2,5,8]    
        }  else if(this.state.boardStatus[0] !== "empty"
            && this.state.boardStatus[0] === this.state.boardStatus[4]
            && this.state.boardStatus[4] === this.state.boardStatus[8])
        {
            victoryCells = [0,4,8]    
        }  else if(this.state.boardStatus[2] !== "empty"
            && this.state.boardStatus[2] === this.state.boardStatus[4]
            && this.state.boardStatus[4] === this.state.boardStatus[6])
        {
            victoryCells = [2,4,6]    
        }

        if(victoryCells.length === 3){
            let boardStatus = this.state.boardStatus
            boardStatus[victoryCells[0]] = "winner"
            boardStatus[victoryCells[1]] = "winner"
            boardStatus[victoryCells[2]] = "winner"

            this.setState({
                boardStatus: boardStatus,
                message: `Player ${this.state.player} won!`,
            })

            if(this.state.mode === "vsPc" && this.state.player === "X"){
                this.setState({
                    wins: this.state.wins + 1
                })              
            }

            return true
        }

        //check for tie
        let tie = true
        for(let i = 0; i < this.state.boardStatus.length; i++){
            if(this.state.boardStatus[i] === "empty"){
                tie = false
            }
        }
        if(tie === true){
            this.setState({
                message: "Tie!",
            })
            return true
        }

    }

    playAutoGame(){
        this.setState({
            message: "mode: Auto Game",
            mode: "autoGame",
        })

        let player = "X"
        while(this.state.status === "playing"){
            let boardStatus = this.state.boardStatus
            for(let i = 0; i < boardStatus.length; i++){
                if(boardStatus[i] === "empty"){
                    
                    if(player === "X"){
                        boardStatus[i] = "cross"
                        player = "O"
                    }else{
                        boardStatus[i] = "circle"
                        player = "X"
                    }
                    this.setState({
                        player: player,
                        boardStatus: boardStatus
                    })
                    break;
                }
            }
            
            if(this.isGameFinished()) break;
        }
    }

    refreshGame(){
        this.setState({
            boardStatus: [
                "empty","empty","empty",
                "empty","empty","empty",
                "empty","empty","empty"
            ],
            message: "Welcome!",
            status: "playing",
            player: "X"
        })
    }

    handleMuteClick(){
        if(music.volume === 0){
            music.volume = 1
        }else{
            music.volume = 0
        }

        
    }

    render(){
        return(
            <div className="Game">
                <div className="GameBoardAndCPsAndMessageScreen">
                    <LeftCP
                        playNewGameVsPc={()=>{this.refreshGame(); this.setState({mode: "vsPc", message: "Playing Game Vs Computer"})}}
                        playNewGameVsPlayer={()=>{this.refreshGame(); this.setState({mode: "2Players", message: "Playing Vs Another Player"})}}
                        playAutoGame={()=>{this.refreshGame(); setTimeout(()=>{this.playAutoGame()}, 200)}}
                        wins={this.state.wins}
                    />
                    <div className="MessageScreenAndGameBoard">
                        <MessageScreen
                            message={this.state.message}
                        />
                        <GameBoard
                            onCellClick={this.onCellClick}
                            boardStatus={this.state.boardStatus}
                        />
                    </div>
                    <RightCP
                        handleFullScreenClick={this.props.handleFullScreenClick}
                        handleMuteClick={this.handleMuteClick}      
                        handleSettings={this.handleSettings}                
                    />
                </div>
                <Footer/>
            </div>
        )
    }
 
}

export default Game