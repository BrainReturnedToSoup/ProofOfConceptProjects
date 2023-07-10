class EventDrivenFunctionalityManager {
  constructor(targetElement) {
    try {
      if (targetElement instanceof Element) {
        this.#targetElement = targetElement;
      } else {
        throw new ReferenceError(
          `Supplied target element for this class instance is not an element, received '${targetElement}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //the target element to append all of these event listeners to
  #targetElement = null;

  //an easy storage for keeping track of already initialized event listeners
  #activeEventListeners = [];

  //holds methods to add non existing event listeners
  #eventListenerInitializers = {};

  //holds methods to remove existing event listeners
  #eventListenerRemovers = {};

  //will hold key value pairs for corresponding event types, and
  //and object holding all of the callbacks to execute upon each
  //event caught pertaining to said event type
  #eventListenerFunctionality = {};

  //will be supplied to each event listener creation in order
  //to serve as the entry point to execute the appended functionality
  //for the specific event listener type, so that all associated functionality
  //is executed every event caught
  #functionalityEntryPoint() {}

  //will add a callback to perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type
  addFunctionalityToEvent(eventListenerType, callback) {
    try {
    } catch (error) {}
  }

  //will add a callback from perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type
  removeFunctionaalityFromEvent(eventListenerType, callback) {
    try {
    } catch (error) {}
  }

  eventListenerOn(eventListenerType) {
    try {
    } catch (error) {}
  }

  eventListenerOff(eventListenerType) {
    try {
    } catch (error) {}
  }
}
