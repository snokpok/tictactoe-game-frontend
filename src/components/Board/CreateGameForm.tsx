import { useFormik } from "formik";
import React from "react";
import { GameStateContext } from "../../common/context/gameState.context";
import { ServerInteractionAPI } from "../../common/ServerInteractionAPI";
import * as Yup from "yup";

function CreateGameForm() {
  const { gameState, setGameState } = React.useContext(GameStateContext);
  const createGameSchema = Yup.object().shape({
    p0: Yup.string().required("Please enter player 0's name"),
    p1: Yup.string().required("Please enter player 1's name"),
  });

  const formik = useFormik({
    initialValues: {
      p0: "",
      p1: "",
    },
    validationSchema: createGameSchema,
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
      style={{
        display: "flex",
        flexDirection: "column",
        width: 300,
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
      {formik.errors.p0 && (
        <div style={{ color: "red" }}>{formik.errors.p0}</div>
      )}
      {formik.errors.p1 && (
        <div style={{ color: "red" }}>{formik.errors.p1}</div>
      )}
      <input type="submit" />
    </form>
  );
}

export default CreateGameForm;
