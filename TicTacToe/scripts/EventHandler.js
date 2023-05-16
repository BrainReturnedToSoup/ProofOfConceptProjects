import { individualCellList, individualUIButtonList } from "./RefsDOM";
import { ticTacToeGameState } from "./GameStateManager";

function clickHandler(event) {
  const classList = event.target.classList,
    elementIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    UIButtonListKeys = Object.keys(individualUIButtonList);
  switch (true) {
    case cellListKeys.includes(elementIdentity):
      cellClicked(event.target);
      break;
    case UIButtonListKeys.includes(elementIdentity):
      UIButtonMethods[elementIdentity]();
      break;
    default:
      return;
  }
}

const UIButtonMethods = {
  "Start-Game": function () {
    ticTacToeGameState.startGame();
  },
  "Restart-Game": function () {
    ticTacToeGameState.endGame();
    ticTacToeGameState.startGame();
  },
  "Toggle-Symbol": function () {
    ticTacToeGameState.togglePlayerSymbol();
  },
};

function cellClicked(cellElement) {
  
}

document.addEventListener("click", clickHandler);
