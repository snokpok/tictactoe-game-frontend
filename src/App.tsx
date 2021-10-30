import React from "react";
import "./App.css";
import {
  GameStateAPIInterface,
  gameStateAPIObject,
} from "./common/GameStateAPI";
import { GameStateContext } from "./common/context/gameState.context";
import Board from "./components/Board/Board";
import GameStateDisplay from "./components/Board/GameStateDisplay";
import { useFormik } from "formik";

export interface GameMetaInterface {
  gameId: string;
  p0: string;
  p1: string;
}

function App() {
  const [gameState, setGameState] =
    React.useState<GameStateAPIInterface>(gameStateAPIObject);

  const formik = useFormik({
    initialValues: {
      gameId: "",
      p0: "",
      p1: "",
    },
    onSubmit: (values) => {
      setGameState({
        ...gameState,
        game: values.gameId,
        players: [values.p0, values.p1],
        board: gameState.generateBlankBoard(),
      });
    },
  });

  return (
    <GameStateContext.Provider value={{ gameState, setGameState }}>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          <input
            id="gameId"
            placeholder="game id"
            name="gameId"
            onChange={formik.handleChange}
          />
          <input
            id="p0"
            placeholder="player 0"
            name="p0"
            onChange={formik.handleChange}
          />
          <input
            id="p1"
            placeholder="player 1"
            name="p1"
            onChange={formik.handleChange}
          />
          <input type="submit" />
        </form>
        {gameState.game && (
          <div>
            <GameStateDisplay />
            <Board />
          </div>
        )}
      </div>
    </GameStateContext.Provider>
  );
}

export default App;
