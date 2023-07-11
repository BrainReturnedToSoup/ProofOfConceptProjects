class EventDrivenFunctionalityManager {
  constructor(targetElement) {
    try {
      if (targetElement instanceof Element) {
        this.#targetElement = targetElement;
        this.#initEventListenerDataStructures();
      } else {
        throw new ReferenceError(
          `Supplied target element for this class instance is not an element, received '${targetElement}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //holds an array full of the valid event listeners that you can add/remove and
  //control functionalities with
  #validEventListeners = ["input", "submit", "hover", "focus", "blur"];

  //holds references to valid event listeners, and holds
  //data to represent what to initialize every
  //added property to equal by default
  #eventListenerDataStructures = {
    activeEventListeners: false,
    eventListenerEntryPointRefs: null,
    eventListenerFunctionality: {},
  };

  //basically sets up the data structures to incorporate some default properties an values necessary
  //to facilitate the other functionality within the class. This way, for instance in the future that I
  //add another valid event listener, I can simply just add it to the valid event listeners array and
  //everything will work with it, all without having to edit the already present functionality too much
  //if necessary
  #initEventListenerDataStructures() {
    for (let dataStructure in this.#eventListenerDataStructures) {
      const dataStructureRef = this.#getPrivatePropertyReference(dataStructure);
      //for retrieving the actual reference to a specific data structure that will be initialized internally based
      //on valid event listener types

      for (let eventListenerType of this.#validEventListeners) {
        //for setting the internal properties of the corresponding data structures to their
        //default property values. This way it will account for any new event listener types
        //automatically in the future
        dataStructureRef[eventListenerType] =
          this.#eventListenerDataStructures[dataStructure];
      }
    }
  }

  //used to retrieve private property references that may be
  //references by say an object whos keys represent these private properties
  #getPrivatePropertyReference(property) {
    const privateProp = `#${property}`;
    if (this[privateProp]) {
      return this[privateProp];
    } else {
      throw new ReferenceError(
        `Could not fetch a reference to a private property, as the private property does not exist within the class instance, received ${property}`
      );
    }
  }

  //the target element to append all of these event listeners to
  #targetElement = null;

  //an easy storage for keeping track of already initialized event listeners
  //each property is a unique event listener type set to a boolean
  #activeEventListeners = {};

  //holds key value pairs to the callbacks used to catch any events
  //from corresponding event listeners based on their type. If
  //the corresponding event listener isn't active, their corresponding
  //value is equal to null
  #eventListenerEntryPointRefs = {};

  //will hold key value pairs for corresponding event types, and
  //and object holding all of the callbacks to execute upon each
  //event caught pertaining to said event type
  #eventListenerFunctionality = {};

  //holds reference data to validate arguments supplied to the various apis
  #validatorReferenceData = {
    addFunctionalityToEvent: {
      eventListenerType: {
        type: "string",
        validInputs: Object.keys(this.#activeEventListeners),
      },
      callback: {},
    },
    removeFunctionalityFromEvent: {},
    eventListenerOn: {},
    eventListenerOff: {},
  };

  //conducts validation on supplied args and compares them
  #argValidatorForApis(method, args) {}

  //will be supplied to each event listener creation in order
  //to serve as the entry point to execute the appended functionality
  //for the specific event listener type, so that all associated functionality
  //is executed every event caught
  #eventFunctionalityEntryPoint(event, eventListenerType) {
    if (eventListenerType in this.#eventListenerFunctionality) {
      //checks for the existence of the event listener type, as well as whether the associated functionality reference has methods to execute
      const functionalityObj =
          this.#eventListenerFunctionality[eventListenerType],
        hasMethodsToExecute = Object.keys(functionalityObj).length > 0;

      if (hasMethodsToExecute) {
        for (let method in functionalityObj) {
          functionalityObj[method](event); //executes every existing method within the corresponding event type functionality object, and does so with the supply of the event
        }
      } else {
        //simple warning for user when they have an event listener running but its not actually executing any functionality
        console.warn(
          `Functionality for a corresponding event type is attempting to execute, but there isn't any methods to execute for said event type within 'eventListenerFunctionality', received '${eventListenerType}' as the type of event that is on, but doesn't have actual functionality associated with it`
        );
      }
    } else {
      throw new ReferenceError(
        `Could not execute associated event functionality, as the property that represents the event type within 'eventListenerFunctionality' does not exist, received ${eventListenerType} for the event listener type`
      );
    }
  }

  //will add the target event listener from the target element if it is not active as well as check if the
  //event listener type exists within the functionality data structure
  #eventListenerInitializer(eventListenerType) {
    if (
      eventListenerType in this.#activeEventListeners &&
      !this.#activeEventListeners[eventListenerType]
    ) {
      //have to make a separate callback to supply to the event listener, so that I can have the reference to it
      //in the future in order to be able to remove said event listener when needed
      const listenerEntryPoint = (e) => {
        this.#eventFunctionalityEntryPoint(e, eventListenerType);
      };

      this.#targetElement.addEventListener(
        eventListenerType,
        listenerEntryPoint
      ); //create event listener

      this.#eventListenerEntryPointRefs[eventListenerType] = listenerEntryPoint; //store the callback to be used later if needed

      this.#activeEventListeners[eventListenerType] = true; //toggle the specific event listener as active
    } else {
      throw new Error(
        `Cannot add specific event listener, as the target event listener is already active, received ${eventListenerType}`
      );
    }
  }

  //will remove the target event listener from the target element if it is active as well as check if
  //the evet listener type exists within the existing
  #eventListenerRemover(eventListenerType) {
    if (
      eventListenerType in this.#activeEventListeners &&
      this.#activeEventListeners[eventListenerType]
    ) {
      const listenerEntryPointRef =
        this.#eventListenerEntryPointRefs[eventListenerType]; //have to retrieve the exact callback that was used when creating the event listener from before

      this.#targetElement.removeEventListener(
        eventListenerType,
        listenerEntryPointRef
      ); //remove the event listener

      this.#eventListenerEntryPointRefs[eventListenerType] = null; //reset the callback reference back to null since the event listener was removed

      this.#activeEventListeners[eventListenerType] = false; //toggle the specific event listener as inactive
    } else {
      throw new Error(
        `Cannot remove specific event listener, as the target event listener is not currently active, received ${eventListenerType}`
      );
    }
  }

  //will add a callback to perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type
  addFunctionalityToEvent(eventListenerType, callback) {
    try {
      this.#argValidatorForApis("addFunctionalityToEvent", {
        eventListenerType,
        callback,
      });
      // logic for adding specific functionality to the corresponding event type
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //will add a callback from perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type
  removeFunctionalityFromEvent(eventListenerType, callback) {
    try {
      this.#argValidatorForApis("removeFunctionalityFromEvent", {
        eventListenerType,
        callback,
      }); //validate input
      // logic for removing specific functionality to the corresponding event type
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //turns an an event listener by adding it from the target element
  eventListenerOn(eventListenerType) {
    try {
      this.#argValidatorForApis("eventListenerOn", { eventListenerType }); //validate input
      this.#eventListenerInitializer(eventListenerType);
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //turns off an event listener by removing it from the target element
  eventListenerOff(eventListenerType) {
    try {
      this.#argValidatorForApis("eventListenerOff", { eventListenerType }); //validate input
      this.#eventListenerRemover(eventListenerType);
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
