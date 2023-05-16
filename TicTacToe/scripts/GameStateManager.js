export class TicTacToeState {
  constructor() {
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.gameExecuting = false;
    this.playerSymbol = "X";
  }

  #checkState() {}

  #resetState() {}

  #computerPickCell() {
    //use minimax algo to make unbeatable bot
  }

  #determineWinner() {}

  #storeOnLocal() {}

  togglePlayerSymbol() {}

  endGame() {}

  startGame() {}

  cellPicked() {}
}

export const ticTacToeGameState = new TicTacToeState();
