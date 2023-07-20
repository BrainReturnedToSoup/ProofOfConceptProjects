//general dependencies
import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";
import { CurrentLocationQuery } from "../Level-1/Current-Location-Query.js";

//specific implementation for this app specifically
import { WeatherLocationSearchBar } from "../Level-2/Weather-Location-Search-Bar.js";

const helperClasses = {
  ElementRefManager: ElementRefManager,
  //this will manage the element references on the top level, that being the main app structuring
  SearchBar: WeatherLocationSearchBar,
  //reusable feature, creates the whole feature on its own, will inject the necessary dependencies to make it work for this application
  //Will be used to look up weather data based on the supplied location
  WeatherApi: WeatherApi,
  //class that acts as an interface to use the weather api to retrieve weather data based on a location
  currentLocationQuery: CurrentLocationQuery,
  //class that will get the current location of the user in the form of coordinates using the browser api geolocation
  //It will then make an api request using the supplied api instance and mediator method with the coordinates.
  //I will use this to make a weather api request using the users current location as the target essentially
};

class WeatherAppFunctionality {
  constructor() {}
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

  #retrievedRefs = {};

  //-----------------------HELPER-METHODS-----------------------//

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

class WeatherAppConstructor {
  constructor() {}

  //------------------ARGUMENT-VALIDATION-----------------------//

  #argValidationData = {};

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

  //--------------------------APIs--------------------------//

  returnWeatherAppFragment() {}
}

//orchestrates all of these sub classes together in order to form the entire weather app
//will inject dependencies where they are needed etc. Will provide a way to customize
//some features with the weather app
export class WeatherApp {
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
