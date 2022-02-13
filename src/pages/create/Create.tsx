import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext, GameContextState } from "../../game.context";
import { createNewGame } from "../../services/game";
import "./Create.css";


function Create() {
  const [state, setState] = useState({ error: '' });
  const navigate = useNavigate();
  const nRows = React.useRef<HTMLInputElement>(null);
  const nCols = React.useRef<HTMLInputElement>(null);


  const play = (setGameState: GameContextState['setGameState']) => {
    const rowsValue = nRows.current?.value;
    const colsValue = nCols.current?.value;

    if (!rowsValue || !colsValue) {
      setState({ error: 'Rows and Columns are required!' });
      return;
    }

    const rows = Number.parseInt(rowsValue);
    const cols = Number.parseInt(colsValue);

    setGameState(createNewGame(rows, cols));
    navigate('/game');
  }

  return (
    <div className="create-container">
      {state.error && (
        <div className="create__error">
          {state.error}
        </div>
      )}

      <div className="create__grid">
        <div className="create__input">
          <label>Rows</label>
          <input ref={nRows} type='number'></input>
        </div>

        <div className="create__input">
          <label>Columns</label>
          <input ref={nCols} type='number'></input>
        </div>
      </div>

      <GameContext.Consumer>
        {({ setGameState }) => (
          <button className="btn" onClick={() => play(setGameState)}>PLAY</button>
        )}
      </GameContext.Consumer>

    </div>
  )
}

export default Create;