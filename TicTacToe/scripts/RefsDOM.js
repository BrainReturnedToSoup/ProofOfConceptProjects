const bodyElement = document.querySelector("body"),
  //Query for body element ref

  ticTacToeContainer = bodyElement.children[0],
  //TicTacToe-Container

  ticTacToeCells = ticTacToeContainer.children,
  //TicTacToe-Cell list

  individualCellList = {};

//Cell-0: refToCellWithClassEqualToKey
//This loop populates individualCellList with these key/value pairs
for (let i = 0; i < ticTacToeCells.length; i++) {
  individualCellList[`Cell-${i}`] = ticTacToeCells[i];
}