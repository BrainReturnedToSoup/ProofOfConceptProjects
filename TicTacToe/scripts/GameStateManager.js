export class TicTacToeState {
  constructor() {
    this.gameExecuting = false;
    this.playerSymbol = "X";
    this.computerSymbol = "O";
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  #checkState() {}

  #resetState() {
    this.gameExecuting = false;
    this.playerSymbol = "X";
    this.computerSymbol = "O";
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  #computerPickCell() {
    //use minimax algo to make unbeatable bot
  }

  #determineWinner() {}

  #storeOnLocal(winner) {
    switch (winner) {
      case "Player":
        break;
      case "Computer":
        break;
      default:
    }
  }

  togglePlayerSymbol() {
    if (this.gameExecuting === false) {
      switch (this.playerSymbol) {
        case "X":
          this.playerSymbol = "O";
          this.computerSymbol = "X";
          break;
        case "O":
          this.playerSymbol = "X";
          this.computerSymbol = "O";
          break;
        default:
          this.playerSymbol = "X";
          this.computerSymbol = "O";
      }
    }
  }

  endGame() {
    if (this.gameExecuting === true) {
    }
  }

  startGame() {
    if (this.gameExecuting === false) {
    }
  }

  cellPicked() {
    if (this.gameExecuting === true) {
    }
  }
}

localStorage.setItem("Scores", JSON.stringify([0, 0]));

export const ticTacToeGameState = new TicTacToeState();
