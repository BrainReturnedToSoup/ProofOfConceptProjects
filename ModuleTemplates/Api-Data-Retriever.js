//API INTERFACES THAT EXTEND FROM THE TEMPLATE SHOULD ALWAYS RETURN THE FETCH PROMISE FOR THEIR APIS
//THIS WAY THE API INTERACTION CAN BE MODULARIZED AND WHOEVER USES THE API INSTANCE CAN CONFIGURE THEIR OWN
//FUNCTIONALITY RELATING TO THE API REQUEST PROMISE. ALL THESE CLASSES DO IS PROVIDE A STRAIGHT FORWARD
//WAY TO MAKE FETCH REQUESTS TO SPECIFIC APIS, THATS IT.

class ApiInterface {
  //the purpose of this class is to act as a generic template that specific api
  //interfacing classes can extend to and create their specific functionalities with
  //using the general fetch methods within this template

  //--------------------STATE-AND-CONFIG-DATA----------------------//

  configData = {
    apiKey: null,
    apiName: null,
  };

  defaultOptions = {
    get: {
      method: "get",
    },
    post: {
      method: "post",
      //part of sending data to the server
      headers: {
        "Content-Type": "application/json",
      },
      body: null, //should be JSON data
    },
    put: {
      method: "put",
      //part of sending data to the server
      headers: {
        "Content-Type": "application/json",
      },
      body: null, //should be JSON data
    },
    delete: {
      method: "delete",
    },
  };

  //-----------------------HELPER-METHODS---------------------------//

  addPayload(options, payload) {
    const convertedPayload = this.convertPayloadToJSON(payload);
    options.body = convertedPayload;

    return options;
  }

  convertPayloadToJSON(payload) {
    const convertedPayload = JSON.stringify(payload);
    return convertedPayload;
  }

  processResponseAsJSON = async (response) => {
    const processedResponse = await response.json();
    return processedResponse;
  };

  //------------------------API-INTERACTION--------------------------/

  requestMethods = {
    get: async (url, options = this.defaultOptions.get) => {
      try {
        const resp = await fetch(url, options); //await a response first

        //if the request was successful
        if (resp.ok === true) {
          const parsedData = await this.processResponseAsJSON(resp);
          return parsedData;
        } else {
          //if the request failed for some reason
          throw new Error(
            `GET Request to the desired api failed, target api is '${this.configData.apiName}', '${resp.status}: ${resp.statusText}'`
          );
        }
      } catch (error) {
        console.error(error, error.stack);
      }
    },
    post: async (url, options = this.defaultOptions.post, payload) => {
      try {
        const finalOptions = this.addPayload(options, payload);

        const resp = await fetch(url, finalOptions);
        //if the request was successful
        if (resp.ok === true) {
          const parsedData = await this.processResponseAsJSON(resp);
          return parsedData;
        } else {
          //if the request failed for some reason
          throw new Error(
            `POST Request to the desired api failed, target api is '${this.configData.apiName}', '${resp.status}: ${resp.statusText}'`
          );
        }
      } catch (error) {
        console.error(error, error.stack);
      }
    },
    put: async (url, options = this.defaultOptions.put, payload) => {
      try {
        const finalOptions = this.addPayload(options, payload);

        const resp = await fetch(url, finalOptions);
        //if the request was successful
        if (resp.ok === true) {
          const parsedData = await this.processResponseAsJSON(resp);
          return parsedData;
        } else {
          //if the request failed for some reason
          throw new Error(
            `PUT Request to the desired api failed, target api is '${this.configData.apiName}', '${resp.status}: ${resp.statusText}'`
          );
        }
      } catch (error) {
        console.error(error, error.stack);
      }
    },
    delete: async (url, options = this.defaultOptions.delete) => {
      try {
        const resp = await fetch(url, options); //await a response first

        //if the request was successful
        if (resp.ok === true) {
          const parsedData = await this.processResponseAsJSON(resp);
          return parsedData;
        } else {
          //if the request failed for some reason
          throw new Error(
            `DELETE Request to the desired api failed, target api is '${this.configData.apiName}', '${resp.status}: ${resp.statusText}'`
          );
        }
      } catch (error) {
        console.error(error, error.stack);
      }
    },
  };
}

class WeatherApi extends ApiInterface {
  constructor(apiKey) {
    super(); //call parent constructor

    this.#argValidator("constructor", { apiKey });

    //define the configuration for the weather api instance
    this.configData.apiName = "WeatherApi";
    this.configData.apiKey = apiKey;
  }

  //---------------------STATE-AND-CONFIG-DATA------------------//

  //the base template string, at which to add parameters, they are concatenated at the end of the string
  #urlTemplate = `http://api.weatherapi.com/v1/current.json?key=${this.configData.apiKey}`;

  //---------------------ARGUMENT-VALIDATION--------------------//

  #argValidationData = {
    constructor: {
      apiKey: { type: "string" },
    },
    getCurrentWeather: {
      locationMethod: { type: "string" },
      locationValue: { type: "string" },
    },
    getForecast: {
      locationMethod: { type: "string" },
      locationValue: { type: "string" },
      numOfDays: { type: "number", positive: true },
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
    positive: (suppliedArg, argName, methodOrigin, correctInstance) => {
      if (correctInstance && suppliedArg !== Math.abs(suppliedArg)) {
        throw new Error(`Argument '${argName}' for method '${methodOrigin}' failed value validation,
        received '${suppliedArg}' which is negative, needs to be positive`);
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

  //------------------------HELPER-METHODS-----------------------//

  #addUrlParams = {
    location: (url, location) => {
      const alteredUrl = url + `q=${location}`;
      return alteredUrl;
    },
    numOfDays: (url, numOfDays) => {
      const alteredUrl = url + `days=${numOfDays}`;
      return alteredUrl;
    },
    airQuality: (url, boolean) => {
      let yesOrNo;

      if (boolean) {
        yesOrNo = "yes";
      } else {
        yesOrNo = "no";
      }
      const alteredUrl = url + `aqi=${yesOrNo}`;

      return alteredUrl;
    },
    weatherAlerts: (url, boolean) => {
      let yesOrNo;

      if (boolean) {
        yesOrNo = "yes";
      } else {
        yesOrNo = "no";
      }

      const alteredUrl = url + `alerts=${yesOrNo}`;

      return alteredUrl;
    },
  };

  //------------------------API-INTERFACE------------------------//

  //location method is the method to use to retrieve current weather data. Example: IP, city, etc.
  //location value is the corresponding value, so say the corresponding IP, or city, etc.
  getCurrentWeather(locationMethod, locationValue) {}

  getForecast(locationMethod, locationValue, numOfDays) {}
}
