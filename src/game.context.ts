import React from "react";
import { GameState } from "./services/game";

export interface GameContextState {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  updateGameState: (mapper: (state: GameState) => GameState) => void;
}

export const GameContext = React.createContext<GameContextState>({
  gameState: null,
  setGameState: () => {},
  updateGameState: () => {},
});
