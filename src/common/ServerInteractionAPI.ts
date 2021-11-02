import axios from "axios";

export const serverURL = "http://localhost:4000";
export type Tables = "games" | "moves";

export class ServerInteractionAPI {
  public static async createGame(players: string[]) {
    const res = await axios({
      method: "POST",
      url: `${serverURL}/game`,
      data: {
        players,
      },
    });
    return res.data;
  }

  public static async play(
    game: string,
    player: string,
    move: number,
    x: number,
    y: number
  ) {
    const res = await axios({
      method: "POST",
      url: `${serverURL}/game/${game}/move`,
      data: {
        move_no: move,
        player,
        x,
        y,
      },
    });
    return res.data;
  }

  public static async updateWinner(game: string, winner: string) {
    const res = await axios({
      method: "PUT",
      url: `${serverURL}/game/${game}`,
      data: {
        winner,
      },
    });
    return res.data;
  }

  public static async backupDataToCSV(
    tablename: string,
    format: string = "csv"
  ) {
    const res = await axios({
      method: "POST",
      url: `${serverURL}/resource/${tablename}/backup?format=${format}`,
    });
    return res.data;
  }

  public static async getDownloadDataLink(tablename: Tables): Promise<string> {
    const res = await axios({
      method: "GET",
      url: `${serverURL}/resource/${tablename}`,
      responseType: "blob",
    });
    const datablob = new Blob([res.data]);
    const url = window.URL.createObjectURL(datablob);
    return url;
  }
}