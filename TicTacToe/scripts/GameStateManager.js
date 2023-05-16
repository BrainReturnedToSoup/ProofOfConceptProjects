export class TicTacToeState {
  constructor() {
    this.gameExecuting = false;
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

  #stateMethods = {
    Check_Execution: function () {},
    Check_PlayerSymbol: function () {},
    Check_ComputerSymbol: function () {},
    Check_Turn: function () {},
    Check_CurrentState: function () {},
    Check_AvailableCells: function () {},
  };

  #checkState(instructions) {
    //instructions should be an array containing atleast one of these types of strings
    if (Array.isArray(instructions)) {
      instructions.forEach((stateMethodKey) =>
        this.#stateMethods[stateMethodKey]()
      );
    }
  }

  #checkStateInstructions = {
    checkAllStates: [
      "Check_Execution",
      "Check_PlayerSymbol",
      "Check_ComputerSymbol",
      "Check_Turn",
      "Check_CurrentState",
      "Check_AvailableCells",
    ],
    checkTurn: [
      "Check_Execution",
      "Check_ComputersTurn",
      "Check_AvailableCells",
    ],
  };

  #resetState() {
    this.gameExecuting = false;
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
