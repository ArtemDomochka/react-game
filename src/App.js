import './App.css';
import Game from './components/Game'
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import React, {useState} from 'react'
//import Timer from './components/Timer'

function App() {
  const handle = useFullScreenHandle()

  const handleFullScreenClick = () => {
    if(handle.active){
      handle.exit()
    }else{
      handle.enter()
    }
  }

  const[theme, setTheme] = useState("blue")

  const handleChangeTheme = e =>{
    setTheme(e.target.value)
  }

  // const [status, setStatus] = useState("stop")

  return (
    // <div>
    //   <button onClick={setStatus("start")}>
    //     Start
    //   </button>
    //   <button onClick={setStatus("stop")}>
    //     Stop
    //   </button> 
    // </div>

    <FullScreen handle={handle}>
      <div className={"App " + theme + "s"}>
        <Game 
          handleFullScreenClick={handleFullScreenClick}
          isFullScreen={handle.active}
          handleChangeTheme={handleChangeTheme}
          theme={theme}
        />
      </div>
    </FullScreen>
    
  );
}

export default App;
