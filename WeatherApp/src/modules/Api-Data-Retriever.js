class WeatherApi {
  //will be for initializing the supplied key to the stored end point string
  constructor(apiKey) {
    if (typeof apiKey === "string") {
    } else {
      throw new TypeError(
        `Value supplied to constructor for class instance '${this.constructor.name}' is an invalid data type, must be a string, received ${apiKey}`
      );
    }
  }

  //stores the api key supplied to the constructor
  #instanceStateData = {
    apiKey: null,
  };

  #latestDataRecieved = {
    singleRequest: null,
    fixedInterval: {},
  };

  //holds key value pairs for existing data retrievals that exist on a constant interval
  #existingRetrievalIntervals = {};

  //holds the string templates needed to construct the entire https request link
  //split into two parts because the target city needs to be supplied as a parameter,
  //which it will be sandwiched between these two templates in order to make a complete url
  #endPointStringTemplate = {
    firstHalf: `https://api.weatherapi.com/v1/weather?q=`,
    secondHalf: `&key=${this.#instanceStateData.apiKey}`,
  };

  //holds data that defines what inputs are valid to supply to the various retrieveWeatherData APIs
  #validConfigInputsPerMethod = {
    city: {
      city: {
        type: "string",
        required: true,
      },
      requestRule: {
        type: "string",
        required: false,
        validValues: ["once", "interval"],
      },
      interval: {
        type: "number",
        required: false,
      },
    },
  };

  //will validate the incoming configuration before actually trying to retrieve data
  #validateConfig(method, config) {
    const errors = [];

    if (method in this.#validConfigInputsPerMethod) {
      const validDataRef = this.#validConfigInputsPerMethod[method];

      for (let validProperty in validDataRef) {
        const dataSet = validDataRef[validProperty];

        switch (true) {
          case "type" in dataSet:
            if (typeof config[validProperty] !== dataSet["type"]) {
              errors.push(
                new TypeError(
                  `Supplied value for specific config property is an invalid data type, received '${method}' as the method invoked, '${validProperty}' as the property that failed validation, and '${config[validProperty]}' as the value received for said property`
                )
              );
            }
          case "validValues" in dataSet:
            if (!dataSet["validValues"].includes(config[validProperty])) {
              errors.push(
                new ReferenceError(
                  `Supplied value for specific config property is not a valid value, received '${method}' as the method invoked, '${validProperty}' as the property that failed validation, and '${config[validProperty]}' as the value received for said property`
                )
              );
            }
          case "required" in dataSet:
            if (dataSet["required"] && validProperty in config === false) {
              errors.push(
                new ReferenceError(
                  `Config supplied lacks a required property, the missing property is '${validProperty}' for '${method}' as the corresponding method`
                )
              );
            }
        }
      }
    } else {
      errors.push(
        new ReferenceError(
          `Supplied method does not have a data set to perform validation for, received '${method}'`
        )
      );
    }

    if (errors.length > 0) {
      throw errors;
    }
  }

  //will contain methods for either retrieving data only once or on a specific interval when needed
  #retrievalMethods = {
    fixedInterval: (city, interval) => {
      if (city in this.#existingRetrievalIntervals === false) {
        const { firstHalf, secondHalf } = this.#endPointStringTemplate,
          assembledLink = firstHalf + city + secondHalf;

        let existingPromise = false;

        //sets an interval to fetch from the api at a fixed rate that was supplied
        //as well as defines a new reference to the latest data retrieved from the set interval
        this.#latestDataRecieved.fixedInterval[city] = null;
        this.#existingRetrievalIntervals[city] = setInterval(() => {
          if (!existingPromise) {
            //defines that a new promise for fetching the api data has been made, so the interval doesn't make more
            //calls than necessary
            existingPromise = true;

            //creates a new fetch promise that when resolved will toggle the existing promise to false,
            //this way only one fetch promise can be actually made at one time, as opposed to stacking
            //promises indefinitely, which can really stack the api calls
            fetch(assembledLink)
              .then((resp) => {
                return resp.json();
              })
              .then((data) => {
                existingPromise = false;
                this.#latestDataRecieved.fixedInterval[city] = data;
              })
              .catch((error) => {
                console.error(error, error.stack);
              });
          }
        }, interval);
      } else {
        throw new Error(
          `Supplied city to retrieve weather data from at an interval is already present as a declared interval, received ${city}`
        ); // for when a specific interval already exists, you can declare the interval twice
      }
    },
    singleRequest: async (city) => {
      //creates a fetch link corresponding to the city targeted
      const { firstHalf, secondHalf } = this.#endPointStringTemplate,
        assembledLink = firstHalf + city + secondHalf;

      //gets the response from the api using the link made
      //then treats it as a json response
      try {
        const response = await fetch(assembledLink),
          dataObj = await response.json();

        this.#resolvedPromiseData.singleRequest = dataObj;
        return dataObj;
      } catch (error) {
        console.error(error, error.stack);
      }
    },
  };

  //will stop an existing functionality to retrieve data on a specific interval
  //as well as delete its reference for the data it pulls
  stopExistingRetrievalInterval(instanceKey) {
    if (instanceKey in this.#storedRetrievalIntervals) {
      delete this.#storedRetrievalIntervals[instanceKey];
      delete this.#latestDataRecieved.fixedInterval[instanceKey];
    }
  }

  //holds different methods to retrieve data based on the basic parameter
  retrieveWeatherData = {
    city: (city, requestRule = "once", interval = 5000) => {
      this.#validateConfig("city", { city, requestRule, interval });

      if (requestRule === "once") {
        return this.#retrievalMethods.singleRequest(city);
      } else if (requestRule === "interval") {
        return this.#retrievalMethods.fixedInterval(city, interval);
      }
    },
  };

  //for getting the value of the most up to date value of a interval retrieval
  getCurrentIntervalValue(identifier) {
    try {
      if (identifier in this.#latestDataRecieved.fixedInterval) {
        return this.#latestDataRecieved.fixedInterval[identifier];
      } else {
        throw new ReferenceError(
          `Failed to retrieve the latest data for a specific interval defined, interval assigned to the supplied identifier does not exist, received ${identifier}`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //for getting the value of the last single request made by this instance
  getLastSingleRequestValue() {
    return this.#latestDataRecieved.singleRequest;
  }
}

export class ApiDataRetriever {
  //acts as an entrypoint in order to retrieve data from a specific api end point
  //This class will act as a controller class, at which it will simply create a new
  //instance of the helper class that corresponds to the api that you want to retrieve data from
  constructor(selectedApi, key) {}

  //will hold key value pairs to valid apis to target, where the key will be the name of the api, and
  //the value will be a reference to the helper class instance that represents the api essentially
  #validApis = {
    WeatherAPI: WeatherApi,
  };

  //will return a helper class instance that represents the api that you want to retrieve data from,
  //of course if said api is a valid api instance to reference.
  //The helper instance will already be configured with the key that you used, and will have a unique
  //set of apis that pertain to its own use case
  returnApiInstance() {}
}
