import axios from "axios";

export type Environment = "dev" | "prod";
export const env: Environment = "prod";
export const backendURLs = {
  production: "http://50.18.171.58:4000",
  development: "http://localhost:4000",
  test: "http://localhost:4000",
};
export const serverURL = backendURLs[process.env.NODE_ENV];
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
      url: `${serverURL}/resource/${tablename}?t=${new Date().getTime()}`,
      responseType: "blob",
    });
    const datablob = new Blob([res.data]);
    const url = window.URL.createObjectURL(datablob);
    return url;
  }
}
