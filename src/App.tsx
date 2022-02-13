import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { GameContext, GameContextState } from './game.context';
import Create from './pages/create/Create';
import Game from './pages/game/Game';
import Home from './pages/home/Home';
import ImportFile from './pages/import-file/ImportFile';
import { GameState } from './services/game';

interface AppState {
  gameContext: GameContextState,
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    const setGameState = (gameState: GameState) => {
      this.setState(state => ({
        ...state,
        gameContext: {
          ...state.gameContext,
          gameState,
        }
      }))
    }

    const updateGameState = (mapper: (state: GameState) => GameState) => {
      this.setState(state => ({
        ...state,
        gameContext: {
          ...state.gameContext,
          gameState: state.gameContext.gameState && mapper(state.gameContext.gameState),
        }
      }));
    }

    this.state = {
      gameContext: {
        gameState: null,
        setGameState,
        updateGameState,
      }
    }
  }

  render() {
    return (
      <div className="main-container">
        <GameContext.Provider value={this.state.gameContext}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create' element={<Create />}></Route>
            <Route path='/import' element={<ImportFile />}></Route>
            <Route path='/game' element={<Game />}></Route>
          </Routes>
        </GameContext.Provider>
      </div>
    );
  }
}

export default App;
