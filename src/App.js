import './App.css';
import Game from './components/Game'
import { FullScreen, useFullScreenHandle } from "react-full-screen"


function App() {
  const handle = useFullScreenHandle()

  let handleFullScreenClick = () => {
    if(handle.active){
      handle.exit()
    }else{
      handle.enter()
    }
  }

  return (
    <FullScreen handle={handle}>
      <div className="App">
        <Game 
          handleFullScreenClick={handleFullScreenClick}
          isFullScreen={handle.active}
        />
      </div>
    </FullScreen>
    
  );
}

export default App;
