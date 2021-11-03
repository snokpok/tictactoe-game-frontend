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

  const refreshDownloadLinks = React.useCallback(() => {
    ServerInteractionAPI.backupDataToCSV("games").then((res) => {
      if (res) alert("backed up games");
    });
    ServerInteractionAPI.backupDataToCSV("moves").then((res) => {
      if (res) alert("backed up moves");
    });
  }, []);

  React.useEffect(() => {
    refreshDownloadLinks();
    getNewDownloadLinks();
  }, [getNewDownloadLinks, refreshDownloadLinks]);

  const handleGetTime = () => {
    return new Date().getTime();
  };

  return (
    <div>
      <button onClick={refreshDownloadLinks}>Backup data</button>
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
