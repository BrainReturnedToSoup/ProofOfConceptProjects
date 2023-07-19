import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";

class SearchBarFunctionality {
  constructor(argsObj) {
    try {
      this.#argValidator("constructor", argsObj);

      //apply args to state and config
      const { apiInstance, mediatorMethod, elementReferenceManager } = argsObj;

      this.#helperClasses.apiInstance = apiInstance; //api for the search bar to use for search querying
      this.#helperClasses.elementReferenceManager = elementReferenceManager;

      this.#configData.mediatorMethod = mediatorMethod; //used to connect this class with the supplied api

      //fetch some important element references
      this.#elementReferences.searchBarForm =
        this.#helperClasses.elementReferenceManager.retrieveRef(
          "Search-Bar-Form"
        );

      this.#elementReferences.searchBarInput =
        this.#helperClasses.elementReferenceManager.retrieveRef(
          "Search-Bar-Input"
        );
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //------------------ARGUMENT-VALIDATION-----------------------//

  #argValidationData = {
    //methods
    constructor: {
      //args
      apiInstance: {
        //properties
        instanceof: Object,
      },
      mediatorMethod: {
        type: "function",
      },
      elementReferenceManager: {
        instanceof: ElementRefManager,
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
  };

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

  //------------------STATE-AND-CONFIG-DATA----------------------//

  #configData = {
    mediatorMethod: null,
  };

