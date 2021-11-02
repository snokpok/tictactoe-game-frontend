import { useFormik } from "formik";
import React from "react";
import { GameStateContext } from "../../common/context/gameState.context";
import { ServerInteractionAPI } from "../../common/ServerInteractionAPI";

function CreateGameForm() {
  const { gameState, setGameState } = React.useContext(GameStateContext);

  const formik = useFormik({
    initialValues: {
      gameId: "",
      p0: "",
      p1: "",
    },
    onSubmit: async (values) => {
      const players = [values.p0, values.p1];
      const createGameData = await ServerInteractionAPI.createGame(players);
      setGameState({
        ...gameState,
        players,
        game: createGameData.id,
        board: gameState.generateBlankBoard(),
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
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
  );
}

export default CreateGameForm;
