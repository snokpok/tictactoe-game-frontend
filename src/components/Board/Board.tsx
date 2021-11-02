import React from "react";
import { DownloadLinksContext } from "../../common/context/downloads.context";
import { GameStateContext } from "../../common/context/gameState.context";
import { ServerInteractionAPI } from "../../common/ServerInteractionAPI";
import InputBoard from "./InputBoard";

function Board() {
  const { gameState, setGameState } = React.useContext(GameStateContext);
  const { setLinks } = React.useContext(DownloadLinksContext);

  const handleClearGame = React.useCallback(() => {
    setGameState({
      ...gameState,
      board: gameState.generateBlankBoard(),
      winner: -1,
      currentPlayer: 0,
      game: "",
      moveNo: 1,
    });
  }, [gameState, setGameState]);

  const getNewDownloadLinks = React.useCallback(() => {
    ServerInteractionAPI.getDownloadDataLink("games").then((url) => {
      setLinks((l) => ({ ...l, games: url }));
    });
    ServerInteractionAPI.getDownloadDataLink("moves").then((url) => {
      setLinks((l) => ({ ...l, moves: url }));
    });
  }, [setLinks]);

  const handlePostGame = React.useCallback(() => {
    handleClearGame();
    ServerInteractionAPI.backupDataToCSV("games").then(() => {
      alert("Backed up games");
    });
    ServerInteractionAPI.backupDataToCSV("moves").then(() => {
      alert("backed up moves");
    });
    getNewDownloadLinks();
  }, [handleClearGame, getNewDownloadLinks]);

  React.useEffect(() => {
    const predictedWinner = gameState.checkWinner();
    if (predictedWinner !== -1) {
      alert(`${gameState.players[predictedWinner]} wins!`);
      ServerInteractionAPI.updateWinner(
        gameState.game,
        gameState.players[predictedWinner]
      ).then(() => {
        handlePostGame();
      });
    } else if (gameState.moveNo === gameState.n ** 2 + 1) {
      alert(`Draw!`);
      handlePostGame();
    }
  }, [gameState, handlePostGame]);

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
