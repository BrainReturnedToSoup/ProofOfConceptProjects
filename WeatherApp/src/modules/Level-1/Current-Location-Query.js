//a way to ask for the current location, and then make an api request using said
//current location, then emit the data from the api request. This can be configured
//for any use case that may require using the users current location to get data
export class CurrentLocationQuery {
  constructor(apiInstance, mediatorMethod) {
    try {
      this.#argValidator("constructor", { apiInstance, mediatorMethod }); //validate the args

      //save the args to the state, they will be used upon current location querying
      this.#helperClasses.apiInstance = apiInstance;

      this.#configData.mediatorMethod = mediatorMethod;
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //------------------ARGUMENT-VALIDATION-----------------------//

  #argValidationData = {
    constructor: {
      apiInstance: {
        instanceof: Object,
      },
      mediatorMethod: {
        type: "function",
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

  //------------------STATE-AND-CONFIG-DATA---------------------//

  #configData = {
    mediatorMethod: null,
  };

  #stateData = {
    requestInProgress: false,
  };

  #helperClasses = {
    apiInstance: null,
  };

  //----------------------HELPER-METHODS------------------------//

  //make an api request utilizing the api instance and mediator method
  #makeApiRequest(lon, lat) {
    const { mediatorMethod } = this.#configData,
      { apiInstance } = this.#helperClasses,
      responsePromise = mediatorMethod(lon, lat, apiInstance);
    //faciliate the api request using the mediator method, this method will return the promise made by the api instance

    return responsePromise;
  }

  #extractCoords(locationData) {
    //should be an object returned from geolocation api full of location data, access the coordinates it has
    const { longitude, latitude } = locationData.coords;

    return { longitude, latitude }; //return both of these values in an obj
  }

  //request the current location of the user
  #requestCurrentLocation() {
    if (navigator.geolocation) {
      //create a promise for the current position data,
      //not going to facilitate any functionality relating to the outcome of said promise,
      //just returning a promise instance
      const positionPromise = new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );

      return positionPromise;
    } else {
      console.warn(
        `Browser does not support the geolocation api, failed to fetch current location`
      );
    }
  }

  //---------------------FETCH-DATA-PUB-SUB---------------------//

  //will be supplied to the SearchBar Functionality class subscription, so that the controller can emit
  //data from successful api requests
  #emitCurrentLocationWeatherData(apiData) {
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

  //----------------------------APIs----------------------------//

  //api to ask the user for their location, and then use the location data to
  //make and api request
  requestCurrentLocation() {
    try {
      //check if a request is in progress or not
      if (!this.#stateData.requestInProgress) {
        this.#stateData.requestInProgress = true; //commence the request process

        const locationPromise = this.#requestCurrentLocation(), //this will activate the pop up that asks the user to give their current location
          classScope = this;

        locationPromise
          .then((locationData) => {
            const coords = this.#extractCoords(locationData); //grab the coords from the geolocation response
            return coords;
          })
          .then((coords) => {
            const { longitude, latitude } = coords,
              responsePromise = this.#makeApiRequest.bind(classScope)(
                longitude,
                latitude
              );
            //make an api request with these coordinates to the supplied api instance, should return a promise for said api request
            //need to bind the scope as well so the scope within the method execution doesn't point to the promise object

            return responsePromise; //return the promise instance
          })
          .then((responseData) => {
            this.#emitCurrentLocationWeatherData.bind(classScope)(responseData);
            //when the response is successful, emit the data to the subscribers,
            //need to bind the scope as well so the scope within the method execution doesn't point to the promise object
          })
          .catch((error) => {
            //if the user denied current location use
            if ((error.code = error.PERMISSION_DENIED)) {
              console.warn(
                `User declined to share location, corresponding api request cancelled`
              );
            } else {
              //if an actual error occurred
              console.error(error, error.stack);
            }
          })
          .finally(() => {
            this.#stateData.requestInProgress = false; //reset the state, the request is complete regardless if it succeeded or failed
          });
      } else {
        console.warn(
          `Attempting to make a current location query while another is still in progress`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
