class TicTacToeState {
  constructor() {
    this.gameExecuting = false;
    this.startFirst = "Player";
    this.playerSymbol = "X";
    this.computerSymbol = "O";
    this.computersTurn = false;
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  #changeCurrentState(cellNum, symbol) {
    let currentCell = 0,
      changeMade = false;
    for (let i = 0; i < this.currentState.length; i++) {
      if (changeMade) break;
      for (let j = 0; j < this.currentState[i].length; j++) {
        if (changeMade) break;
        else if (cellNum === currentCell) {
          this.currentState[i][j] = symbol;
          changeMade = true;
        }
        currentCell++;
      }
    }
  }

  #resetState() {
    this.gameExecuting = false;
    this.startFirst = "Player";
    this.playerSymbol = "X";
    this.computerSymbol = "O";
    this.computersTurn = false;
    this.currentState = [
      ["-", "-", "-"],
      ["-", "-", "-"],
      ["-", "-", "-"],
    ];
    this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  #checkCurrentState() {
    const [row1, row2, row3] = this.currentState;
  }

  #computerPickCell() {
    //use minimax algo to make unbeatable bot

    this.#checkCurrentState();
  }

  definePlayerSymbol() {
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

  cellPicked(cellNum) {
    if (
      this.gameExecuting &&
      !this.computersTurn &&
      this.availableCells.includes(cellNum)
      //checks if game is running, if its the player's turn, and that the clicked cell is an available cell
    ) {
      //logic for when a cell is picked that meets all of these requirements
    }
    this.#checkCurrentState();
  }

  resetGame() {}
  startGame() {
    this.gameExecuting = true;
    this.#checkCurrentState();
  }
}

const ticTacToeGameState = new TicTacToeState();

export { ticTacToeGameState, TicTacToeState };
