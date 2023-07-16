import { EventDrivenFunctionalityManager } from "../Level-0/Event-Driven-Functionality-Manager";
import { ElementRefManager } from "../Level-0/Element-Ref-Manager";
import { LocalStorageCacheManager } from "../Level-0/Local-Storage-Cache-Manager"

//will pull from a cache in order to render options
//under the search bar
class DynamicOptionsConstructor {
  constructor() {}
}

class DynamicOptionsFunctionality {
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

//will be the controller class that choreographs the corresponding construction and functionality
//needed to render in options dynamically to a specific text box
class DynamicOptions {
  constructor() {}
}

//will be used to implement functionality on the search bar itself
//this includes determining whether to implement dynamic options or not,
//making the api requests to the supplied api instance, and storing
//successful api requests using the information within the search bar
//into the local storage so that the dynamic options manager can use that
//data
class SearchBarFunctionality {
  constructor(
    elementRefManager, //for retrieving necessary element references
    eventDrivenFunctionalityManager, //for actually applying functionality that uses DOM events
    apiInstance, //the api to communicate with per search query
    mediatorMethod //the method that sort of bridges the gap between this functionality class, and the api instance being used
    //NEEDS TO BE A FUNCTION THAT WILL ACCEPT THE CURRENT INPUT VALUE OF THE SEARCH BAR UPON ITS SUBMISSION
    //THE MEDIATOR WILL TAKE THIS INPUT AND USE IT TO MAKE A CORRESPONDING API REQUEST UTILIZING ITS INFORMATION
    //THE MEDIATOR WILL RETURN THE PROMISE THAT IT RECEIVED FROM THE API IT INTERACTS WITH
  ) {
    try {
        //validate the constructor arguments
        this.#argValidator("constructor", {
          elementRefManager,
          eventDrivenFunctionalityManager,
          apiInstance,
          mediatorMethod
        });

        //define the internal state with these arguments
        this.#helperClasses.elementRefManager = elementRefManager;
        this.#helperClasses.eventDrivenFunctionalityManager = eventDrivenFunctionalityManager;
        this.#helperClasses.apiInstance = apiInstance;

        this.#configData.mediatorMethod = mediatorMethod;

        this.#retrieveElementRefs(); //after all of the configuration is done, retrieve the needed references to facilitate the functionality
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------------------CLASS-INSTANCE-DATA-AND-REFS-------------------------------//

  //holds various helper class instances in order to facilitate functionalities using the tools in these
  //helper classes to do so
  #helperClasses = {
    elementRefManager: null,
    eventDrivenFunctionalityManager: null,
    apiInstance: null,
  };

