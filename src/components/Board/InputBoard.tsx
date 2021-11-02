import React from "react";
import { GameStateContext } from "../../common/context/gameState.context";
import { ServerInteractionAPI } from "../../common/ServerInteractionAPI";

export interface InputBoardProps {
  x: number;
  y: number;
}

function InputBoard({ x, y }: InputBoardProps) {
  const { gameState, setGameState } = React.useContext(GameStateContext);
  let inputBoardDisplay: string = "";
  switch (gameState?.board[x][y]) {
    case 0:
      inputBoardDisplay = gameState.players[0][0].toUpperCase();
      break;
    case 1:
      inputBoardDisplay = gameState.players[1][0].toUpperCase();
      break;
    default:
      inputBoardDisplay = "_";
      break;
  }

  const handlePlay = async (playerIdx: number, x: number, y: number) => {
    try {
      if (x < 0 || x >= gameState.n || y < 0 || y >= gameState.n)
        throw RangeError("x, y out of range");
      if (playerIdx < 0 || playerIdx >= gameState.players.length)
        throw RangeError("Player index invalid");
      if (gameState.board[x][y] !== -1)
        throw Error("Board location already played!");
      let board = gameState.board;
      const currentPlayerIdx = gameState.currentPlayer;
      let moveNo = gameState.moveNo;
      board[x][y] = playerIdx;
      await ServerInteractionAPI.play(
        gameState.game,
        gameState.players[currentPlayerIdx],
        moveNo,
        x,
        y
      );
      const newCurrentPlayerIdx = (playerIdx + 1) % gameState.players.length;
      moveNo++;
      setGameState({
        ...gameState,
        board,
        currentPlayer: newCurrentPlayerIdx,
        moveNo,
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div
      key={`${x}${y}`}
      style={{
        cursor: "pointer",
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={(e) => {
        e.preventDefault();
        handlePlay(gameState.currentPlayer, x, y);
      }}
    >
      {inputBoardDisplay}
    </div>
  );
}

export default InputBoard;
