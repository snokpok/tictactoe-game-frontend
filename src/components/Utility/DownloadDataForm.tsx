import React from "react";
import { DownloadLinksContext } from "../../common/context/downloads.context";
import { ServerInteractionAPI } from "../../common/ServerInteractionAPI";

function DownloadDataForm() {
  const { links, setLinks } = React.useContext(DownloadLinksContext);

  const getNewDownloadLinks = React.useCallback(() => {
    ServerInteractionAPI.getDownloadDataLink("games").then((url) => {
      setLinks((l) => ({ ...l, games: url }));
    });
    ServerInteractionAPI.getDownloadDataLink("moves").then((url) => {
      setLinks((l) => ({ ...l, moves: url }));
    });
  }, [setLinks]);

  React.useEffect(() => {
    getNewDownloadLinks();
  }, [getNewDownloadLinks]);

  const handleGetTime = () => {
    return new Date().getTime();
  };

  return (
    <div>
      <a download={`games+${handleGetTime()}.txt`} href={links.games}>
        <button>Download games.csv</button>
      </a>
      <a download={`moves+${handleGetTime()}.txt`} href={links.moves}>
        <button>Download moves.csv</button>
      </a>
    </div>
  );
}

export default DownloadDataForm;
