import { individualCellList, individualUIButtonList } from "./RefsDOM.js";
import { TicTacToeState } from "./GameStateManager.js";
import { gameRenderer, UIrenderer } from "./RenderDOM.js";

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
      const computerThinkingTime = delayTime(1000, 2500);
      setTimeout(computerTurn, computerThinkingTime);
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
    window.gameState.definePlayerSymbol();
    UIrenderer(window.gameState.playerSymbol)
  },
};

function cellClicked(cellClass) {
  const cellNum = Number(cellClass.split("").pop());
  window.gameState.cellPicked(cellNum);
  gameRenderer(window.gameState);
}

function computerTurn() {
  window.gameState.computerPickCell();
  gameRenderer(window.gameState);
}

function delayTime(min, max) {
  const random = Math.random(),
    range = max - min,
    scaled = random * range,
    delay = Math.floor(scaled) + min;
  return delay;
}
document.addEventListener("click", clickHandler);
