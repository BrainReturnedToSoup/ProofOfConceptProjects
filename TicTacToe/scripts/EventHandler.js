import { individualCellList, individualUIButtonList } from "./RefsDOM";
import { ticTacToeGameState } from "./GameStateManager";

function clickHandler(event) {
  const classList = event.target.classList,
    elementIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    UIButtonListKeys = Object.keys(individualUIButtonList);
  switch (true) {
    case cellListKeys.includes(elementIdentity):
      cellClicked(elementIdentity);
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
  "Reset-Game": function () {
    ticTacToeGameState.resetGame();
  },
  "Toggle-Symbol": function () {
    ticTacToeGameState.togglePlayerSymbol();
  },
};

function cellClicked(cellClass) {
  const cellNum = cellClass.split('').pop();
  ticTacToeGameState.cellPicked(cellNum);
}

document.addEventListener("click", clickHandler);
