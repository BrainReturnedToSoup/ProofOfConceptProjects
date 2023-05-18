import { individualCellList, individualUIButtonList } from "./RefsDOM.js";
const gameRenderer = (gameStateObj) => {
  //renders what is shown on the tic tac toe board by referencing the
  //matrix and replicating such to the DOM
  //The symbols are present in each square already, their display properties
  //are being changed in order to reflect the matrix
  const gameState = gameStateObj.currentState;
  let currentCell = 0;
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      const targetCellChildren =
          individualCellList[`Cell-${currentCell}`].children,
        Osymbol = targetCellChildren[0],
        Xsymbol = targetCellChildren[1];
      if (gameState[i][j] === "O") {
        Osymbol.style.display = "Block";
        Xsymbol.style.display = "";
      } else if (gameState[i][j] === "X") {
        Osymbol.style.display = "";
        Xsymbol.style.display = "Block";
      } else {
        Osymbol.style.display = "";
        Xsymbol.style.display = "";
      }
      currentCell++;
    }
  }
},
UIrenderer = (symbol) => {
  const playerSymbolButton = individualUIButtonList['Toggle-Symbol'];
  playerSymbolButton.textContent = `Player : ${symbol}`
};
gameOverRenderer = (decision) => {

}

export { gameRenderer, UIrenderer };
