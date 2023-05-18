import { individualCellList, individualUIButtonList } from "./RefsDOM.js";
import { TicTacToeState } from "./GameStateManager.js";
import { gameRenderer } from "./RenderDOM.js";

const newGameState = new TicTacToeState();
window.gameState = newGameState;

function clickHandler(event) {
  const classList = event.target.classList,
    elementIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    UIButtonListKeys = Object.keys(individualUIButtonList);
  switch (true) {
    case cellListKeys.includes(elementIdentity):
      cellClicked(elementIdentity);
      gameRenderer(window.gameState);
      break;
    case UIButtonListKeys.includes(elementIdentity):
      UIButtonMethods[elementIdentity]();
      gameRenderer(window.gameState);
      break;
    default:
      return;
  }

}

const UIButtonMethods = {
  "Start-Game": function () {
    window.gameState.startGame();
  },
  "Reset-Game": function () {
    window.gameState.resetGame();
  },
  "Toggle-Symbol": function () {
    window.gameState.togglePlayerSymbol();
  },
};

function cellClicked(cellClass) {
  const cellNum = cellClass.split("").pop();
  window.gameState.cellPicked(cellNum);
}

document.addEventListener("click", clickHandler);

