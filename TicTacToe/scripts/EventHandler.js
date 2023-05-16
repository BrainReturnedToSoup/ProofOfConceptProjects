import { individualCellList, individualUIButtonList } from "./RefsDOM";
import { ticTacToeGameState, TicTacToeState } from "./GameStateManager";

function clickHandler(event) {
  const classList = event.target.classList,
    elementIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    UIButtonListKeys = Object.keys(individualUIButtonList);
  switch (true) {
    case ticTacToeGameState instanceof TicTacToeState === false:
      //logic for ticTacToeGameState not being correct value
    case cellListKeys.includes(elementIdentity):
      break;
    case UIButtonListKeys.includes(elementIdentity):
        UIButtonMethods[elementIdentity]();
      break;
    default:
      return;
  }
}

const UIButtonMethods = {
  "Start-Game": function () {},
  "Restart-Game": function () {},
  "Toggle-Symbol": function () {},
};

document.addEventListener("click", clickHandler);
