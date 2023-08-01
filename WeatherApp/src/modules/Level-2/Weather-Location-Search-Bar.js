import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";
import { SearchBarFunctionality } from "../Level-1/Search-Bar-Functionality.js";
import { SearchBarConstructor } from "../Level-1/Search-Bar-Constructor.js";

//CREATES THE ENTIRE SEARCH BAR FEATURE INCLUDING THE FUNCTIONALITY UPON CLASS INSTANCE
//TAKES A UNIQUE IDENTIFIER AND AN API KEY SPECIFICALLY FOR 'weatherApi' FOR ITS CONSTRUCTOR ARGS

//USES THE IMPORTED HELPER CLASSES IN ORDER TO MAKE A UNIQUE FEATURE IMPLEMENTATION, SPECIFICALLY FOR SEARCHING
//FOR WEATHER DATA BASED ON THE SUPPLIED LOCATION

//OFFERS A PUB SUB SUBSCRIPTION SO THAT ONE CAN ACCESS THE DATA RETRIEVED FROM THE SEARCH QUERY API
//REQUEST. SUBSCRIBE TO THIS CLASS TO DO SO FOR WEATHER DATA BASED ON THE LOCATION SUPPLIED

//will use the location emitted from the search bar functionality helper class in order to make an api request to the
//weather api in the FindWeatherDataForLocation helper class
class FindWeatherDataForLocation {
  constructor(searchBarFunctionalityInstance, apiKey) {
    try {
      this.#argValidator("constructor", {
        searchBarFunctionalityInstance,
        apiKey,
      });

      this.#helperClasses.searchBarFunctionality =
        searchBarFunctionalityInstance;

      this.#initWeatherApiInstance(apiKey);

      this.#subscribeToSearchBarFunctionalityPublisher();
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------ARGUMENT-VALIDATION----------------//

  #argValidationData = {
    constructor: {
      searchBarFunctionalityInstance: {
        instanceof: SearchBarFunctionality,
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

  //-------------STATE-AND-CONFIG-DATA---------------//

  #helperClasses = {
    searchBarFunctionality: null,
    weatherApi: null,
  };

  #requestInProgress = false;

  //---------------HELPER-METHODS--------------------//

  #initWeatherApiInstance(apiKey) {
    this.#helperClasses.weatherApi = new WeatherApi(apiKey);
  }

  #subscribeToSearchBarFunctionalityPublisher() {
    const { searchBarFunctionality } = this.#helperClasses,
      classScope = this;

