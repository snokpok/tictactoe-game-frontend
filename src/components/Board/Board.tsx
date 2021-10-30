import React from "react";
import { GameStateContext } from "../../common/context/gameState.context";
import InputBoard from "./InputBoard";

function Board() {
  const { gameState, setGameState } = React.useContext(GameStateContext);

  const handleClearGame = React.useCallback(() => {
    setGameState({
      ...gameState,
      board: gameState.generateBlankBoard(),
      winner: -1,
      currentPlayer: 0,
      game: null,
      moveNo: 1,
    });
  }, [gameState, setGameState]);

  React.useEffect(() => {
    const predictedWinner = gameState.checkWinner();
    if (predictedWinner !== -1) {
      alert(`${gameState.players[predictedWinner]} wins!`);
      handleClearGame();
    } else if (gameState.moveNo === gameState.n ** 2 + 1) {
      alert(`Draw!`);
      handleClearGame();
    }
  }, [gameState, handleClearGame]);

  return (
    <div>
      <div
        style={{
          borderWidth: 1,
        }}
      >
        {gameState?.board.map((row, r) => (
          <div style={{ display: "flex" }} key={`row-${r}`}>
            {row.map((_, c) => (
              <div
                key={`col-${c}`}
                style={{
                  border: "solid",
                  borderWidth: 0.5,
                  borderColor: "black",
                }}
              >
                <InputBoard x={r} y={c} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
