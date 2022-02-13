import { useState } from "react";
import { Link } from "react-router-dom";
import GameGrid from "../../components/GameGrid";
import { GameContext, GameContextState } from "../../game.context";
import { nextGeneration, toggleCellAt } from "../../services/game";
import { saveGame } from "../../services/game-parser";
import "./Game.css";


function Game() {
  const [state, setState] = useState<{ interval: number | null }>({ interval: null });

  const togglePlay = (updateGameState: GameContextState['updateGameState']) => {
    if (state.interval) {
      clearInterval(state.interval);
      setState({ interval: null });
    } else {
      const interval = setInterval(() => {
        updateGameState(nextGeneration);
      }, 500);

      setState({ interval: Number(interval) });
    }
  }

  const toggleCell = (row: number, col: number, updateGameState: GameContextState['updateGameState']) => {
    updateGameState(toggleCellAt(row, col));
  }
  return (
    <GameContext.Consumer>
      {({ gameState, updateGameState }) => {
        if (!gameState) {
          return (
            <div className="game-error">
              <label>Create a new game before playing</label>
              <Link className="btn" to='/'>Return to homepage</Link>
            </div>
          )
        }
        return (
          <div className="game-container">
            <div className="game-header">
              <div className="game-header__title">Generation {gameState.generation}</div>

              <div className="game-header__toolbar">
                <button className="btn" onClick={() => saveGame(gameState)}>Save</button>
                <button className="btn" onClick={() => togglePlay(updateGameState)}>{state.interval ? 'Stop' : 'Play'}</button>
              </div>
            </div>
            <GameGrid cells={gameState.cells} toggleCell={(row, col) => toggleCell(row, col, updateGameState)}></GameGrid>
          </div>
        )
      }}
    </GameContext.Consumer>
  )
}

export default Game;