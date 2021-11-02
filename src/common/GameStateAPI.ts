export interface GameStateAPIInterface {
  board: number[][];
  n: number;
  players: string[];
  game: string;
  winner: number;
  currentPlayer: number;
  moveNo: number;
  generateBlankBoard: () => number[][];
  checkTLDWinner: () => number;
  checkBLDWinner: () => number;
  checkRowWinner: () => number;
  checkColWinner: () => number;
  checkWinner: () => number;
}

export const gameStateAPIObject = {
  board: [] as number[][], // array of indices, each index corr to the index of this.player
  n: 3, // number of grids
  players: [], // array of player ids
  game: "", // game id
  winner: -1, // index of the player
  currentPlayer: 0,
  moveNo: 1,
  generateBlankBoard(): number[][] {
    let board: number[][] = [];
    for (let i = 0; i < this.n; i++) {
      board.push([]);
      for (let j = 0; j < this.n; j++) {
        board[i].push(-1);
      }
    }
    return board;
  },
  checkTLDWinner(): number {
    let winnerTmp = this.board[0][0];
    if (winnerTmp === -1) return -1;
    for (let i = 0; i < this.n; i++)
      if (this.board[i][i] !== winnerTmp) return -1;
    return winnerTmp;
  },
  checkBLDWinner(): number {
    let winnerTmp = this.board[0][this.n - 1];
    if (winnerTmp === -1) return -1;
    for (let i = 0; i < this.n; i++)
      if (this.board[this.n - 1 - i][i] !== winnerTmp) return -1;
    return winnerTmp;
  },
  checkRowWinner(): number {
    let winner = -1;
    for (let r = 0; r < this.n; r++) {
      for (let c = 0; c < this.n; c++) {
        if (c === 0) {
          if (this.board[r][c] === 0) winner = 0;
          else if (this.board[r][c] === 1) winner = 1;
          else break; // cant have a winner if the first one is -1
          continue;
        }
        if (this.board[r][c] !== winner) break; // not this row; go to the next one
        if (c === this.n - 1) return winner; // searched through entire row without breaking
      }
    }
    return -1;
  },
  checkColWinner(): number {
    let winner = -1;
    for (let c = 0; c < this.n; c++) {
      for (let r = 0; r < this.n; r++) {
        if (r === 0) {
          if (this.board[r][c] === 0) winner = 0;
          else if (this.board[r][c] === 1) winner = 1;
          else break; // cant have a winner if the first one is -1
          continue;
        }
        if (this.board[r][c] !== winner) break; // not this col; go to the next one
        if (r === this.n - 1) return winner; // searched through entire col without breaking
      }
    }
    return -1;
  },
  checkWinner(): number {
    let winStates = {
      tld: this.checkTLDWinner(),
      bld: this.checkBLDWinner(),
      r: this.checkRowWinner(),
      c: this.checkColWinner(),
    };
    for (let val of Object.values(winStates)) {
      if (val !== -1) {
        this.winner = val;
        break;
      }
    }
    return this.winner;
  },
};

gameStateAPIObject.board = gameStateAPIObject.generateBlankBoard();