  #stateData = {
    functionalityActive: false,
    requestInProgress: false,
    responseData: null,
  };

  #helperClasses = {
    apiInstance: null,
    elementReferenceManager: null,
  };

  #elementReferences = {
    searchBarForm: null,
    searchBarInput: null,
  };

  #subscribers = {};

  //-------------------FUNCTIONALITIES---------------------------//

  #makeApiRequest(searchInputValue) {
    const { mediatorMethod } = this.#configData,
      { apiInstance } = this.#helperClasses,
      searchQueryPromise = mediatorMethod(searchInputValue, apiInstance);
    //the mediator method is meant to take the search input and make a corresponding
    //request desired on the supplied api, the api should return a promise, and thus the mediator will
    //return this promise

    return searchQueryPromise;
  }

  #handleSearchQuery() {
    if (!this.#stateData.requestInProgress) {
      this.#stateData.requestInProgress = true;

      const { searchBarInput } = this.#elementReferences,
        searchQueryPromise = this.#makeApiRequest(searchBarInput.value), //get a promise for an api response using the input value of the search
        classScope = this;

      searchQueryPromise
        .then((data) => {
          this.#emitSearchQueryData.bind(classScope)(data);
          //emit the query data, have to bind it to this class instance, because otherwise the method scope will point to the promise
          //and the method wont be able to access this class's private variables
        })
        .catch((error) => {
          console.error(error, error.stack);
        })
        .finally(() => {
          this.#stateData.requestInProgress = false;
        });
    } else {
      console.warn(
        `Attempting to make another search query while another is still in progress, please wait until it resolves or rejects.`
      );
    }
  }

  #test = null;

  //-------------------EVENT-LISTENERS---------------------------//

  #submitFunc = (event) => {
    event.preventDefault(); //prevent regular form submit behavior
    this.#handleSearchQuery(); //start the search functionality
  };

  #addEventListeners() {
    this.#elementReferences.searchBarForm.addEventListener(
      "submit",
      this.#submitFunc
    ); //use the unique as the event listener callback
  }

  #removeEventListeners() {
    this.#elementReferences.searchBarForm.removeEventListener(
      "submit",
      this.#submitFunc
    ); //use it to remove the submit event listener
  }

  //--------------------FETCH-DATA-PUB-SUB-----------------------//

  #emitSearchQueryData = async (fetchedData) => {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    //check for subscribers
    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](fetchedData);
      }
    }
  }; //emits the received data to all of the present subscribers

  subscribe(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribe", { subName, entryPointMethod });

      if (!this.#subscribers.hasOwnProperty(subName)) {
        this.#subscribers[subName] = entryPointMethod;
      } else {
        throw new ReferenceError(`Failed to add a subscriber to the search bar functionality publisher, as the
        subscriber seems to already exist, received '${subName}' as the subscriber being added`);
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
        throw new ReferenceError(`Failed to remove a subscriber from the search bar functionality publisher, as the
        subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`);
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //-------------------------APIs--------------------------------//

  //activate or deactivate the functionality of the search bar instance

  activate() {
    try {
      if (!this.#stateData.functionalityActive) {
        this.#addEventListeners();
      } else {
        throw new Error(
          `Failed to activate the functionality on a specific search bar instance, it appears to already be on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  deactivate() {
    try {
      if (this.#stateData.functionalityActive) {
        this.#removeEventListeners();
      } else {
        throw new Error(
          `Failed to deactivate the functionality on a specific search bar instance, it appears to already be off`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

class SearchBarConstructor {
  constructor(argsObj) {
    try {
      this.#argValidator("constructor", argsObj);

      //apply the arguments to the state as part of configuring said state
      const { uniqueIdentifier, elementReferenceManager, dynamicOptionsOn } =
        argsObj;

      this.#configData.uniqueIdentifier = uniqueIdentifier; //reg data
      this.#configData.dynamicOptionsOn = dynamicOptionsOn;

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //class instance

      this.#completeSearchBar = this.#createSearchBarFrag();
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------------ARGUMENT-VALIDATION-------------------------//

  #argValidationData = {
    //method
    constructor: {
      //args
      uniqueIdentifier: { type: "string" },
      elementReferenceManager: { instanceof: ElementRefManager },
      dynamicOptionsOn: { type: "boolean" },
    },
  };

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

  //---------------------STATE-AND-CONFIG-DATA---------------------//

  #configData = {
    uniqueIdentifier: null, //used to distinguish instances, as well as make the search bar unique on the DOM
    dynamicOptionsOn: null, //decides whether to append a datalist and configure the input with it as well
  };

  #helperClasses = {
    elementReferenceManager: null, //used to store references instead of spam querying
  };

  #completeSearchBar = null;

  //--------------------ELEMENT-REFERENCE-CACHING-------------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //----------------------ELEMENT-CONSTRUCTION----------------------//

  #elementConstructors = {
    form: () => {
      const formElement = document.createElement("form"),
        { uniqueIdentifier } = this.#configData;

      //define classes
      formElement.classList.add("Search-Bar-Form");
      formElement.classList.add(uniqueIdentifier);

      //define attributes
      formElement.setAttribute("novalidate", ""); //part of implementing the search bar functionality manually

      //store reference
      this.#storeElementRef("Search-Bar-Form", formElement);

      return formElement;
    },
    input: () => {
      const inputElement = document.createElement("input"),
        { uniqueIdentifier, dynamicOptionsOn } = this.#configData;

      //define classes
      inputElement.classList.add("Search-Bar-Input");
      inputElement.classList.add(uniqueIdentifier);

      //define attributes
      if (dynamicOptionsOn) {
        inputElement.setAttribute(
          "list",
          `Search-Bar-Data-List-${uniqueIdentifier}`
        );
      }

      //store reference
      this.#storeElementRef("Search-Bar-Input", inputElement);

      return inputElement;
    },
    dataList: () => {
      const dataListElement = document.createElement("datalist"),
        { uniqueIdentifier } = this.#configData;

      //define classes
      dataListElement.classList.add("Search-Bar-Data-List");
      dataListElement.classList.add(uniqueIdentifier);

      //define attributes
      dataListElement.setAttribute(
        "id",
        `Search-Bar-Data-List-${uniqueIdentifier}`
      );

      //store reference
      this.#storeElementRef("Search-Bar-Data-List", dataListElement);

      return dataListElement;
    },
  };

  //----------------------SEARCH-BAR-ASSEMBLY-----------------------//

  #createSearchBarFrag() {
    const { dynamicOptionsOn } = this.#configData;

    //create base search bar
    const formElement = this.#elementConstructors.form(),
      inputElement = this.#elementConstructors.input();

    formElement.append(inputElement);

    if (dynamicOptionsOn) {
      //transform search bar into one with a data list for dynamic options
      const dataListElement = this.#elementConstructors.dataList();

      formElement.append(dataListElement);

      return formElement; //return data list search bar
    } else {
      return formElement; //return base search bar
    }
  }

  //------------------------------APIs------------------------------//

  returnSearchBarFragment() {
    return this.#completeSearchBar;
  }
}

export class WeatherLocationSearchBar {
  //facilitate the building of the entire search bar,
  constructor(uniqueIdentifier) {
    //validate constructor args
    this.#argValidator("constructor", { uniqueIdentifier });

    this.#initHelperClassInstances(uniqueIdentifier); //init all of the helper class instances

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
    searchBarConstructor: null,
    searchBarFunctionality: null,
    elementReferenceManager: null,
  };

  #mediatorMethod = (input, apiInstance) => {
    this.#argValidator("mediatorMethod", { input, apiInstance }); //validate the args coming into the mediator method

    const responsePromise = apiInstance.getCurrentWeather(input); //get a promise instance from the api

    return responsePromise; //return said promise
  };

  #apiKey = "58d62657e3c444ae9a725813231907";

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
      //functionality helper class
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
      //init the search bar functionality class, which requires the element ref manager and the weather api instances as dependencies
      //also uses a mediator method to link the api instance to the search bar functionality
      this.#helperClassInstances.searchBarFunctionality =
        new SearchBarFunctionality({
          apiInstance: this.#helperClassInstances.weatherApi,
          mediatorMethod: this.#mediatorMethod,
          elementReferenceManager:
            this.#helperClassInstances.elementReferenceManager,
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
      this.#argValidationData("unsubscribe", { subName });

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
