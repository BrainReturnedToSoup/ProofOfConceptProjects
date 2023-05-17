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
    this.gameResult;
  }

  #checkMethods = {
    rows: (winCondition) => {
      this.currentState.forEach((array) => {
        const row = array.reduce((acc, curr) => {
          return acc + curr;
        });
        if (winCondition.includes(row)) {
          return [true, row[0]];
        }
      });
      return [false];
    },

    columns: (winCondition) => {
      for (let i = 0; i < this.currentState[0].length; i++) {
        const row1 = this.currentState[0][i],
          row2 = this.currentState[1][i],
          row3 = this.currentState[2][i],
          columnLine = row1 + row2 + row3;

        if (winCondition.includes(columnLine)) {
          return [true, row1];
        }
      }
      return [false];
    },

    cross: (winCondition) => {
      const topLeft = this.currentState[0][0],
        topRight = this.currentState[0][2],
        center = this.currentState[1][1],
        bottomLeft = this.currentState[2][0],
        bottomRight = this.currentState[2][2],
        cross1 = topLeft + center + bottomRight,
        cross2 = bottomLeft + center + topRight;
      if (winCondition.includes(cross1) || winCondition.includes(cross2)) {
        return [true, cross1[0]];
      } else {
        return [false];
      }
    },
  };

  #currenStateMethods = {
    check: () => {
      const winCondition = ["XXX", "OOO"],
        isRowWin = this.#checkMethods.rows(winCondition),
        isColumnWin = this.#checkMethods.columns(winCondition),
        isCrossWin = this.#checkMethods.cross(winCondition),
        areCellsLeft = this.availableCells.length > 0;

      let winnerSymbol;

      switch (true) {
        case isRowWin.includes(true):
          winnerSymbol = isRowWin[1];
          break;
        case isColumnWin.includes(true):
          winnerSymbol = isColumnWin[1];
          break;
        case isCrossWin.includes(true):
          winnerSymbol = isColumnWin[2];
          break;
        case areCellsLeft:
          winnerSymbol = "Draw";
          break;
        default:
          return;
      }

      if (winnerSymbol !== undefined) {
        this.#onGameOver(winnerSymbol);
      }
    },

    change: (cellNum, symbol) => {
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
    },

    reset: () => {
      this.gameExecuting = false;
      this.startFirst = "Player";
      this.computersTurn = false;
      this.currentState = [
        ["-", "-", "-"],
        ["-", "-", "-"],
        ["-", "-", "-"],
      ];
      this.availableCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.gameResult = undefined
    },
  };

  #onGameOver() {}

  #computerPickCell() {
    //use minimax algo to make unbeatable bot

    this.#currenStateMethods.check();
    //checks for win after change is made
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
      this.availableCells.includes(cellNum) &&
      this.gameResult === undefined
      //checks if game is running, if its the player's turn, that the clicked cell is an available cell, as well as the game not being over
    ) {
      //logic for when a cell is picked that meets all of these requirements
    }
    this.#currenStateMethods.check();
    //Checks for win after change is made
  }

  resetGame() {
    this.#currenStateMethods.reset();
  }
  startGame() {
    if (this.gameExecuting === false) {
      this.gameExecuting = true;
      //starts the game if the game isn't currently running
    }
  }
}

const ticTacToeGameState = new TicTacToeState();

export { ticTacToeGameState, TicTacToeState };
