import { EventDrivenFunctionalityManager } from "./modules/Event-Driven-Functionality-Manager";

const testInstance = new EventDrivenFunctionalityManager(document.body);

testInstance.eventListenerOn("mousedown");

testInstance.addFunctionalityToEvent(
  "click",
  "i hate it here",
  (event) => {
    console.log(event);
  }
);
