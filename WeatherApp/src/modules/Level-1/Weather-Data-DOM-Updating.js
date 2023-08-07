import { ElementRefManager } from "../Level-0/Element-Ref-Manager"; //DEPENDENCY FOR THESE CLASSES TO USE ARG VALIDATION

export class ApplyGeneralInfoData {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //add helper class to state

      this.#retrieveElementReferences(); //retrieve the necessary references
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //-------------ARGUMENT-VALIDATION---------------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
      },
    },
    applyData: {
      data: {
        type: "object",
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

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  #retrievedElementReferences = {
    location: null,
  };

  //---------------HELPER-METHODS------------------//

  #retrieveElementReferences() {
    const { elementReferenceManager } = this.#helperClasses,
      locationElementRef = elementReferenceManager.retrieveRef(
        `General-Info-Location`
      );

    this.#retrievedElementReferences.location = locationElementRef;
  }

  #applyDataToElementReference = {
    location: (data) => {
      const locationName = data.name,
        locationCountry = data.country; //pull the references from the received data

      const completeLocationString = `${locationName}, ${locationCountry}`, //make a complete string to display on the DOM
        { location } = this.#retrievedElementReferences; //pull the references to the element being altered

      location.textContent = completeLocationString; //apply the data as text within the element
    },
  };

  //-------------------APIs------------------------//

  applyData(data) {
    try {
      this.#argValidator("applyData", { data }); //validate args

      const { location } = this.#applyDataToElementReference; //get the various helper methods that use the incoming data

      location(data); //apply the data to the corresponding methods that update the DOM
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class ApplyCurrentWeatherData {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager });

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //store the supplied reference manager instance into state

      this.#retrieveElementReferences(); //retrieve the required references from the ref manager
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //-------------ARGUMENT-VALIDATION---------------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
      },
    },
    applyData: {
      data: { type: "object" },
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

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  #retrievedElementReferences = {
    conditionText: null,
    conditionImage: null,
    temp: null,
    feelsLikeTemp: null,
    precip: null,
    humidity: null,
    dayOrNightImage: null,
    visibility: null,
    windDegree: null,
    windDirection: null,
    windSpeed: null,
  };

  //---------------HELPER-METHODS------------------//

  #retrieveElementReferences() {
    const { elementReferenceManager } = this.#helperClasses;

    this.#retrievedElementReferences = {
      conditionText: elementReferenceManager.retrieveRef(
        `Current-Weather-Condition-Text`
      ),
      conditionImage: elementReferenceManager.retrieveRef(
        `Current-Weather-Condition-Image`
      ),
      temp: elementReferenceManager.retrieveRef(`Current-Weather-Temp`),
      feelsLikeTemp: elementReferenceManager.retrieveRef(
        `Current-Weather-Feels-Like-Temp`
      ),
      precip: elementReferenceManager.retrieveRef(`Current-Weather-Precip`),
      humidity: elementReferenceManager.retrieveRef(`Current-Weather-Humidity`),
      visibility: elementReferenceManager.retrieveRef(
        `Current-Weather-Visibility`
      ),
      windDegree: elementReferenceManager.retrieveRef(
        `Current-Weather-Wind-Degree`
      ),
      windDirection: elementReferenceManager.retrieveRef(
        `Current-Weather-Wind-Direction`
      ),
      windSpeed: elementReferenceManager.retrieveRef(
        `Current-Weather-Wind-Speed`
      ),
    };
  }

  #applyDataToElementReferences(data) {
    for (let dataMethod in this.#dataApplyingMethods) {
      this.#dataApplyingMethods[dataMethod](data);
    }
  }

  #dataApplyingMethods = {
    conditionText: (data) => {
      const { conditionText } = data;

      this.#retrievedElementReferences.conditionText.textContent =
        conditionText;
    },
    conditionImage: (data) => {
      const { conditionImage } = data;

      this.#retrievedElementReferences.conditionImage.src = conditionImage;
    },
    temp: (data) => {
      const { temp } = data;

      this.#retrievedElementReferences.temp.textContent = `${temp}`;
    },
    feelsLike: (data) => {
      const { feelsLike } = data;

      this.#retrievedElementReferences.feelsLikeTemp.textContent = `Feels Like ${feelsLike}`;
    },
    precip: (data) => {
      const { precip } = data;

      this.#retrievedElementReferences.precip.textContent = `Precip ${precip}`;
    },
    humidity: (data) => {
      const { humidity } = data;

      this.#retrievedElementReferences.humidity.textContent = `Humidity ${humidity}`;
    },
    visibility: (data) => {
      const { visibility } = data;

      this.#retrievedElementReferences.visibility.textContent = `Vis ${visibility}`;
    },
    windSpeed: (data) => {
      const { windSpeed } = data;

      this.#retrievedElementReferences.windSpeed.textContent = `Wind Speed ${windSpeed}`;
    },
    windDir: (data) => {
      const { windDir } = data;

      this.#retrievedElementReferences.windDirection.textContent = `Wind Dir ${windDir}`;
    },
    windDegree: (data) => {
      const { windDegree } = data;

      this.#retrievedElementReferences.windDegree.textContent = `Wind Degree ${windDegree}`;
    },
  };

  //-------------------APIs------------------------//

  applyData(data) {
    try {
      this.#argValidator("applyData", { data }); //validate args

      this.#applyDataToElementReferences(data); //begin applying the received data to the corresponding elements
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class ApplyForecastData {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager });

      this.#helperClasses.elementReferenceManager = elementReferenceManager;
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //-------------ARGUMENT-VALIDATION---------------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
      },
    },
    applyData: {
      data: { type: "object" },
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

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  #retrievedElementRefs = {};

  #stateData = {
    numOfForecastDays: null,
  };

  //---------INITIALIZE-ELEMENT-REFS-CACHE---------//

  #initRetrievedElementRefsStruct(numOfDays) {
    for (let i = 1; i <= numOfDays; i++) {
      this.#retrievedElementRefs[`Day-${i}`] = {};
    }
  }

  //---------------HELPER-METHODS------------------//

  //gets the necessary element references for the
  //current weather portion of the web page
  #retrieveElementRefs() {
    for (let dayString in this.#retrievedElementRefs) {
      this.#retrieveElementRefsByDay(dayString);
    }
  }

  #retrieveElementRefsByDay(dayString) {
    const { elementReferenceManager } = this.#helperClasses,
      forecastDayObj = this.#retrievedElementRefs[dayString];

    //define all of the necessary element references corresponding to the day
    //they represent in each corresponding retrievedelementref key value pair
    forecastDayObj["container"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Card-Container-${dayString}`
    );

    forecastDayObj["date"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Date-${dayString}`
    );

    forecastDayObj["conditionText"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Condition-Text-${dayString}`
    );

    forecastDayObj["conditionImage"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Condition-Image-${dayString}`
    );

    forecastDayObj["tempHigh"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Temp-High-${dayString}`
    );

    forecastDayObj["tempLow"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Temp-Low-${dayString}`
    );

    forecastDayObj["totalPrecip"] = elementReferenceManager.retrieveRef(
      `Forecast-Day-Total-Precip-${dayString}`
    );
  }

  #updateElements(data) {
    for (let i = 0; i < data.length; i++) {
      //retrieve the forecast element references based on the target day
      const elementRefs = this.#retrievedElementRefs[`Day-${i + 1}`];

      //define properties on the corresponding element
      //references retrieved corresponding to the data array
      elementRefs.date.textContent = data[i].date;

      elementRefs.conditionText.textContent = data[i].conditionText;

      elementRefs.conditionImage.src = data[i].conditionImage;

      elementRefs.tempHigh.textContent = `High ${data[i].maxTemp}`;

      elementRefs.tempLow.textContent = `Low ${data[i].minTemp}`;

      elementRefs.totalPrecip.textContent = `Precip ${data[i].totalPrecip}`;
    }
  }

  //-------------------APIs------------------------//

  applyData(data) {
    try {
      this.#argValidator("applyData", { data });

      //only initialize and retrieve if the number of forecast days changes
      if (data.length !== this.#stateData.numOfForecastDays) {
        this.#initRetrievedElementRefsStruct(data.length);

        this.#retrieveElementRefs();

        this.#stateData.numOfForecastDays = data.length;
      }

      this.#updateElements(data); //apply the data to the elements
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
