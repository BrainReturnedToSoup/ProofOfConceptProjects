class EventDrivenFunctionalityManager {
  //basically initializes the class instance, takes an argument that represents the element to append all event listeners to
  //which are created within this class instance. Also initializes data structures important for facilitating the functionalities
  //of the various private and public methods within said class
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
  #validEventListeners = [
    "input",
    "submit",
    "focus",
    "blur",
    "click",
    "mousedown",
    "mouseup",
    "mouseover",
  ];

  //holds references to valid event listeners, and holds
  //data to represent what to initialize every
  //added property to equal by default
  #eventListenerDataStructures = {
    active: () => {
      return false;
    },
    entryPointRefs: () => {
      return null;
    },
    functionalities: () => {
      return new Object();
    },
  };

  //basically sets up the data structures to incorporate some default properties an values necessary
  //to facilitate the other functionality within the class. This way, for instance in the future that I
  //add another valid event listener, I can simply just add it to the valid event listeners array and
  //everything will work with it, all without having to edit the already present functionality too much
  //if necessary
  #initEventListenerDataStructures() {
    if (this.#validEventListeners.length > 0) {
      for (let dataStructure in this.#eventListenerDataStructures) {
        //for retrieving the actual reference to a specific data structure that will be initialized internally based
        //on valid event listener types
        const dataStructureRef = this.#eventListenerData[dataStructure];

        for (let eventListenerType of this.#validEventListeners) {
          if (typeof eventListenerType === "string") {
            //for setting the internal properties of the corresponding data structures to their
            //default property values. This way it will account for any new event listener types
            //automatically in the future
            dataStructureRef[eventListenerType] =
              this.#eventListenerDataStructures[dataStructure]();
          } else {
            throw new TypeError(
              `Current event listener type being referenced within validEventListeners is not a correct data type, should be a string, received '${eventListenerType}'`
            );
          }
        }
      }
    } else {
      throw new ReferenceError(
        `Could not initialize necessary data structures within the class instance, as there are not any valid event listeners to add to any corresponding data structure, validEventListeners is empty`
      );
    }
  }

  //the target element to append all of these event listeners to
  #targetElement = null;

  #eventListenerData = {
    //an easy storage for keeping track of already initialized event listeners
    //each property is a unique event listener type set to a boolean
    active: {},

    //holds key value pairs to the callbacks used to catch any events
    //from corresponding event listeners based on their type. If
    //the corresponding event listener isn't active, their corresponding
    //value is equal to null
    entryPointRefs: {},

    //will hold key value pairs for corresponding event types, and
    //and object holding all of the callbacks to execute upon each
    //event caught pertaining to said event type
    functionalities: {},
  };

  //holds reference data to validate arguments supplied to the various apis
  #validatorReferenceData = {
    addFunctionalityToEvent: {
      eventListenerType: {
        type: "string",
        validInputs: this.#validEventListeners,
      },
      uniqueIdentifier: {
        type: "string",
      },
      callback: { type: "function" },
    },
    removeFunctionalityFromEvent: {
      eventListenerType: {
        type: "string",
        validInputs: this.#validEventListeners,
      },
      uniqueIdentifier: {
        type: "string",
      },
    },
    eventListenerOn: {
      eventListenerType: {
        type: "string",
        validInputs: this.#validEventListeners,
      },
    },
    eventListenerOff: {
      eventListenerType: {
        type: "string",
        validInputs: this.#validEventListeners,
      },
    },
  };

  //conducts validation on supplied args and compares them to the validation reference data
  #argValidatorForApis(method, argsObj) {
    if (method in this.#validatorReferenceData) {
      const validationRefs = this.#validatorReferenceData[method];
      for (let methodArg in validationRefs) {
        //iterate through all of the corresponding arguments based on the selected method

        const methodArgValidProps = validationRefs[methodArg];

        //checks if type is a property to validate against the corresponding argument
        if (methodArgValidProps.hasOwnProperty("type")) {
          //check the typing
          if (typeof argsObj[methodArg] !== methodArgValidProps["type"]) {
            throw new TypeError(
              `Value of received argument for a corresponding api is not the correct data type, received '${
                argsObj[methodArg]
              }' as the value with a data type of '${typeof argsObj[
                methodArg
              ]}' for the argument '${methodArg}' for the method '${method}', needs to be a(n) '${
                methodArgValidProps["type"]
              }'`
            );
          }

          if (methodArgValidProps["type"] === "string") {
            //if the corresponding argument didn't fail its typing test, and it's supposed to be a string, validate the string
            const stringPassed = this.#stringValidator(argsObj[methodArg]);

            if (!stringPassed) {
              throw new ReferenceError(
                `Value of a received argument for a corresponding api is a string that is invalid, most likely empty or contains spaces, received '${argsObj[methodArg]}' for the argument '${methodArg}' for the method '${method}'`
              );
            }
          }
        }

        //checks if validInputs is a property to validate against the corresponding argument
        if (
          methodArgValidProps.hasOwnProperty("validInputs") &&
          !methodArgValidProps["validInputs"].includes(argsObj[methodArg])
        ) {
          throw new ReferenceError(
            `Value of received argument for a corresponding api is not valid because it does not match one of the valid
               parameters to accept for the specific argument, received '${
                 argsObj[methodArg]
               }' as the value with a data type of '${typeof argsObj[
              methodArg
            ]}' for the argument '${methodArg}' for the method '${method}', needs to be a(n) '${
              methodArgValidProps["type"]
            }' as well as match one of these valid inputs '${
              methodArgValidProps["validInputs"]
            }'`
          );
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to perform validation on a specific apis input arguments, the reference data for the corresponding api 
          does not exist within 'validatorReferenceData', received '${method}' as the method attempting to be validated`
      );
    }
  }

  //makes sure that a supplied string for what ever reason isn't empty
  //or contains any spaces
  #stringValidator(string) {
    //checking for if the string is just an empty string
    if (string === "") {
      return false;
    }

    const sanitizedString = string.replace(/\s/g, "");

    //checking for any spaces within the string
    return string === sanitizedString;
  }

  //will be supplied to each event listener creation in order
  //to serve as the entry point to execute the appended functionality
  //for the specific event listener type, so that all associated functionality
  //is executed every event caught
  #eventFunctionalityEntryPoint(event, eventListenerType) {
    if (eventListenerType in this.#eventListenerData.functionalities) {
      //checks for the existence of the event listener type, as well as whether the associated functionality reference has methods to execute
      const functionalityObj =
          this.#eventListenerData.functionalities[eventListenerType],
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
      this.#validEventListeners.includes(eventListenerType) &&
      this.#eventListenerData.active[eventListenerType] === false
    ) {
      //have to make a separate callback to supply to the event listener, so that I can have the reference to it
      //in the future in order to be able to remove said event listener when needed
      const { active, entryPointRefs } = this.#eventListenerData;

      const listenerEntryPoint = (e) => {
        this.#eventFunctionalityEntryPoint(e, eventListenerType);
      };

      this.#targetElement.addEventListener(
        eventListenerType,
        listenerEntryPoint
      ); //create event listener and append it to target element

      entryPointRefs[eventListenerType] = listenerEntryPoint; //store the callback to be used later if needed

      active[eventListenerType] = true; //toggle the specific event listener as active
    } else {
      throw new Error(
        `Cannot add specific event listener, as the target event listener is already active, or is not a valid event listener to initialized, received '${eventListenerType}' as the event listener trying to be initialized, here are some valid event listeners to create '${Object.values(
          this.#validEventListeners
        )}'`
      );
    }
  }

  //will remove the target event listener from the target element if it is active as well as check if
  //the evet listener type exists within the existing
  #eventListenerRemover(eventListenerType) {
    if (
      this.#validEventListeners.includes(eventListenerType) &&
      this.#eventListenerData.active[eventListenerType] === true
    ) {
      const { active, entryPointRefs } = this.#eventListenerData;

      const listenerEntryPointRef = entryPointRefs[eventListenerType]; //have to retrieve the exact callback that was used when creating the event listener from before

      this.#targetElement.removeEventListener(
        eventListenerType,
        listenerEntryPointRef
      ); //remove the event listener from the target element

      entryPointRefs[eventListenerType] = null; //reset the callback reference back to null since the event listener was removed

      active[eventListenerType] = false; //toggle the specific event listener as inactive
    } else {
      throw new Error(
        `Cannot remove specific event listener, as the target event listener is not currently active, received ${eventListenerType}`
      );
    }
  }

  //will add a callback to perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type. This callback is managed by
  //assigning it an identifier as its key, and the callback is the value of said key
  addFunctionalityToEvent(eventListenerType, uniqueIdentifier, callback) {
    try {
      this.#argValidatorForApis("addFunctionalityToEvent", {
        eventListenerType,
        callback,
        uniqueIdentifier,
      });

      //make sure that the unique identifier for the supplied callback to be
      //executed isn't already present in the corresponding event functionalities
      const functionalitiesForSpecificEvent =
        this.#eventListenerData.functionalities[eventListenerType];

      if (!functionalitiesForSpecificEvent.hasOwnProperty(uniqueIdentifier)) {
        //adds a new method to the object that holds all of the methods to execute everytime the corresponding event is caught
        functionalitiesForSpecificEvent[uniqueIdentifier] = callback;
      } else {
        throw new Error(
          `Failed to add functionality to a specific event listener, as the supplied unique identifier already matches an existing callback within said specific event listener functionality, received '${uniqueIdentifier}' for the callback '${callback}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //will remove a callback from perhaps a list of callbacks to execute to
  //pertaining to the specific event listener type. Finds the corresponding functionality
  //using the supplied key
  removeFunctionalityFromEvent(eventListenerType, uniqueIdentifier) {
    try {
      this.#argValidatorForApis("removeFunctionalityFromEvent", {
        eventListenerType,
        uniqueIdentifier,
      }); //validate input

      //make sure that a callback with the unique identifier as its key exists within the
      //corresponding functionality

      const functionalitiesForSpecificEvent =
        this.#eventListenerData.functionalities[eventListenerType];

      if (functionalitiesForSpecificEvent.hasOwnProperty(uniqueIdentifier)) {
        delete functionalitiesForSpecificEvent[uniqueIdentifier]; //deletes the target method entirely if it exists within the target event listener functionality
      } else {
        throw new Error(
          `Failed to remove a specific functionality associated with the supplied unique identifier from the corresponding event listener functionality, the method was not found, received '${uniqueIdentifier}' as the unique identifier for the corresponding event listener '${eventListenerType}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //turns an an event listener by adding it from the target element
  eventListenerOn(eventListenerType) {
    try {
      this.#argValidatorForApis("eventListenerOn", { eventListenerType }); //validate input
      this.#eventListenerInitializer(eventListenerType); //initialize the event listener corresponding to the supplied type
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //turns off an event listener by removing it from the target element
  eventListenerOff(eventListenerType) {
    try {
      this.#argValidatorForApis("eventListenerOff", { eventListenerType }); //validate input
      this.#eventListenerRemover(eventListenerType); //remove the event listener corresponding to the supplied type
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //a simple api to get the data on currently existing methods per event type
  getExistingFunctionalities() {
    return this.#eventListenerData.functionalities;
  }

  //a simple api to get the data representing whether each specific event listener is on or off
  getActiveEventListeners() {
    return this.#eventListenerData.active;
  }
}

class ElementRefManager {
  //acts as a means of managing all element references supplied to the class instance
  //highly reuseable as it can be applied to pretty much any front end feature

  #cache = new Map();

  //will be what actually manipulates the cache based on the instructions given, also returns any errors that it comes across when doing so
  #cacheManipulator(methodType, key, value) {
    const errors = [];

    if (typeof key === "string") {
      switch (methodType) {
        case "set":
          if (value instanceof Element) {
            this.#cache.set(key, value);
          } else {
            errors.push(
              new TypeError(
                `Supplied value to be stored within the element cache manager is not an element, received '${value}' as the value corresponding to the supplied key '${key}'`
              )
            );
          }
        case "get":
          return this.#cache.get(key);
        case "delete":
          this.#cache.delete(key);
          break;
        default:
          errors.push(
            new SyntaxError(
              `Supplied 'methodType' argument value does not match any of the valid methods available to enact on the cache within '${this.constructor.name}', received '${methodType}' as the supplied method type`
            )
          );
      }
    } else {
      errors.push(
        new TypeError(
          `Supplied 'key' argument value is an incorrect data type, must be a string, received '${key}'`
        )
      );
    }

    this.#throwFoundErrors(errors);
  }

  //for throwing multiple errors found within an operation, so
  //that a try/catch can potentially handle multiple errors as opposed to say only one error at a time if needed
  #throwFoundErrors(errorArr) {
    if (errorArr.length > 0) {
      throw errorArr;
    }
  }

  //APIs for adding, removing, or retrieving stored element refs
  addRef(key, value) {
    try {
      this.#cacheManipulator("set", key, value);
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  deleteRef(key) {
    try {
      this.#cacheManipulator("delete", key);
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  retrieveRef(key) {
    try {
      return this.#cacheManipulator("get", key);
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

//creates an object within the local cache,
//in which you add key value pairs to this object based on the local storage cache manager instance
//it will only be able to access and manipulate that initialized object that the instance creates
class LocalStorageCacheManager {
  //will be used to initialize a specific cache within the local storage,
  //but will do nothing if it already exists
  constructor(cacheName) {
    if (!localStorage.getItem(cacheName)) {
      localStorage.setItem(cacheName, {}); //defines the cache equal to an empty object if it didn't already exist within the local storage
    }

    this.#cacheName = cacheName; //saves the cache name to be used later
  }

  #cacheName = null; // name of the specific cache within local storage, which is defined with the direct local storage methods
  //its the value stored that functions as the complex data structure for the caching of information within this class instance

  //parses supplied values as json, for when you pull from the local storage
  #parser(value) {
    return JSON.parse(value);
  }

  //stringifies supplied value, for when you want to save to the local storage
  #stringify(value) {
    return JSON.stringify(value);
  }

  //retrieves the cache from the local storage
  #fetchCache() {
    return this.#parser(localStorage.getItem(this.#cacheName));
  }

  //stores the cache after it was received and manipulated back into storage
  #storeCache(newCache) {
    localStorage.setItem(this.#cacheName, this.#stringify(newCache));
  }

  //adds a value to the cache
  addValue(key, value) {
    try {
      const cache = this.#fetchCache(); //get the cache from local

      //attempt to add a new key value pair to said cache retrieved
      if (!cache.hasOwnProperty(key)) {
        cache[key] = value;
      } else {
        throw new ReferenceError(
          `Failed to add key value pair to a specific cache within local storage, the key already exists within the cache and a value is associated with such, received '${key}' as the key for the cache '${
            this.#cacheName
          }'`
        );
      }

      this.#storeCache(cache); //update the cache after the changes are made
    } catch (error) {
      console.error(error.error.stack);
    }
  }

  //removes a value from the cache
  removeValue(key) {
    try {
      const cache = this.#fetchCache(); //get the cache from local

      //attempt to delete the supplied key
      if (cache.hasOwnProperty(key)) {
        delete cache[key];
      } else {
        throw new ReferenceError(
          `Failed to remove a key value pair from a specific cache within local storage, they key supplied does not exist within the cache, received '${key}' as the key for the cache '${
            this.#cacheName
          }'`
        );
      }

      this.#storeCache(cache); //update cache after changes are made
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //retrieves a value from the cache
  retrieveValue(key) {
    try {
      const cache = this.#fetchCache(); //get the cache from local

      //attempt to retrieve the value associated with the supplied key
      if (cache.hasOwnProperty(key)) {
        return cache[key];
      } else {
        throw new ReferenceError(
          `Failed to retrieve a value associated with the supplied key from the specific cache, the key value pair does not exist within it, received '${key}' as the key for the cache '${
            this.#cacheName
          }'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //retrieves all existing values from the cache
  retrieveAllValues() {
    try {
      const cache = this.#fetchCache(); //get the cache from local

      return cache; //return the entire cache which in turn returns all of the values essentially
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //clears the entire cache of all key value pairs
  clearAllValues() {
    try {
      const cache = {}; //no need to get cache from local, just set it equal to an empty object

      this.#storeCache(cache); //update cache after changes are made
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
//will pull from a cache in order to render options
//under the search bar
class DynamicOptions {
  //simple constructor to accept an element reference manager
  //as its argument for dependency injection.
  constructor(elementRefManager, eventDrivenFunctionalityManager, weatherApi) {
    try {
      //validate elementRefManager arg
      if (elementRefManager instanceof ElementRefManager) {
        this.#helperClasses.elementRefManager = elementRefManager; //save the reference manager instance to the state
      } else {
        throw new ReferenceError(
          `Supplied value for the element reference manager to use is not an instance from the class 'ElementRefManager', received '${elementRefManager}'`
        );
      }

      //validate eventDrivenFunctionalityManager arg
      if (
        eventDrivenFunctionalityManager instanceof
        EventDrivenFunctionalityManager
      ) {
        this.#helperClasses.eventDrivenFunctionalityManager =
          eventDrivenFunctionalityManager; //save the functionality manager instance to the state
      } else {
        throw new ReferenceError(
          `Supplied value for the functionality manager to use is not an instance from the class 'EventDrivenFunctionalityManager', received '${eventDrivenFunctionalityManager}'`
        );
      }

      //validate weather api arg
      if (weatherApi instanceof WeatherApi) {
        this.#helperClasses.weatherApi = weatherApi; //save the api instance to the state
      } else {
        throw new ReferenceError(
          `Supplied value for the api instance to use is not a class instance, received '${weatherApi}'`
        );
      }

      this.#retrieveRequiredRefs(); //if no errors were thrown before hand, that means you have everything to fetch
      // the required refs needed to facilitate the functionality of this class, that being the data list element reference
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //holds specific class instances that will help facilitate the funcionality of this class
  #helperClasses = {
    elementRefManager: null,
    eventDrivenFunctionalityManager: null,
    weatherApi: null,
  };

  //holds references to specific elements that are part of the functionality of this class
  #retrievedElementRefs = {
    dataList: null,
    searchBar: null,
  };

  //a simple way to manage whether the various internal functionalities are
  //on or not
  #stateData = {
    functionalityOn: false,
    eventListenersOn: false,
  };

  //retrieved the element references from the reference manager supplied
  #retrieveRequiredRefs() {}

  //builds all of the possible options based on the data received by the dataRetrievalCallback method
  #buildOptions() {}

  //takes all of the built options and renders them on the DOM dynamically
  #renderOptions() {}

  //will request to render options that are based on the current input of the search bar.
  //this method will pull from the local storage and use the already stored location names
  //as the reference to load. This way the user can look up an already saved location, in which
  //the name supplied was used to fetch data from the supplied at some point in time. The options
  //saved in local storage will only be for things that were successful for the fetch
  #requestOptionsToRender(currentInput) {}

  //acts as the entry point method that will execute
  #functionalityEntryPoints = {
    input: () => {}, // used to facilitate the fetching of data, creation of elements, and rendering based on every input event.
    // Doesn't need an event supplied as the search bar will be the only form control element to listen to
    focus: () => {}, // similar to the previous input method, but will be for cases say when the user clicks off of said search bar, and then clicks on it again, the
    // options render back in a similar manner to how the input method does, but without the user actually changing anything within said search bar
    blur: () => {}, // used to clear the data list that represents the options rendered in order to essentially disable the options when the user clicks off
  };

  //methods to control whether to add the functionalities to the functionality manager or not
  #functionalities = {
    init: () => {
      const { eventDrivenFunctionalityManager } = this.#helperClasses, // gets the functionality manager instance
        { input, focus, blur } = this.#functionalityEntryPoints; //gets the necessary event type functionality entry point methods to add

      //add functionalities needed to facilitate this class to the functionality manager

      //input is for rendering options based on the input changing and checking the search bar value
      eventDrivenFunctionalityManager.addFunctionalityToEvent(
        "input",
        "SearchBarDynamicOptionsInput",
        input
      );

      //focus is for rendering options based on the user focusing the search bar by clicking on it
      eventDrivenFunctionalityManager.addFunctionalityToEvent(
        "focus",
        "SearchBarDynamicOptionsFocus",
        focus
      );

      //blur is for deleting any options that are already rendered when the user clicks off of the search bar
      eventDrivenFunctionalityManager.addFunctionalityToEvent(
        "blur",
        "SearchBarDynamicOptionsBlur",
        blur
      );
    },
    remove: () => {
      const { eventDrivenFunctionalityManager } = this.#helperClasses;

      //remove all of the associated event listener type functionalities added to the
      //functionality manager
      eventDrivenFunctionalityManager.removeFunctionalityFromEvent(
        "input",
        "SearchBarDynamicOptionsInput"
      );

      eventDrivenFunctionalityManager.removeFunctionalityFromEvent(
        "focus",
        "SearchBarDynamicOptionsFocus"
      );

      eventDrivenFunctionalityManager.removeFunctionalityFromEvent(
        "blur",
        "SearchBarDynamicOptionsBlur"
      );
    },
  };

  //methods to control whether the event listeners are on or off
  #eventListeners = {
    init: () => {
      const { eventDrivenFunctionalityManager } = this.#helperClasses;

      //turns on all of the event listeners needed to facilitate functionality
      //doesn't include the input event, because it should already be toggled by the main search
      //bar functionality class, we just need to turn on the additional event listeners
      eventDrivenFunctionalityManager.eventListenerOn("focus");

      eventDrivenFunctionalityManager.eventListenerOn("blur");
    },
    remove: () => {
      const { eventDrivenFunctionalityManager } = this.#helperClasses;

      //turns off all of the event listeners relating specifically to this class
      eventDrivenFunctionalityManager.eventListenerOff("focus");

      eventDrivenFunctionalityManager.eventListenerOff("blur");
    },
  };

  activate() {
    try {
      if (
        !this.#stateData.eventListenersOn &&
        !this.#stateData.functionalityOn
      ) {
        //add functionalities and then turn on the event listeners, this will make the entire feature work
        this.#functionalities.init();
        this.#eventListeners.init();
      } else {
        throw new Error(
          `Failed to activate class functionalities, either the event listeners, the functionalities attached to said event listeners, or perhaps both are already on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  } //api that is meant to activate the functionality of this class, includes functionalities and event listeners

  deactivate() {
    try {
      if (this.#stateData.eventListenersOn && this.#stateData.functionalityOn) {
        //remove event listeners and then remove the functionalities
        this.#eventListeners.remove();
        this.#functionalities.remove();
      } else {
        throw new Error(
          `Failed to deactivate class functionalities, either the event listeners, the functionalities attached to said event listeners, or both are already off`
        );
      }
    } catch (error) {}
  } //api that is meant to deactivate the functionality of this class, includes functionalities and event listeners
}

//will be used to implement functionality on the search bar itself
class SearchBarFunctionality {
  constructor(apiInstance) {}
}

class SearchBarConstructor {
  constructor(
    elementRefManager,
    uniqueIdentifier,
    action = "#",
    method = "post",
    addDataList = false
  ) {
    try {
      //validate reference manager
      if (elementRefManager instanceof ElementRefManager) {
        this.#configData.elementRefManager = elementRefManager;
      } else {
        throw new ReferenceError(
          `Failed to create new '${this.constructor.name}' class instance, the supplied element reference manager is not an instance of the 'ElementRefManager' class, received '${elementRefManager}'`
        );
      }

      //returing the validity of arguments that are supposed to be a string
      const isUniqueIdentifierValid = this.#isStringValid(uniqueIdentifier),
        isActionValid = this.#isStringValid(action),
        isMethodValid = this.#isStringValid(method);

      if (isUniqueIdentifierValid) {
        this.#configData.uniqueIdentifier = uniqueIdentifier;
      } else {
        throw new ReferenceError(
          `Failed to create new '${this.constructor.name}' class instance, the supplied 'unique identifier' failed validation, must be a non empty string without any spaces within it, received '${uniqueIdentifier}' as the supplied unique identifier`
        );
      }

      if (isActionValid) {
        this.#configData.action = action;
      } else {
        throw new ReferenceError(
          `Failed to create new '${this.constructor.name}' class instance, the supplied 'action' failed validation, must be a non empty string without any spaces within it, received '${action}' as the supplied action`
        );
      }

      if (isMethodValid) {
        this.#configData.method = method;
      } else {
        throw new ReferenceError(
          `Failed to create new '${this.constructor.name}' class instance, the supplied 'method' failed validation, must be a non empty string without any spaces within it, received '${method}' as the supplied method`
        );
      }

      //check if the value supplied for the addDataList argument is a boolean to determine whether to use a data list in the construction
      if (typeof addDataList === "boolean") {
      } else {
        throw new TypeError(
          `Failed to create new '${
            this.constructor.name
          }' class instance, the supplied value for the 'addDataList' parameter is not a boolean, received '${addDataList}' with a data type of '${typeof addDataList}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
  #isStringValid(string) {
    if (string === "") {
      return false;
    } //make sure it's not an empty string

    if (string.replace(/\s/, "") !== string) {
      return false;
    } //make sure the string does not contain any spaces whatsoever

    return true;
  }

  //holds data that will configure the behavior and the structure of
  //the produced search bar
  #configData = {
    action: "#",
    method: "post",
    addDataList: false,
    uniqueIdentifier: "null",
  };

  //holds references to helper classes which will help with some sort
  //of internal or bigger picture functionality
  #helperClasses = {
    elementRefManager: null,
  };

  //used to construct the various elements on command, and the corresponding
  //elements will match what the config defines
  #elementConstructors = {
    form: () => {
      const formElement = document.createElement("form"),
        generalClass = "search-bar";

      formElement.classList.add(generalClass);
      formElement.classList.add(this.#configData.uniqueIdentifier); //add both of the necessary classes, one a general tag, the other the unique identifier

      formElement.setAttribute("action", this.#configData.action); //define both the action and method of the form, which will determine the behavior of
      formElement.setAttribute("method", this.#configData.method); //the constructed search bar

      return formElement;
    },
    searchBarInput: () => {
      const searchBarInput = document.createElement("input"),
        generalClass = "search-bar-input";

      searchBarInput.classList.add(generalClass);
      searchBarInput.classList.add(this.#configData.uniqueIdentifier); //add both of the necessary classes, one a general tag, the other the unique identifier

      searchBarInput.setAttribute("type", "text"); //define mandatory attributes such as the type, and the name of the input
      searchBarInput.setAttribute(
        "name",
        `search-bar-input_${this.#configData}_var`
      ); //This way the search bar instance can be both semantic and unique in nature

      if (this.#configData.addDataList) {
        searchBarInput.setAttribute(
          "list",
          `search-bar-input-options-${this.#configData.uniqueIdentifier}`
        ); //add an attribute based on whether a data list will be added to this search bar
      }

      return searchBarInput;
    },
    dataList: () => {
      const dataList = document.createElement("datalist"),
        generalClass = "search-bar-input-datalist";

      dataList.classList.add(generalClass);
      dataList.classList.add(this.#configData.uniqueIdentifier); //add both of the necessary classes, one a general tag, the other the unique identifier

      dataList.setAttribute(
        "id",
        `search-bar-input-options-${this.#configData.uniqueIdentifier}`
      ); //define the mandatory attribute that will link the corresponding data list to its input

      return dataList;
    },
  };

  //will be used to choreograph the assembly of the entire
  //search bar, as well as store each individual element created into the
  //reference manager
  #constructSearchBar() {
    const formElement = this.#elementConstructors.form(),
      searchBarInputElement = this.#elementConstructors.searchBarInput(),
      formElementClassList = Array.from(formElement.classList),
      searchBarInputElementClassList = Array.from(
        searchBarInputElement.classList
      );

    this.#storeElementRefs(formElementClassList[0], formElement); //store both the form element and the input element in the reference manager and use their general class assigned to
    this.#storeElementRefs(
      searchBarInputElementClassList[0],
      searchBarInputElement
    ); //them as their unique identifiers within storage

    if (this.#configData.addDataList) {
      //condition to also add a data list if the configuration designates such
      const dataListElement = this.#elementConstructors.dataList(), //will store said element in the same way as the previous two
        dataListElementClassList = Array.from(dataListElement);

      this.#storeElementRefs(dataListElementClassList[0], dataListElement);

      formElement.append(searchBarInputElement); //this is where the appending will happen, thus ensuring a correct configuration
      formElement.append(dataListElement); //in the node tree

      return formElement;
    } else {
      formElement.append(searchBarInputElement); //same thing, but just without the addition of the data list

      return formElement;
    }

    //return the form element at the end, where it will be completely configured, and all of its references were correctly stored in the element reference manager
  }

  //an easier to understand means of interacting with the helper class element reference manager
  #storeElementRefs(key, value) {
    this.#helperClasses.elementRefManager.addRef(key, value);
  }

  //the api to retrieve a constructed search bar after the class instance was created
  //the functionality hasn't been appended in this stage. the api is simple as it simply acts as
  //the entry point into the class, and holds the try catch block to catch any errors
  buildSearchBar() {
    try {
      const completeSearchBar = this.#constructSearchBar();
      return completeSearchBar;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class SearchBar {
  constructor() {}

  #subClasses = {};

  #searchBarElement = null;

  #searchBarAppended = false;

  appendSearchBar(parentElement) {}
}