    searchBarFunctionality.subscribe(
      "WeatherApiRequest",
      this.#makeApiRequest.bind(classScope)
    );
  }

  #makeApiRequest(inputValue) {
    if (!this.#requestInProgress) {
      this.#requestInProgress = true;

      const { weatherApi } = this.#helperClasses;

      const weatherDataPromise = weatherApi.getCurrentWeather(inputValue),
        classScope = this;

      weatherDataPromise
        .then((data) => {
          this.#emitRetrievedWeatherData.bind(classScope)(data);
        })
        .catch((error) => {
          console.error(error, error.stack);
        })
        .finally(() => {
          this.#requestInProgress = false;
        });
    }
  }

  //--------------FETCH-DATA-PUB-SUB-----------------//

  #emitRetrievedWeatherData(weatherData) {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](weatherData);
      }
    }
  }

  #subscribers = {};

  subscribe(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribe", { subName, entryPointMethod });

      if (!this.#subscribers.hasOwnProperty(subName)) {
        this.#subscribers[subName] = entryPointMethod;
      } else {
        throw new ReferenceError(
          `Failed to add a subscriber to the search bar weather data publisher, as the
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
          `Failed to remove a subscriber from the search bar weather data publisher search bar publisher, as the
           subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class WeatherLocationSearchBar {
  //facilitate the building of the entire search bar,
  constructor(uniqueIdentifier, apiKey) {
    this.#argValidator("constructor", { uniqueIdentifier, apiKey }); //validate constructor args

    this.#apiKey = apiKey; //save the supplied api key to state to be used later

    this.#uniqueIdentifier = uniqueIdentifier; //save to supplied unique identifier to state to be used later

    this.#initHelperClassInstances(); //init all of the helper class instances which they will already be supplied with the correct dependencies

    this.#buildSearchBar(); //builds the search bar and saves it to the state

    this.#initSubscriptions(); //initializes the necessary subscriptions of the helper classes, both the search bar input values, and the api request values

    this.activateFunctionality(); //turn on the functionality of the search bar after everything else
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
    elementReferenceManager: null,
    searchBarConstructor: null,
    searchBarFunctionality: null,
    findWeatherDataForLocation: null,
  };

  //--DEPENDENCY
  #apiKey = null; //my api key to use the weatherapi endpoint

  #uniqueIdentifier = null;

  #functionalityOn = false;

  #completeSearchBarElement = null;

  //------------------CONSTRUCTOR-HELPER-METHODS-------------------//

  #buildSearchBar() {
    //build the complete search bar
    const { searchBarConstructor } = this.#helperClassInstances,
      completeSearchBarElement = searchBarConstructor.returnSearchBarFragment();

    //save the complete search bar to state
    this.#completeSearchBarElement = completeSearchBarElement;
  }

  #initHelperClassInstances() {
    const {
      elementReferenceManager,
      searchBarConstructor,
      searchBarFunctionality,
      findWeatherDataForLocation,
    } = this.#initMethods;

    //inits all of the helper class instances in the correct order,
    //some of these helpers use other helpers as dependencies
    elementReferenceManager();
    searchBarConstructor();
    searchBarFunctionality();
    findWeatherDataForLocation();
  }

  #initSubscriptions() {
    const { subscribeToApiData, subscribeToSearchBarInputValues } =
      this.#initMethods;

    //initializes the various subscriptions to the helper classes, so that
    //this controller class can act as an interface to emit the received data
    //from these helper classes
    subscribeToSearchBarInputValues();
    subscribeToApiData();
  }

  #initMethods = {
    elementReferenceManager: () => {
      this.#helperClassInstances.elementReferenceManager =
        new ElementRefManager();
    },
    searchBarConstructor: () => {
      //init the search bar constructor, which requires the element ref manager instance as a dependency
      this.#helperClassInstances.searchBarConstructor =
        new SearchBarConstructor({
          elementReferenceManager:
            this.#helperClassInstances.elementReferenceManager,
          uniqueIdentifier: this.#uniqueIdentifier,
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
          searchBarForm: searchBarFormRef,
          searchBarInput: searchBarInputRef,
        });
    },
    findWeatherDataForLocation: () => {
      this.#helperClassInstances.findWeatherDataForLocation =
        new FindWeatherDataForLocation(
          this.#helperClassInstances.searchBarFunctionality,
          this.#apiKey
        ); //should automatically subscribe to the search bar functionality class in order to make api requests with the location
    },
    subscribeToApiData: () => {
      const { findWeatherDataForLocation } = this.#helperClassInstances,
        classScope = this;

      findWeatherDataForLocation.subscribe(
        "WeatherLocationSearchBarController",
        this.#apiDataPublisherEntryPoint.bind(classScope)
      );
    },
    subscribeToSearchBarInputValues: () => {
      const { searchBarFunctionality } = this.#helperClassInstances,
        classScope = this;

      searchBarFunctionality.subscribe(
        "WeatherLocationSearchBarController",
        this.#searchBarInputPublisherEntryPoint.bind(classScope)
      );
    },
  };

  //----------------SEARCH-BAR-INPUT-PUB-SUB---------------------//

  //will be supplied to the SearchBar Functionality class subscription, so that the controller can emit
  //the search bar input value on search queries
  #searchBarInputPublisherEntryPoint(searchBarInput) {
    const numOfSubscribers = Object.keys(
      this.#searchBarInputSubscribers
    ).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#searchBarInputSubscribers) {
        this.#searchBarInputSubscribers[subscriber](searchBarInput);
      }
    }
  }

  #searchBarInputSubscribers = {};

  subscribeToSearchBarInput(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribe", { subName, entryPointMethod });

      if (!this.#searchBarInputSubscribers.hasOwnProperty(subName)) {
        this.#searchBarInputSubscribers[subName] = entryPointMethod;
      } else {
        throw new ReferenceError(
          `Failed to add a subscriber to the search bar input value publisher, as the
           subscriber seems to already exist, received '${subName}' as the subscriber being added`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  } //

  unsubscribeToSearchBarInput(subName) {
    try {
      this.#argValidator("unsubscribe", { subName });

      if (this.#searchBarInputSubscribers.hasOwnProperty(subName)) {
        delete this.#searchBarInputSubscribers[subName];
      } else {
        throw new ReferenceError(
          `Failed to remove a subscriber from the search bar input value publisher search bar publisher, as the
           subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  } //

  //--------------------API-DATA-PUB-SUB-------------------------//

  //will be supplied to the Find Weather Data For Location subscription, so that the controller can emit
  //data from successful api requests
  #apiDataPublisherEntryPoint(apiData) {
    const numOfSubscribers = Object.keys(this.#apiDataSubscribers).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#apiDataSubscribers) {
        this.#apiDataSubscribers[subscriber](apiData);
      }
    }
  }

  //list of subscribers for the weather api data received based on the location supplied
  //with their corresponding methods to execute when a successful api request goes through
  #apiDataSubscribers = {};

  subscribeToApiData(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribe", { subName, entryPointMethod });

      if (!this.#apiDataSubscribers.hasOwnProperty(subName)) {
        this.#apiDataSubscribers[subName] = entryPointMethod;
      } else {
        throw new ReferenceError(
          `Failed to add a subscriber to the Weather API data publisher, as the
           subscriber seems to already exist, received '${subName}' as the subscriber being added`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  unsubscribeFromApiData(subName) {
    try {
      this.#argValidator("unsubscribe", { subName });

      if (this.#apiDataSubscribers.hasOwnProperty(subName)) {
        delete this.#apiDataSubscribers[subName];
      } else {
        throw new ReferenceError(
          `Failed to remove a subscriber from the Weather API data publisher search bar publisher, as the
           subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------------------MAIN-APIs------------------------------//

  //tools activate or deactivate the functionality behind the search bar instance
  activateFunctionality() {
    try {
      if (!this.#functionalityOn) {
        const { searchBarFunctionality } = this.#helperClassInstances;

        searchBarFunctionality.activate();

        this.#functionalityOn = true;
      } else {
        throw new Error(
          `Failed to toggle the weather app search bar on, as it appears to already be on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  deactivateFunctionality() {
    try {
      if (this.#functionalityOn) {
        const { searchBarFunctionality } = this.#helperClassInstances;

        searchBarFunctionality.deactivate();

        this.#functionalityOn = false;
      } else {
        throw new Error(
          `Failed to toggle the weather app search bar off, as it appears to already be off`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //append the complete search bar element after it has been made completely
  returnFragment() {
    try {
      return this.#completeSearchBarElement;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
