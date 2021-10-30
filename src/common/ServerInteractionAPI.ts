import axios from "axios";

const serverURL = "http://localhost:4000";

export class ServerInteractionAPI {
  public static async play(
    game: string,
    player: string,
    move: number,
    x: number,
    y: number
  ) {
    const res = await axios({
      method: "POST",
      url: `${serverURL}/game/${game}`,
      data: {
        move,
        player,
        x,
        y,
      },
    });
    return res.data;
  }

  public static async downloadData() {
    const res = await axios({
      method: "GET",
      url: `${serverURL}/data`,
    });
    return res.data;
  }
}
