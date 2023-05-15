class TicTacToeState {
  constructor() {
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  #computerPickCell() {}

  #determineWinner() {}

  #resetState() {}

  #storeOnLocal() {}

  #checkState() {}
  cellPicked() {}
}
