//will be used to return the current time on an interval in sync with real time in
// seconds, which is useful for making a real time clock feature on a web app
export class CurrentTimeDataStream {
  //-------------ARGUMENT-VALIDATION---------------//

  #argValidationData = {
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

  //---------------STATE-AND-CONFIG-DATA---------------//

  #stateData = {
    intervalOn: false,
    requestsInProgress: 0,
  };

  #intervalRef = null;

  //------------------HELPER-METHODS-------------------//

  //makes a promise to get a current time on one second intervals using setTimeout
  #retrieveCurrentTime() {
    //will only make new promises to return
    if (this.#stateData.requestsInProgress < 2) {
      this.#stateData.requestsInProgress++; //add a new request in progress to the state

      const retrieveTimePromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(new Date());
          }, 1000); //set a timeout for 1 second and resolve with the current time as the value to return with
        }),
        classScope = this; //also save a reference to the class scope for later binding

      retrieveTimePromise
        .then((currentTime) => {
          this.#emitTimeData.bind(classScope)(currentTime); //emit the current time to the subscribers of this class
        })
        .catch((error) => {
          console.error(error, error.stack);
        })
        .finally(() => {
          this.#stateData.requestsInProgress--; //remove a request in progress value from the state data regardless if it succeeds or fails
        });
    }
  }

  //calculates the correct amount of time to set in order
  //to sync the interval with real time, and creates a setTimeout to essentially
  //pause so the interval declaration is in sync with real time
  #syncMethodExecutionToCurrentTime(method) {
    const currentTime = new Date(), //get the current time
      millisecondsUntilNextSecond = 1000 - currentTime.getMilliseconds();
    //find the difference in time between the milliseconds for the next synced second to occur, and
    //the milliseconds on the currentTime instance. This way you can make a setTimeout that will execute in sync
    //with real time

    setTimeout(method, millisecondsUntilNextSecond); //create the corresponding pause
  }

  //creates the interval that represents the data stream of current time data
  #createTimeInterval() {
    const classScope = this, //save reference to class scope
      intervalRef = setInterval(
        this.#retrieveCurrentTime.bind(classScope), //bind the callback with the class scope
        1000
      );
    //set the interval to execute the retrieve current time method every second
    //also save the interval instance to a variable

    this.#intervalRef = intervalRef; //save said interval instance to state

    this.#stateData.intervalOn = true; //change the state to reflect that the interval is on
  }

  //destroys the interval creating the data stream interval, the reference to it should be stored in the class instance somewhere
  #removeTimeInterval() {
    clearInterval(this.#intervalRef); //clear the interval using the previously saved interval reference

    this.#intervalRef = null; //reset the reference in state

    this.#stateData.intervalOn = false; //save to state that the interval in off in this class instance
  }

  #initDataStream() {
    const classScope = this; //save reference to class scope

    this.#syncMethodExecutionToCurrentTime(
      this.#createTimeInterval.bind(classScope) //bind the private callback with the class scope
    );
  }
  //creates an interval to emit current time to the present subscribers, should be on one second interval and synced up to real time

  //--------------CURRENT-TIME-PUB-SUB-----------------//

  //will be supplied to the SearchBar Functionality class subscription, so that the controller can emit
  //data from successful api requests
  #emitTimeData(timeData) {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](timeData);
      }
    }
  }

  //list of subscribers with their corresponding methods to execute in which they will receive current time data
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

  //-----------------------APIs------------------------//

  activateDataStream() {
    try {
      if (!this.#stateData.intervalOn) {
        this.#initDataStream();

        this.#stateData.intervalOn = true;
      } else {
        throw new Error(
          `Failed to turn on the current time data stream, as it appears to already be on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  } //activate the an interval to emit time data to subscribers, should sync up with real time

  deactivateDataStream() {
    try {
      if (this.#stateData.intervalOn) {
        this.#removeTimeInterval();

        this.#stateData.intervalOn = false;
      } else {
        throw new Error(
          `Failed to turn off the current time data stream, as it appears to already be off`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  } //deactivate said interval
}
