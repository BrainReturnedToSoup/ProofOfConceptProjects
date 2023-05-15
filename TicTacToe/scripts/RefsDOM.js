const bodyElement = document.querySelector("body"),
  //Query for body element ref

  ticTacToeContainer = bodyElement.children[1],
  //TicTacToe-Container

  ticTacToeCells = ticTacToeContainer.children,
  //TicTacToe-Cell list

  individualCellList = {};

//Cell-0: refToCellWithClassEqualToKey...
//This loop populates individualCellList with these key/value pairs representing each clickable cell
for (let i = 0; i < ticTacToeCells.length; i++) {
  individualCellList[`Cell-${i}`] = ticTacToeCells[i];
}

const ticTacToeHeader = bodyElement.children[0],
  //TicTacToe-Header

  ticTacToeTitleContainer = ticTacToeHeader.children[0],
  //TicTacToe-Title-Container

  ticTacToeUI = ticTacToeHeader.children[1];
//TicTacToe-UI

export {
  bodyElement,
  ticTacToeContainer,
  ticTacToeCells,
  individualCellList,
  ticTacToeHeader,
  ticTacToeTitleContainer,
  ticTacToeUI,
};
