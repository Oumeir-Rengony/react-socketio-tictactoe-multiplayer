import React from 'react';
import GlobalStyle from './styles/global';
import { useEffect } from 'react';
import styled from 'styled-components';
import socketService from './services/socketService';
import JoinRoom from './components/joinRoom';
import { useState } from 'react';
import GameContext, { IGameContextProps } from './context/gameContext';
import Game from './components/game';

function App() {

  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x"|"o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectedSocket = async () => {
    await socketService
      .connect("https://socketio-tictactoe-server.herokuapp.com/")
      .catch((err) => {
        console.log("Error: ", err)
      });
  };

  useEffect(() => {
    connectedSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      <GlobalStyle/>
      <AppContainer>
        <h1 className="welcome__text">Welcome to Tic-Tac-Toe</h1>
        <div className="main__container">
          {isInRoom ? <Game/> : <JoinRoom/>}
        </div>
      </AppContainer> 
    </GameContext.Provider>
  );
}


const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;

  .welcome__text{
    margin: 0;
    color: #8e44ad;
  }

  .main__container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default App;
