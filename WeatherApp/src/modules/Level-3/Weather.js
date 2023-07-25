//general dependencies
import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";
import { CurrentLocationQuery } from "../Level-1/Current-Location-Query.js";

//specific implementation for this app specifically
import { WeatherLocationSearchBar } from "../Level-2/Weather-Location-Search-Bar.js";
import { WeatherAppConstructor } from "../Level-2/Weather-App-Constructor.js";

class WeatherAppFunctionality {
  constructor() {
    try {
      //logic to init the state, particullarly the helper class instances

      //get all of the necessary element references to facilitate the functionalities within the class
      this.#retrieveElementRefs();

      //activate the specific functionalities
    } catch (error) {
      console.error(error, error.stack);
    }
  }
  //------------------ARGUMENT-VALIDATION-----------------------//

  #argValidationData = {
    applyValuesToDOM: {
      data: { type: "string" },
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

  //---------------------STATE-AND-CONFIG-DATA------------------//

  #helperClasses = {
    currentLocationQuery: null, //specific instance with the api instance supplied to it
    elementReferenceManager: null,
  };

  #retrievedElementRefs = {};

  //----------------STATE-AND-CONFIG-INITIALIZATION-------------//

  #initClassStateAndConfig() {}
  // main entrypoint method that will commence initializing the state of this class, will create helper class instances and add config data as well

  //---------------------RETRIEVE-ELEMENT-REFS------------------//

  #retrieveElementRefs() {
    for (let retriever in this.#elementRefRetrievers) {
      this.#elementRefRetrievers[retriever]();
    }
  } // main entrypoint method that will commence retrieving all of the necessary element references

  #elementRefRetrievers = {
    //holds key value pairs to functions that will retrieve a specific reference
    //the retrieveElementRefs method will iterate and execute all of the methods that are present
    //in this object
  };

  //------------------APPLY-VALUES-TO-DOM-HELPERS---------------//

  #updateElement = {};

  //----------------------------APIs----------------------------//

  //will apply values to the various DOM
  //elements that correspond to specific data
  //received from the API
  applyValuesToDOM(data) {
    try {
      this.#argValidator("applyValuesToDOM", { data }); //validate the inputs

      //logic to process and apply data to DOM
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //activate the weather app functionality
  activate() {
    try {
      //logic to activate the functionality of the weather app
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //deactivate the weather app functionality
  deactivate() {
    try {
      //logic to deactivate the functionality of the weather app
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

//orchestrates all of these sub classes together in order to form the entire weather app
//will inject dependencies where they are needed etc. Will provide a way to customize
//some features with the weather app
export class WeatherApp {
  constructor() {}

  //-------------------ARGUMENT-VALIDATION-----------------//
  append(parentElement) {}
}

//config = {
//  numberOfDaysForecast: [3, 7],
//  currentWeatherStats: boolean,
//  currentTempStats: boolean,
//  forecastTimeframe: [daily, hourly, both],
//  date: boolean,
//  tempUnit: [F, C, both],
//  locationSearchBar: boolean,
//  useCurrentLocation: boolean,
//  weatherApiSource: [''],
//  apiKey: string,
//  }

//for current location query class
const mediatorMethod = (lon, lat, apiInstance) => {
  const locationString = `${lat},${lon}`, //create the coords string in a way that works with the api interface for a location
    responsePromise = apiInstance.getCurrentWeather(locationString); //get the weather using said coords string as the location string

  return responsePromise;
};
