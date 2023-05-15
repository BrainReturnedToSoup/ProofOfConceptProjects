const bodyElement = document.querySelector("body");

const ticTacToeContainer = bodyElement.children[0],
  //TicTacToe-Container

  ticTacToeCells = ticTacToeContainer.children,
  //TicTacToe-Cell list

  individualCellList = {};

  //Cell-0: refToCellWithClassEqualToKey

for (let i = 0; i < ticTacToeCells.length; i++) {
  individualCellList[`Cell-${i}`] = ticTacToeCells[i];
}
