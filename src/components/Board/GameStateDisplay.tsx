import React from "react";
import { GameStateContext } from "../../common/context/gameState.context";

function GameStateDisplay() {
  const { gameState } = React.useContext(GameStateContext);

  return (
    <div>
      <div>Current game: {gameState?.game}</div>
      <div>Move: {gameState?.moveNo}</div>
      <div>Turn: {gameState.players[gameState.currentPlayer]}</div>
      <div>Players: {gameState?.players.join(", ")}</div>
    </div>
  );
}

export default GameStateDisplay;
