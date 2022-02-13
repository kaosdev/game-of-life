import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext, GameContextState } from '../../game.context';
import { parseContent } from '../../services/game-parser';
import './ImportFile.css';

interface State {
  fileName: string | null;
  fileContent: string | null;
  error: string | null;
}


function ImportFile() {
  const [state, setState] = useState<State>({
    fileName: null,
    fileContent: null,
    error: null
  });

  const fileInput = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const importFileClick = () => {
    fileInput.current?.click();
  }

  const handleFileChange = () => {
    if (!fileInput.current) {
      return;
    }

    const fileList = fileInput.current.files;

    if (!fileList || fileList?.length === 0) {
      setState({ fileName: null, fileContent: null, error: null });
      return;
    }

    const uploadedFile = fileList[0];
    uploadedFile.text().then(text => {
      setState({ fileName: uploadedFile.name, fileContent: text, error: null });
    });
  }

  const play = (setGameState: GameContextState['setGameState']) => {
    try {
      if (!state.fileContent) {
        setState(state => ({ ...state, error: 'Import a file to start playing' }));
        return;
      }
      const gameState = parseContent(state.fileContent);
      setGameState(gameState);
      navigate('/game');
    } catch (e) {
      console.log(e)
      setState(state => ({ ...state, error: 'File cannot be parsed' }));
    }
  }

  return (
    <div className="import-file">
      <div className="import-file__input" onClick={importFileClick}>
        <input type="file" ref={fileInput} onChange={handleFileChange}></input>
        <label>
          {state.fileName || 'Click to import file'}
        </label>
      </div>
      <GameContext.Consumer>
        {({ setGameState }) => (
          <button className='import-file__play btn' onClick={() => play(setGameState)}>PLAY</button>
        )}
      </GameContext.Consumer>
    </div>
  );
}

export default ImportFile;