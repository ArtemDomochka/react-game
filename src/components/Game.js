import React from 'react'
import './Game.css'
import GameBoard from './GameBoard'
import Footer from './Footer'
import LeftCP from './LeftCP'
import RightCP from './RightCP'
import MessageScreen from './MessageScreen'
import musicSound from '../resources/soundtrack.mp3'
import bSound from '../resources/button-16.mp3'
import Hotkeys from 'react-hot-keys'
import Statistics from './Statistics'
import Settings from './Settings'
import Message from './Message'


const music = new Audio(musicSound)
const buttonSound = new Audio(bSound)

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
            stats : {
                win: 0,
                lose: 0,
                tie: 0
            },
            settingsVisibility : "hidden",
            statisticsVisibility : "hidden",
            messageVisibility: "hidden",
            musicVolume: 0,
            buttonVolume: 0,
            difficalty: "hard",
            blocked : false,
            msg : "Weclome",
            boardSize: 70,
            statatistic: []
        }

        this.onCellClick = this.onCellClick.bind(this);
        this.refreshGame = this.refreshGame.bind(this);
        this.playAutoGame = this.playAutoGame.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleSettingsClick = this.handleSettingsClick.bind(this);
        this.handleStatsClick = this.handleStatsClick.bind(this);
        this.handleMuteClick = this.handleMuteClick.bind(this);
        this.changeMusicVolume = this.changeMusicVolume.bind(this);
        this.changeSoundVolume = this.changeSoundVolume.bind(this);
        this.handleDifficalty = this.handleDifficalty.bind(this);
        this.playNewGameVsPc = this.playNewGameVsPc.bind(this);
        this.playNewGameVsPlayer = this.playNewGameVsPlayer.bind(this);
        this.playAutoGameR = this.playAutoGameR.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.handleChangeBoardSize = this.handleChangeBoardSize.bind(this);
        this.createStatistic = this.createStatistic.bind(this);
    }

    componentDidMount(){
        music.volume = 0
        buttonSound.volume = 0
        music.loop = true
        
        this.setState({
            status: localStorage.getItem("status") || "playing",
            player: localStorage.getItem("player") || "X",
            message: localStorage.getItem("message") || "Weclome!",
            mode: localStorage.getItem("mode") || "vsPc!",
            difficalty: localStorage.getItem("difficalty") || "easy!",
            settingsVisibility: localStorage.getItem("settingsVisibility") || "hidden!",
            statisticsVisibility: localStorage.getItem("statisticsVisibility") || "hidden!",
            stats: JSON.parse(localStorage.getItem("stats")) || {win:0, lose:0, tie:0},
            boardStatus: JSON.parse(localStorage.getItem("boardStatus")) || [
                "empty","empty","empty",
                "empty","empty","empty",
                "empty","empty","empty"
            ],
            statatistic: JSON.parse(localStorage.getItem("statatistic")) || []
        })
        
    }

    componentDidUpdate(){

        localStorage.setItem("status", this.state.status)
        localStorage.setItem("player", this.state.player)
        localStorage.setItem("message", this.state.message)
        localStorage.setItem("mode", this.state.mode)
        localStorage.setItem("difficalty", this.state.difficalty)
        localStorage.setItem("settingsVisibility", this.state.settingsVisibility)
        localStorage.setItem("statisticsVisibility", this.state.statisticsVisibility)
        localStorage.setItem("stats", JSON.stringify(this.state.stats))
        localStorage.setItem("boardStatus", JSON.stringify(this.state.boardStatus))
        localStorage.setItem("statatistic", JSON.stringify(this.state.statatistic))

    }

    async onCellClick(event){
        if(this.state.status !== "playing"){
            return
        }
        this.setState({
            status: "notPlaying"
        })

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
            this.setState({
                message: "You can't play there"
            })
            return
        }

        if(this.isGameFinished()){
            this.setState({
                status: "notPlaying"
            })
            return
        }

        if(this.state.mode === "vsPc"){
            await this.sleep(700)
            this.makePcTurn()
        }

        if(this.isGameFinished()){
            console.log("Finished")
            this.setState({
                status: "notPlaying"
            })
            return
        }

        this.setState({
            status: "playing"
        })
    }

    makePcTurn(){ 
        if(this.state.difficalty === "easy"){
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
        }else{
        //clever
        let turns = [3,1,8,5,4,2,7,6,0]
            for(let i = 0; i < this.state.boardStatus.length; i++){
                if(this.state.boardStatus[turns[i]] === "empty"){
                    let boardStatus = this.state.boardStatus
                    boardStatus[turns[i]] = "circle"
                    this.setState({
                        boardStatus: boardStatus,
                        player: "X"
                    })
                    break;
                }
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
                message: `Player ${this.state.player} Won!`,
            })

            this.createStatistic(this.state.player)

            let p = this.state.player // почему бех этой строчки игрок на оборот
            setTimeout(()=>{
                this.showMessage(`Player ${p} Won!`)
            }, 50)

            if(this.state.mode === "vsPc" && this.state.player === "X"){
                let stats = this.state.stats
                stats.win++
                this.setState({
                    stats: stats
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
            this.createStatistic("Tie")

            setTimeout(()=>{
                this.showMessage("Tie!")
            }, 50)
            return true
        }

    }

    sleep(milliseconds){
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
      

    async playAutoGame(){
        this.setState({
            message: "Playing Auto Game",
            mode: "autoGame",
            status: "notPlaying",
            blocked : true
        })

        let player = "X"
        while(true){

            let turns = [3,1,8,5,4,2,7,6,0]
            for(let i = 0; i < this.state.boardStatus.length; i++){
                if(this.state.boardStatus[turns[i]] === "empty"){
                    let boardStatus = this.state.boardStatus
                                         
                    if(player === "X"){
                        boardStatus[turns[i]] = "cross"
                        player = "O"
                    }else{
                        boardStatus[turns[i]] = "circle"
                        player = "X"
                    }

                    await this.sleep(900)
                    this.setState({
                        boardStatus: boardStatus,
                        player: player
                    })
                    break;
                }
            }
            
            if(this.isGameFinished()){
                this.setState({
                    status: "notPlaying",
                    blocked: false
                })
                break;
            }

            this.setState({
                player: player
            })
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
        music.play()
        
        if(music.volume === 0){
            music.volume = 1
            buttonSound.volume = 1
        }else{
            music.volume = 0
            buttonSound.volume = 0
        }

        this.setState({
            musicVolume: music.volume,
            buttonVolume: buttonSound.volume
        })
        
    }

    handleSettingsClick(){
        if(this.state.settingsVisibility === "hidden"){
            this.setState({
                settingsVisibility: "visible"
            })
        }else{
            this.setState({
                settingsVisibility : "hidden"
            })
        }
    }

    handleStatsClick(){
        if(this.state.statisticsVisibility === "hidden"){
            this.setState({
                statisticsVisibility: "visible"
            })
        }else{
            this.setState({
                statisticsVisibility : "hidden"
            })
        }
    }

    handleKeyPress = e => { 
        switch(e){
            case "f":
                this.props.handleFullScreenClick()
                break
            case "m":
                this.handleMuteClick()
                break
            case "Esc":
                this.handleSettingsClick()
                break
            case "q":
                this.refreshGame()
                this.setState({mode: "vsPc", message: "Playing Game Vs Computer"})
                break
            case "w":
                this.refreshGame()
                this.setState({mode: "2Players", message: "Playing Vs Another Player"})
                break
            case "e":
                this.refreshGame()
                setTimeout(()=>{this.playAutoGame()}, 200)
                break
            case "s":
                this.handleStatsClick()
                break
            default:
                console.log("Hothey error!")
        }
    }

    changeMusicVolume(value){
        music.volume=value
        this.setState({
            musicVolume:value
        })
    }

    changeSoundVolume(value){
        buttonSound.volume=value
        this.setState({
            buttonVolume:value
        })
    }

    handleDifficalty(event){
        console.log(event.target.value);
        this.setState({
            difficalty: event.target.value
        })
    }

    playNewGameVsPc(){
        if(this.state.blocked) return
        setTimeout(()=>{
            this.showMessage("To Battle!")
        }, 100)
        this.refreshGame()
        this.setState({mode: "vsPc", message: "Playing Game Vs Computer"})
    }

    playNewGameVsPlayer(){
        if(this.state.blocked) return
        setTimeout(()=>{
            this.showMessage("To Battle!")
        }, 50)
        this.refreshGame()
        this.setState({mode: "2Players", message: "Playing Vs Another Player"})
    }

    playAutoGameR(){
        if(this.state.blocked) return
        this.refreshGame()
        setTimeout(()=>{this.playAutoGame()},200)
    }

    showMessage(msg){

        if(this.state.messageVisibility === "hidden"){
            this.setState({
                messageVisibility: "visible",
                msg: msg
            })
        }else{
            this.setState({
                messageVisibility : "hidden"
            })
        }  

        setTimeout(()=>{
            if(this.state.messageVisibility === "hidden"){
                this.setState({
                    messageVisibility: "visible"
                })
            }else{
                this.setState({
                    messageVisibility : "hidden"
                })
            } 
        }, 1000)
    }

    handleChangeBoardSize(e){
        this.setState({
            boardSize: e.target.value
        })
    }

    createStatistic(winner){
        let statatistic = this.state.statatistic
        if(statatistic.length === 10) statatistic.shift()
        const date = new Date()
        statatistic.push({
            date: date.getDay() + "." + date.getMonth() + "." + date.getFullYear(),
            mode: this.state.mode,
            winner: winner
        })        

        this.setState({
            statatistic: statatistic
        })
    }

    render(){
        return(
            <Hotkeys
                keyName="f,m,Esc,q,w,e,s"
                onKeyDown={this.handleKeyPress.bind(this)}
            >
            <Statistics
                visibility={this.state.statisticsVisibility}
                statistics={this.state.statatistic}
                handleStatsClick={this.handleStatsClick}
                theme={this.props.theme}
            />    
            <Settings
                visibility={this.state.settingsVisibility}
                handleSettingsClick={this.handleSettingsClick}
                changeMusicVolume={this.changeMusicVolume}
                musicVolume={this.state.musicVolume}
                buttonVolume={this.state.buttonVolume}
                changeSoundVolume={this.changeSoundVolume}
                handleDifficalty={this.handleDifficalty}
                theme={this.props.theme}
                handleChangeTheme={this.props.handleChangeTheme}
                handleChangeBoardSize={this.handleChangeBoardSize}
            />    
            <Message
                messageVisibility={this.state.messageVisibility}
                message={this.state.msg}
                theme={this.props.theme}
            />
            <div className="Game" style={{width: `${this.state.boardSize}%`}}>
                <div className="GameBoardAndCPsAndMessageScreen">
                    <LeftCP
                    onKeyDown={()=>{console.log("OOO")}}
                        playNewGameVsPc={this.playNewGameVsPc}
                        playNewGameVsPlayer={this.playNewGameVsPlayer}
                        playAutoGame={this.playAutoGameR}
                        wins={this.state.stats.win}
                        buttonSound={buttonSound}
                        theme={this.props.theme}
                    />
                    <div className="MessageScreenAndGameBoard">
                        <MessageScreen
                            message={this.state.message}
                            theme={this.props.theme}
                        />
                        <GameBoard
                            onCellClick={this.onCellClick}
                            boardStatus={this.state.boardStatus}
                        />
                    </div>
                    <RightCP
                        handleFullScreenClick={this.props.handleFullScreenClick}
                        handleMuteClick={this.handleMuteClick}      
                        handleSettingsClick={this.handleSettingsClick}   
                        handleStatsClick={this.handleStatsClick}  
                        buttonSound={buttonSound} 
                        theme={this.props.theme}          
                    />
                </div>
                <Footer
                    theme={this.props.theme}
                />
            </div>
            </Hotkeys>
        )
    }
 
}

export default Game