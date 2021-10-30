import React from "react";
import { GameStateAPIInterface, gameStateAPIObject } from "../GameStateAPI";

interface GameStateAPIContextInterface {
  gameState: GameStateAPIInterface;
  setGameState: React.Dispatch<React.SetStateAction<GameStateAPIInterface>>;
}

export const GameStateContext =
  React.createContext<GameStateAPIContextInterface>({
    gameState: gameStateAPIObject,
    setGameState: () => {},
  });