  //holds configuration data to determine the behavior of this class
  #configData = {
    mediatorMethod: null,
  };

  //holds data that represents the current state of the class
  #stateData = {
    functionalityOn: false,
    searchSubmitted: false,
  };

  //holds the key value pairs representing subscribers of the emitted api data received
  #subscribers = {};

  //---------------------------ELEMENT-REFERENCE-RETRIEVAL------------------------------//

  //holds references to necessary elements to facilitate
  //functionalities
  #retrievedElementRefs = {
    searchBarInput: null,
  };

    //method that actually retrieves the necessary refs to facilitate the corresponding functionality
    //uses the supplied element reference mananger as the source
   #retrieveElementRefs() {
      this.#retrievedElementRefs.searchBarInput =
        this.#helperClasses.elementRefManager.retrieveRef("search-bar-input");
    }
  
  //--------------------------------ARGUMENT-VALIDATION------------------------------------//

  //will hold data as reference to facilitate various argument validation
  #argValidationData = {
    constructor: {
      elementRefManager: {instanceof: ElementRefManager},
      eventDrivenFunctionalityManager: {instanceof: EventDrivenFunctionalityManager},
      apiInstance: {
        type: "object",
        constructorType: "function", // this way we can check if it's an instance of any type of class
      }, 
      mediatorMethod: {type: "function"},
    },
    removeEmitSubscriber: {
      subscriberName: {
        type: "string",
      },
    },
    addEmitSubscriber: {
      subscriberName: {
        type: "string",
      },
      methodToExecute: {
        type: "function",
      },
    },
  };

  //will validate arguments received based on the method they came from
  #argValidator(method, argObj) {
    if (
      this.#argValidationData.hasOwnProperty(method) &&
      typeof argObj === "object"
    ) {
      //loop through all of the supplied arguments
      for (let argument in argObj) {
        //if the argument is a valid argument in the first place
        if (argument in this.#argValidationData[method]) {
          const argProperties = this.#argValidationData[method][argument],
            receivedArgValue = argObj[argument];

          //check the type of the argument value if applicable
          if (
            argProperties.hasOwnProperty("type") &&
            typeof receivedArgValue !== argProperties["type"]
          ) {
            throw new TypeError(
              `Method failed validation, as one of the supplied arguments failed to meet the necessary data type, the argument was '${argument}' which had a value of '${receivedArgValue}' with the type of '${typeof receivedArgValue}', should have a type of '${
                argProperties["type"]
              }'`
            );
          }

          //check the instance the supplied argument is supposed to be, such as from a specific class
          if(argProperties.hasOwnProperty("instanceof") && receivedArgValue instanceof argProperties["type"] === false) {
            throw new TypeError(`Method failed validation, as one of the supplied arguments failed to be an instance of a specific class, received '${receivedArgValue}' for the argument '${argument}' in which the instance it should be of is '${argProperties["type"]}' but it isn't`)
          }

          //check if the supplied argument is in fact some sort of class instance
          if(argProperties.hasOwnProperty("constructorType") && typeof receivedArgValue.constructor !== argProperties["constructorType"]) {
            throw new TypeError(`Method failed validation, as noe of the supplied arguments failed to be an instance of some type of class, received '${receivedArgValue}' for the argument '${argument}'`)
          }

        } else {
          throw new ReferenceError(
            `Method failed validation, as one of the supplied arguments was not recognized for the method '${method}', the supplied argument was '${argument}'`
          );
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to validate arguments of a specific method supplied, either the method doesn't have validation data to use, or the supplied argument object is not an object, received '${method}' as the supplied method and '${argObj}' as the supplied argument object`
      );
    }
  }


  //------------------------------TOOLS-TO-CONFIGURE-EDFM-INSTANCE---------------------------------//

  #functionalities = {
    init: () => {
      this.#helperClasses.eventDrivenFunctionalityManager.addFunctionalityToEvent(
        "submit",
        "searchBarSubmit",
        this.#submitFunctionality
      );
    }, //adds functionalities to the functionality manager
    remove: () => {
      this.#helperClasses.eventDrivenFunctionalityManager.removeFunctionalityFromEvent(
        "submit",
        "searchBarSubmit"
      );
    }, //removes functionalties from functionality manager
  };

  #eventListeners = {
    init: () => {
      this.#helperClasses.eventDrivenFunctionalityManager.eventListenerOn(
        "submit"
      );
    }, //turns on event listeners, only a submit listener for the most part
    remove: () => {
      this.#helperClasses.eventDrivenFunctionalityManager.eventListenerOff(
        "submit"
      );
    }, //turns off event listeners
  };

  //-------------------------CLASS-SPECIFIC-FUNCTIONALITIES-TO-ADD----------------------------------//

  //entrypoint for the functionality that will execute upon
  //the search bar submitting
  #submitFunctionality() {
    //condition to make sure that you can't spam search requests until the last search promise is resolved first
    if(this.#stateData.searchSubmitted === false) {
      this.#stateData.searchSubmitted = true;

      const { searchBarInput } = this.#retrieveElementRefs,
        {makeApiRequest, emitSuccessfulRequestData, saveSearchBarInput } = this.#functionalities,
        input = searchBarInput.value, //save a specific input state that was submitted
        promiseOfApiResponse = makeApiRequest(input);

      promiseOfApiResponse
      .then((data) => {
        emitSuccessfulRequestData(data); //emit the data that was retrieved from the specific promise
        this.#stateData.searchSubmitted = false; //revert the state back so that another promise can be made, meaning another search can be made
      })
      .catch((error) => {
        console.error(error, error.stack)
      })
    }
  }

  #functionalities = {

    makeApiRequest: (currentInput) => {
      const promiseOfApiResponse =
        this.#configData.mediatorMethod(currentInput, this.#helperClasses.apiInstance); 
        //the mediator method will take the current input, and the api instance, and then execute the functionality
        //needed in order to return a promise from the api instance
        //based on the use case, and the api being interacted with.
        return promiseOfApiResponse
    },
    emitSuccessfulRequestData: (data) => {
      const subscribers = Object.keys(this.#subscribers).length;
      //check if there are any subscribers to emit the data to
      if (subscribers > 0) {
        //if so, iterate through the subscribers, and invoke their associated methods
        //and do so supplying the data as their arguments, so the data received is sent to their method scope
        for (let subscriber in this.#subscribers) {
          this.#subscribers[subscriber](data);
        }
      }
    },
  }

  //--------------------------------------------APIs----------------------------------------------//

  //adds a subscriber that will receive the data that was received on a successful api request
  //the subscriber name will be the key, and the value will be a method that was supplied to execute
  //so that the subscriber can receive the data and do what ever with it
  addEmitSubscriber(subscriberName, methodToExecute) {
    try {
      //validate the incoming arguments for their types and values
      this.#argValidationData("addEmitSubscriber", {
        subscriberName,
        methodToExecute,
      });

      if (!this.#subscribers.hasOwnProperty(subscriberName)) {
        this.#subscribers[subscriberName] = methodToExecute; // add the subscriber to the internal subscriber list, the corresponding method will be executed when an api request is successful
      } else {
        throw new ReferenceError(
          `Failed to add a new subscriber to the search bar publisher, the subscriber attempting to be added already exists, received '${subscriberName}' as the supplied subscriber name`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //similar to the addEmitSubscriber, but it simply removes a subscriber to emit the data to through
  //their supplied method
  removeEmitSubscriber(subscriberName) {
    try {
      //validate incoming args for their types and values
      this.#argValidationData("removeEmitSubscriber", { subscriberName });

      if (this.#subscribers.hasOwnProperty(subscriberName)) {
        delete this.#subscribers[subscriberName];
      } else {
        throw new ReferenceError(
          `Failed to remove an existing subscriber from the search bar subscribers list, the subscriber attempting to be removed does not exist, received '${subscriberName}'`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //activates functionality of the search bar, includes any other injected functionalities,
  //for instance the dynamic options functionality if applicable
  activate() {
    try {
      if (!this.#stateData.functionalityOn) {
        this.#functionalities.init(); //add the associated functionalities first
        this.#eventListeners.init(); //then turn on the event listeners

        this.#stateData.functionalityOn = true; //define the state after the method is done
      } else {
        throw new Error(
          `Failed to activate search bar functionality, as it appears to already be on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //does the same thing as activate, but of course it just deactivates all functionalities,
  //including the injected functionalities
  deactivate() {
    try {
      //check if the functionality is on
      if (this.#stateData.functionalityOn) {
        this.#eventListeners.remove(); //remove event listeners first and then
        this.#functionalities.remove(); //the functionalities

        this.#stateData.functionalityOn = false; //define the state after the method is done
      } else {
        throw new Error(
          `Failed to deactivate search bar functionality, as it appears to already be off`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

class SearchBarConstructor {
  constructor(
    elementRefManager,
    uniqueIdentifier,
    addDataList = false,
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
        generalClass = "search-bar-form";

      formElement.classList.add(generalClass);
      formElement.classList.add(this.#configData.uniqueIdentifier); //add both of the necessary classes, one a general tag, the other the unique identifier

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
        generalClass = "search-bar-data-list";

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
  constructor(apiInstance, mediatorMethod, useDynamicOptions = false) {
    
  } //acts as an entry point to configure the search bar in specific ways, such as the api to fetch from, the mediator method to use

  #subClasses = {}; // sub classes at which they work together to form the entire feature

  #configData = {
    dynamicOptions: null, //data defining whether dynamic options will be used on this instance
  }

  #stateData = {
    searchBarAppended: false, //data point so that the search bar instance cannot be appended more than once
    subscribers: {}, //holds key value pairs representing subscribers to the data that is received on a successful api request made by the search bar
  }

  #searchBarElement = null; // reference to entire search bar fragment

  unsubscribe(subscriberName) {} // a way for modules to unsubscribe from receiving the data

  subscribe(subscriberName, method) {} // and entrypoint for modules to subscribe to the data made by any successful api request by the search bar

  appendSearchBar(parentElement) {} // a way to append the entire search bar to a specific element

  activate(functionality = "main") {} // a way to activate functionalities in a search bar feature, by default it will target the main functionality, not the dynamic options if applicable

  deactivate(functionality = "main") {} // works in the same way the activate api does but for disabling a search bar feature, defaults to the main functionality unless otherwise specified
}
