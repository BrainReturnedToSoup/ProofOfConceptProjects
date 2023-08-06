import { WeatherApi } from "../Level-0/Api-Interfaces";
import { CurrentLocationQuery } from "../Level-1/Current-Location-Query";

export class CurrentLocationWeather {
  constructor(apiKey) {
    try {
      this.#argValidator("constructor", { apiKey }); //validate the args

      this.#configData.apiKey = apiKey; //save the api key for the specific end point to state

      this.#initHelperClasses(); //initialize the various helper classes

      this.#linkToCurrentLocationPublisher(); //makes this class instance subscribe to the current location query helper class publisher instance
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //-----------ARGUMENT-VALIDATION------------//

  #argValidationData = {
    constructor: {
      apiKey: {
        type: "string",
      },
    },
    subscribeToApiData: {
      subName: {
        type: "string",
      },
      entryPointMethod: {
        type: "function",
      },
    },
    unsubscribeFromApiData: {
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

  //-----------STATE-AND-CONFIG-DATA-----------//

  #configData = {
    apiKey: null,
    numOfForecastDays: 7,
  };

  #helperClasses = {
    currentLocationQuery: null,
    weatherApi: null,
  };

  #mediatorMethod = (lon, lat, weatherApiInstance) => {
    const locationCoords = `${lat},${lon}`,
      weatherDataPromise = weatherApiInstance.getForecast(
        locationCoords,
        this.#configData.numOfForecastDays
      );

    //a promise that returns a data set representing a 7 day forecast for the supplied
    //location using coordinates

    return weatherDataPromise;
  };

  //---------------HELPER-CLASSES--------------//

  #initHelperClasses() {
    this.#helperClasses.weatherApi = new WeatherApi(this.#configData.apiKey); //make a new weather api interface class instance

    this.#helperClasses.currentLocationQuery = new CurrentLocationQuery(
      this.#helperClasses.weatherApi,
      this.#mediatorMethod
    ); //create a new current location query class instance supplying the weather api instance with a mediator method to return
  }

  #linkToCurrentLocationPublisher() {
    const { currentLocationQuery } = this.#helperClasses,
      classScope = this;

    currentLocationQuery.subscribe(
      "currentLocationWeatherData",
      this.#weatherDataPublisher.bind(classScope)
    );
  }

  //------------WEATHER-DATA-PUB-SUB-----------//

  #weatherDataPublisher(data) {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    //check for subscribers
    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](data);
      }
    }
  }

  #subscribers = {};

  subscribeToApiData(subName, entryPointMethod) {
    try {
      this.#argValidator("subscribeToApiData", { subName, entryPointMethod });

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

  unsubscribeFromApiData(subName) {
    try {
      this.#argValidator("unsubscribeToApiData", { subName });

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

  //-------------------APIs---------------------//

  requestCurrentLocation() {
    try {
      const { currentLocationQuery } = this.#helperClasses;

      currentLocationQuery.requestCurrentLocation();
      //expose an api to request the current location of the user
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
