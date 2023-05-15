const bodyElement = document.querySelector("body");

const ticTacToeContainer = bodyElement.children[0],
  ticTacToeCells = ticTacToeContainer.children,
  individualCellList = {};

for (let i = 0; i < ticTacToeCells.length; i++) {
  individualCellList[`Cell-${i}`] = ticTacToeCells[i];
}
