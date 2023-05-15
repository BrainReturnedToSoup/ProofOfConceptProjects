import { individualCellList, individualUIButtonList } from "./RefsDOM";

document.addEventListener("click", clickHandler);

function clickHandler(event) {
  const classList = event.target.classList,
    elementIdentity = classList[1],
    cellListKeys = Object.keys(individualCellList),
    UIButtonListKeys = Object.keys(individualUIButtonList);
  switch (true) {
    case cellListKeys.includes(elementIdentity):
      break;
    case UIButtonListKeys.includes(elementIdentity):
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

