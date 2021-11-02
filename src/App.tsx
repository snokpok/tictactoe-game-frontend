import React from "react";
import "./App.css";
import {
  GameStateAPIInterface,
  gameStateAPIObject,
} from "./common/GameStateAPI";
import { GameStateContext } from "./common/context/gameState.context";
import Board from "./components/Board/Board";
import GameStateDisplay from "./components/Board/GameStateDisplay";
import CreateGameForm from "./components/Board/CreateGameForm";
import DownloadDataForm from "./components/Utility/DownloadDataForm";
import {
  DownloadLinksContext,
  Links,
} from "./common/context/downloads.context";

export interface GameMetaInterface {
  gameId: string;
  p0: string;
  p1: string;
}

function App() {
  const [gameState, setGameState] =
    React.useState<GameStateAPIInterface>(gameStateAPIObject);
  const [links, setLinks] = React.useState<Links>({
    games: "",
    moves: "",
  });

  return (
    <DownloadLinksContext.Provider value={{ links, setLinks }}>
      <GameStateContext.Provider value={{ gameState, setGameState }}>
        <DownloadDataForm />
        <CreateGameForm />
        <div>
          {gameState.game && (
            <div>
              <GameStateDisplay />
              <Board />
            </div>
          )}
        </div>
      </GameStateContext.Provider>
    </DownloadLinksContext.Provider>
  );
}

export default App;
