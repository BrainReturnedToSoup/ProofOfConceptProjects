import { individualCellList } from "./RefsDOM";

document.addEventListener("click", clickHandler);

function clickHandler(event) {
  const classList = event.target.classList,
    documentIdentity = classList[0],
    cellIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    refDOMCounterpart = individualCellList[cellIdentity];
  switch (true) {
    case cellListKeys.includes(cellIdentity) &&
      event.target === refDOMCounterpart:
      break;
    case refDOMCounterpart === undefined:
      break;
    default:
  }
}
