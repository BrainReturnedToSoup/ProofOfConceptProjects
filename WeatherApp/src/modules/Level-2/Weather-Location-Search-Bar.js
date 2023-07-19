import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";
import { SearchBarFunctionality } from "../Level-1/Search-Bar-Functionality.js";
import { SearchBarConstructor } from "../Level-1/Search-Bar-Constructor.js";

export class WeatherLocationSearchBar {
  //facilitate the building of the entire search bar,
  constructor(uniqueIdentifier, apiKey) {
    //validate constructor args
    this.#argValidator("constructor", { uniqueIdentifier, apiKey });

    this.#apiKey = apiKey; //save the supplied api key to state to be used later

    this.#initHelperClassInstances(uniqueIdentifier); //init all of the helper class instances which they will already be supplied with the correct dependencies

    this.#buildSearchBar(); //builds the search bar and saves it to the state

    this.#subscribeToApiData(); //so that the controller receives api data from the functionality helper, then it can emit said data to its own subscribers

    this.#turnOnFunctionality(); //turn on the functionality of the search bar after everything else
  }

  //------------------ARGUMENT-VALIDATION-------------------------//

  #argValidationData = {
    //method
    constructor: {
      //args
      uniqueIdentifier: {
        //properties of arg
        type: "string",
      },
      apiKey: {
        type: "string",
      },
    },
    subscribe: {
      subName: {
        type: "string",
      },
      entryPointMethod: {
        type: "function",
      },
    },
    unsubscribe: {
      subName: {
        type: "string",
      },
    },
    append: {
      parentElement: {
        instanceof: Element,
      },
    },
    mediatorMethod: {
      input: {
        type: "string",
      },
      apiInstance: {
        instanceof: WeatherApi,
      },
    },
  };

  //holds methods that actually do the validation of a specific supplied argument on one of its properties
  #validate = {
    type: (suppliedArg, argName, methodOrigin, correctType) => {
      if (typeof suppliedArg !== correctType) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed type validation,
           received '${suppliedArg}' which has a type of '${typeof suppliedArg}',
            needs to have the type '${correctType}'`
        );
      }
    },
    instanceof: (suppliedArg, argName, methodOrigin, correctInstance) => {
      if (!(suppliedArg instanceof correctInstance)) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed instance validation,
           received '${suppliedArg}' which is not an instance of '${correctInstance}'`
        );
      }
    },
  };

  #argValidator(methodName, argsObj) {
    if (this.#argValidationData.hasOwnProperty(methodName)) {
      const methodValidationData = this.#argValidationData[methodName];

      for (let arg in argsObj) {
        const argValue = argsObj[arg];

        //check if a supplied arg is a valid arg to supply
        if (!methodValidationData.hasOwnProperty(arg)) {
          throw new ReferenceError(
            `Unrecognized argument for a specific method, received '${arg}' with a value of '${argsObj[arg]}'`
          );
        }

        //go down the list of properties to check for on the specific arg
        for (let property in methodValidationData[arg]) {
          const correctValue = methodValidationData[arg][property]; //retrieve the data that will be used as a reference for validating the arg

          this.#validate[property](argValue, arg, methodName, correctValue); //validate the arg based on the property being checked currently
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to validate the supplied arguments for a specific method, validation data
         corresponding to this method does not exist, received '${methodName}' as the method being validated`
      );
    }
  }

  //------------------STATE-AND-CONFIG-DATA-----------------------//

  #helperClassInstances = {
    weatherApi: null,
    elementReferenceManager: null,
    searchBarConstructor: null,
    searchBarFunctionality: null,
  };

  //--DEPENDENCY
  #mediatorMethod = (input, apiInstance) => {
    this.#argValidator("mediatorMethod", { input, apiInstance }); //validate the args coming into the mediator method

    const responsePromise = apiInstance.getCurrentWeather(input); //get a promise instance from the api

    return responsePromise; //return said promise
  };

  //--DEPENDENCY
  #apiKey = null; //my api key to use the weatherapi endpoint

  #searchBarAppended = false;

  #completeSearchBarElement = null;

  //------------------CONSTRUCTOR-HELPER-METHODS-------------------//

  #buildSearchBar() {
    //build the complete search bar
    const { searchBarConstructor } = this.#helperClassInstances,
      completeSearchBarElement = searchBarConstructor.returnSearchBarFragment();

    //save the complete search bar to state
    this.#completeSearchBarElement = completeSearchBarElement;
  }

  #subscribeToApiData() {
    const { searchBarFunctionality } = this.#helperClassInstances,
      classScope = this;

    //subscribes to the search bar functionality helper pub sub, so that this
    //controller will receive api data. It will then take this api data and emit
    //it to its own subscribers
    searchBarFunctionality.subscribe(
      "WeatherAppSearchBar",
      this.#publisherEntryPoint.bind(classScope)
      //invoke the publisher entry point method, have to bind the
      //method scope to this class instance, otherwise it will point to the
      //functionality helper class instead, and the private variables within the scope won't be accessible
    );
  }

  #turnOnFunctionality() {
    const { searchBarFunctionality } = this.#helperClassInstances;

    searchBarFunctionality.activate();
  }

  #initHelperClassInstances(uniqueIdentifier) {
    const {
      weatherApi,
      elementReferenceManager,
      searchBarConstructor,
      searchBarFunctionality,
    } = this.#initMethods;

    //inits all of the helper class instances in the correct order,
    //some of these helpers use other helpers as dependencies
    weatherApi();
    elementReferenceManager();
    searchBarConstructor(uniqueIdentifier);
    searchBarFunctionality();
  }

  #initMethods = {
    weatherApi: () => {
      this.#helperClassInstances.weatherApi = new WeatherApi(this.#apiKey);
    },
    elementReferenceManager: () => {
      this.#helperClassInstances.elementReferenceManager =
        new ElementRefManager();
    },
    searchBarConstructor: (uniqueIdentifier) => {
      //init the search bar constructor, which requires the element ref manager instance as a dependency
      this.#helperClassInstances.searchBarConstructor =
        new SearchBarConstructor({
          elementReferenceManager:
            this.#helperClassInstances.elementReferenceManager,
          uniqueIdentifier: uniqueIdentifier,
          dynamicOptionsOn: false,
        });
    },
    searchBarFunctionality: () => {
      //fetch the element references for the specific search bar instance
      const searchBarFormRef =
          this.#helperClassInstances.elementReferenceManager.retrieveRef(
            "Search-Bar-Form"
          ),
        searchBarInputRef =
          this.#helperClassInstances.elementReferenceManager.retrieveRef(
            "Search-Bar-Input"
          );

      //init the search bar functionality class, which requires references to the search bar input and the form element that it exists within,
      //as well as the api instance being used and the mediator method to connect the search bar functionality to the api instance
      this.#helperClassInstances.searchBarFunctionality =
        new SearchBarFunctionality({
          apiInstance: this.#helperClassInstances.weatherApi,
          mediatorMethod: this.#mediatorMethod,
          searchBarForm: searchBarFormRef,
          searchBarInput: searchBarInputRef,
        });
    },
  };

  //--------------------FETCH-DATA-PUB-SUB-------------------------//

  //will be supplied to the SearchBar Functionality class subscription, so that the controller can emit
  //data from successful api requests
  #publisherEntryPoint(apiData) {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](apiData);
      }
    }
  }

  //list of subscribers with their corresponding methods to execute when a successful api request goes through
  #subscribers = {};

  subscribe(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribe", { subName, entryPointMethod });

      if (!this.#subscribers.hasOwnProperty(subName)) {
        this.#subscribers[subName] = entryPointMethod;
      } else {
        throw new ReferenceError(
          `Failed to add a subscriber to the weather app search bar publisher, as the
           subscriber seems to already exist, received '${subName}' as the subscriber being added`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  unsubscribe(subName) {
    try {
      this.#argValidator("unsubscribe", { subName });

      if (this.#subscribers.hasOwnProperty(subName)) {
        delete this.#subscribers[subName];
      } else {
        throw new ReferenceError(
          `Failed to remove a subscriber from the weather app search bar publisher, as the
           subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------------------MAIN-APIs------------------------------//

  //append the complete search bar element after it has been made completely
  append(parentElement) {
    try {
      this.#argValidator("append", { parentElement });

      if (!this.#searchBarAppended) {
        parentElement.append(this.#completeSearchBarElement);

        this.#searchBarAppended = true;
      } else {
        throw new Error(
          `Failed to append a weather app search bar instance, as the target instance was
           already appended somewhere else`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
