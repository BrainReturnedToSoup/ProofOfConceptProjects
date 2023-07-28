import { ElementRefManager } from "../Level-0/Element-Ref-Manager";

class ApplyGeneralInfoData {
  constructor(elementReferenceManager) {}

  //-------------ARGUMENT-VALIDATION---------------//

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  //---------------HELPER-METHODS------------------//

  //-------------------APIs------------------------//

  applyData(data) {}
}

class ApplyCurrentWeatherData {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager });

      //logic for initializing the the class instance
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
    applyForecastData: {
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

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  //---------------HELPER-METHODS------------------//

  //-------------------APIs------------------------//

  applyData(data) {}
}

//simply takes a data set and applies it to the
//corresponding elements
class ApplyForecastData {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager });

      //logic to initialize class state
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
    applyForecastData: {
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

  //------------STATE-AND-CONFIG-DATA--------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  #elementReferences = {};

  //---------------HELPER-METHODS------------------//

  //gets the necessary element references for the
  //current weather portion of the web page
  #retrieveElementRefs() {}

  //takes the data and updates the corresponding
  //elements on the DOM to reflect the data
  #updateElements(data) {}

  //-------------------APIs------------------------//

  applyData(data) {
    try {
      this.#argValidationData("applyForecastData", { data });

      this.#updateElements(data); //apply the data to the elements
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

class GeneralInfoDataFilter {
  //----------ARGUMENT-VALIDATION----------//

  #argValidationData = {
    filterData: {
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

  //-------------DATA-FILTERING------------//

  #createFilteredDataSet(data) {
    const locationData = data.location,
      filteredDataSet = {
        name: locationData.name,
        country: locationData.country,
      };

    return filteredDataSet;
  }

  //------------------APIs-----------------//

  //will take the data and the unit rules to commence a filtering process
  filterData(data) {
    try {
      this.#argValidator(`filterData`, { data }); //validate args

      const filteredDataSet = this.#createFilteredDataSet(data); //get a filtered data set using the supplied data

      return filteredDataSet; //returned said data set
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

class CurrentWeatherDataFilter {
  //-----------ARGUMENT-VALIDATION---------//

  #argValidationData = {
    filterData: {
      data: {
        type: "object",
      },
      unitRules: {
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

  //---------STATE-AND-CONFIG-DATA---------//

  #unitRules = null;

  //------------APPLY-UNIT-RULES-----------//

  #applyUnitRules(unitRules) {
    this.#unitRules = unitRules;
  }

  //-------------DATA-FILTERING------------//

  #createFilteredDataSet(data) {
    const { temp, windSpeed, pressure, precip, feelsLike, visibility } =
      this.#dataFilteringMethods;

    //create a new data set with filtered data
    const filteredDataSet = {
      temp: temp(data),
      windSpeed: windSpeed(data),
      windDir: `${data.wind_dir}`,
      windDegree: `${data.wind_degree}deg`,
      pressure: pressure(data),
      precip: precip(data),
      humidity: `${data.humidity}%`,
      cloudy: `${data.cloudy}%`,
      feelsLike: feelsLike(data),
      visibility: visibility(data),
    };

    return filteredDataSet;
  }

  #dataFilteringMethods = {
    temp: (data) => {
      const { temperature } = this.#unitRules;

      if (temperature === "metric") {
        return `${data.temp_c} C`;
      } else if (temperature === "customary") {
        return `${data.temp_f} F`;
      }
    },
    windSpeed: (data) => {
      const { distance } = this.#unitRules;

      if (distance === "metric") {
        return `${data.wind_kph} kph`;
      } else if (distance === "customary") {
        return `${data.wind_mph} mph`;
      }
    },
    pressure: (data) => {
      const { measurement } = this.#unitRules;

      if (measurement === "metric") {
        return `${data.pressure_mb} mb`;
      } else if (measurement === "customary") {
        return `${data.pressure_in} in`;
      }
    },
    precip: (data) => {
      const { measurement } = this.#unitRules;

      if (measurement === "metric") {
        return `${data.precip_mm} mm`;
      } else if (measurement === "customary") {
        return `${data.precip_in} in`;
      }
    },
    feelsLike: (data) => {
      const { temperature } = this.#unitRules;

      if (temperature === "metric") {
        return `${data.feelslike_c} C`;
      } else if (temperature === "customary") {
        return `${data.feelslike_f} F`;
      }
    },
    visibility: (data) => {
      const { distance } = this.#unitRules;

      if (distance === "metric") {
        return `${data.vis_km} km`;
      } else if (distance === "customary") {
        return `${data.vis_miles} mi`;
      }
    },
  };

  //------------------APIs-----------------//

  filterData(data, unitRules) {
    try {
      this.#argValidator("filterData", { data, unitRules }); //validate args

      this.#applyUnitRules(unitRules); //apply the unit filtering rules to the state

      const filteredDataSet = this.#createFilteredDataSet(data); //make a filtered data set

      return filteredDataSet;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

class ForecastDataFilter {
  //------------------APIs-----------------//
  filterData(data, unitRules) {}
}

//controls the user interface portion of the web app,
//so that the supplied buttons will toggle the units being used for existing
//data sets
class UserInterfaceFunctionality {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager });

      this.#helperClasses.elementReferenceManager = elementReferenceManager;

      this.#getElementRefs();

      this.#addFunctionalityToButtons();
    } catch (error) {
      console.error(error, error.stack);
    }
  }
  //--------------ARGUMENT-VALIDATION------------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
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

  //------------STATE-AND-CONFIG-DATA------------//

  #elementReferences = {
    unitToggleButtonContainer: null,
    toggleDistance: null,
    toggleMeasurement: null,
    toggleTemperature: null,
  };

  #helperClasses = {
    elementReferenceManager: null,
  };

  #stateData = {
    eventListenersOn: false,
  };

  //----------------HELPER-METHODS---------------//

  #getElementRefs() {
    const { elementReferenceManager } = this.#helperClasses;

    this.#elementReferences.unitToggleButtonContainer =
      elementReferenceManager.retrieveRef(
        `User-Interface-Buttons-Button-Container`
      ); // get ref for the container for the buttons

    this.#elementReferences.toggleDistance =
      elementReferenceManager.retrieveRef(
        `User-Interface-Buttons-Distance-Toggle`
      ); // get ref for the distance unit toggle button

    this.#elementReferences.toggleMeasurement =
      elementReferenceManager.retrieveRef(
        `User-Interface-Buttons-Measurement-Toggle`
      ); // get ref for the measurement unit toggle button

    this.#elementReferences.toggleTemperature =
      elementReferenceManager.retrieveRef(`User-Interface-Buttons-Temp-Toggle`);
    // get ref for the temperature unit toggle button
  }

  #addFunctionalityToButtons() {
    this.#addEventListeners();
    //the functionality is mainly through appending the event listener with the
    //associated functionality supplied as the callback, atleast this way this provides an
    //easy way to add additional functionality in the future
  }

  //---------EVENT-LISTENER-INITIALIZATION-------//

  #addEventListeners() {
    if (!this.#stateData.eventListenersOn) {
      const { unitToggleButtonContainer } = this.#elementReferences; //get the ref for the button container

      unitToggleButtonContainer.addEventListener(
        "click",
        this.#clickFunctionality
      ); //append the event listener to said container

      this.#stateData.eventListenersOn = true; //change the class state to reflect the event listener being initialized
    } else {
      throw new ReferenceError(
        `Failed to add event listeners, as they appear to already be initialized`
      );
    }
  } //initializes the event listeners needed to the corresponding element, that being the button container on the UI

  //---------EVENT-LISTENER-FUNCTIONALITY--------//

  #clickFunctionality(event) {
    const buttonClicked = this.#determineButtonClicked(event); //find out which button was clicked, and return a string representing it

    this.#emitButtonClicked(buttonClicked); //emit the returned string
  } //supplied to the created event listener

  #determineButtonClicked(event) {
    const { toggleDistance, toggleMeasurement, toggleTemperature } =
      this.#elementReferences;

    switch (event.target) {
      case toggleDistance:
        return `Toggle Distance Unit`;
      case toggleMeasurement:
        return `Toggle Measurement Unit`;
      case toggleTemperature:
        return `Toggle Temperature Unit`;
    }
  } //will be used within click functionality

  //------------BUTTON-CLICKED-PUB-SUB-----------//

  #emitButtonClicked(buttonClicked) {
    const numOfSubscribers = Object.keys(this.#subscribers).length;

    if (numOfSubscribers > 0) {
      for (let subscriber in this.#subscribers) {
        this.#subscribers[subscriber](buttonClicked);
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
          `Failed to add a subscriber to the weather app user interface publisher, as the
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
          `Failed to remove a subscriber from the weather app user interface publisher, as the
           subscriber attempting to be removed does not exist, received '${subName}' as the subscriber being removed`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

//receives data, filters it, and packages the right data to be
//sent to the right helper class to render
class WeatherDataManager {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //store the ref manager instance to state

      this.#initHelperClasses(); //create unique instances of the helper classes being used, particularly the data application helpers
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //------------ARGUMENT-VALIDATION-----------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
      },
    },
    unitButtonEntryPoint: {
      buttonClicked: {
        type: "string",
      },
    },
    weatherDataEntryPoint: {
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

  //----------STATE-AND-CONFIG-DATA-----------//

  #helperClasses = {
    elementReferenceManager: null,
    applyForecastData: null,
    applyCurrentWeatherData: null,
    applyGeneralInfoData: null,
    generalInfoDataFilter: null,
    currentWeatherDataFilter: null,
    forecastDataFilter: null,
  };

  #selectedUnits = {
    distance: "metric",
    temperature: "metric",
    measurement: "metric",
  };

  #currentWeatherData = null;

  //--------------HELPER-METHODS--------------//

  #initHelperClasses() {
    this.#initApplyDataHelperClasses();
    this.#initDataFilterHelperClasses();
  }

  #initApplyDataHelperClasses() {
    //init the data application classes with the supplied
    //element reference manager as the dependencies
    this.#helperClasses.applyForecastData = new ApplyForecastData(
      this.#helperClasses.elementReferenceManager
    );

    this.#helperClasses.applyCurrentWeatherData = new ApplyCurrentWeatherData(
      this.#helperClasses.elementReferenceManager
    );

    this.#helperClasses.applyGeneralInfoData = new ApplyGeneralInfoData(
      this.#helperClasses.elementReferenceManager
    );
  }

  #initDataFilterHelperClasses() {
    //init the classes that will take a data set and filter it out
    //and return a final data set based on the supplied unit rules
    this.#helperClasses.generalInfoDataFilter = new GeneralInfoDataFilter();

    this.#helperClasses.currentWeatherDataFilter =
      new CurrentWeatherDataFilter();

    this.#helperClasses.forecastDataFilter = new ForecastDataFilter();
  }

  #storeReceivedDataToState(data) {
    this.#currentWeatherData = data;
  }

  //defines whether to use inbound weather data,
  //or to use already stored data essentially
  #processWeatherData(useInboundData, data) {
    let filteredDataSet = null;

    if (useInboundData) {
      this.#storeReceivedDataToState(data); //store the data in state first

      filteredDataSet = this.#filterInboundData(data);
    } else {
      filteredDataSet = this.#filterExistingData();
    }

    this.#emitDataToHelpers(filteredDataSet);
  }

  //------FILTERED-WEATHER-DATA-EMISSION-------//

  #emitDataToHelpers(data) {
    const { generalInfo, currentWeather, forecast } =
      this.#emitDataToHelpersMethods;

    generalInfo(data.generalInfo);
    currentWeather(data.currentWeather);
    forecast(data.forecast);
  }

  #emitDataToHelpersMethods = {
    generalInfo: (data) => {
      const { ApplyGeneralInfoData } = this.#helperClasses;

      ApplyGeneralInfoData.applyData(data);
    },
    currentWeather: (data) => {
      const { ApplyCurrentWeatherData } = this.#helperClasses;

      ApplyCurrentWeatherData.applyData(data);
    },
    forecast: (data) => {
      const { ApplyForecastData } = this.#helperClasses;

      ApplyForecastData.applyData(data);
    },
  };

  //----------WEATHER-DATA-FILTERING-----------//

  //the filtering will use rules from the
  //state to decide what to filter for
  #filterInboundData(data) {
    const { generalInfo, currentWeather, forecast } =
      this.#sectionDataFiltering;

    const filteredDataSet = {
      generalInfo: generalInfo(data),
      currentWeather: currentWeather(data),
      forecast: forecast(data),
    };

    return filteredDataSet;
  }

  #filterExistingData() {
    const { generalInfo, currentWeather, forecast } =
        this.#sectionDataFiltering,
      data = this.#currentWeatherData;

    const filteredDataSet = {
      generalInfo: generalInfo(data),
      currentWeather: currentWeather(data),
      forecast: forecast(data),
    };

    return filteredDataSet;
  }

  //will use the data filtering methods to choose the right
  //data to use corresponding to the section
  #sectionDataFiltering = {
    generalInfo: (data) => {
      const { generalInfoDataFilter } = this.#helperClasses,
        filteredData = generalInfoDataFilter.filterData(data); //doesn't use the units rule

      return filteredData;
    },
    currentWeather: (data) => {
      const { currentWeatherDataFilter } = this.#helperClasses,
        filteredData = currentWeatherDataFilter.filterData(
          data,
          this.#selectedUnits
        );

      return filteredData;
    },
    forecast: (data) => {
      const { forecastDataFilter } = this.#helperClasses,
        filteredData = forecastDataFilter.filterData(data, this.#selectedUnits);

      return filteredData;
    },
  };

  //---------------UNIT-TOGGLING--------------//

  #toggleUnit(buttonClicked) {
    const { distance, temperature, measurement } = this.#unitTogglers;

    switch (buttonClicked) {
      case `Toggle Distance Unit`:
        distance();
        break;
      case `Toggle Temperature Unit`:
        temperature();
        break;
      case `Toggle Measurement Unit`:
        measurement();
        break;
      default:
        throw new ReferenceError(
          `Failed to toggle a specific unit, the received button clicked was not recognized, received ${buttonClicked}`
        );
    }
  }

  //methods to toggle the value of the various units within
  //state, so that the correct data is display on the DOM
  #unitTogglers = {
    distance: () => {
      if (this.#selectedUnits.distance === "metric") {
        this.#selectedUnits.distance = "customary";
      } else if (this.#selectedUnits.distance === "customary") {
        this.#selectedUnits.distance = "metric";
      }
    },
    temperature: () => {
      if (this.#selectedUnits.temperature === "metric") {
        this.#selectedUnits.temperature = "customary";
      } else if (this.#selectedUnits.temperature === "customary") {
        this.#selectedUnits.temperature = "metric";
      }
    },
    measurement: () => {
      if (this.#selectedUnits.measurement === "metric") {
        this.#selectedUnits.measurement = "customary";
      } else if (this.#selectedUnits.measurement === "customary") {
        this.#selectedUnits.measurement = "metric";
      }
    },
  };

  //-------------------APIs-------------------//

  unitButtonEntryPoint(buttonClicked) {
    try {
      this.#argValidator("unitButtonEntryPoint", { buttonClicked });

      this.#toggleUnit(buttonClicked); //activate the unit toggling based on the received command

      this.#processWeatherData(false); //process weather data, but with the data that is already stored internally
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  weatherDataEntryPoint(data) {
    try {
      this.#argValidator("weatherDataEntryPoint", { data });

      this.#processWeatherData(true, data); //process weather data, but with the data that was supplied from the entry point
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

//will hold data that represents the most up to date
export class WeatherAppFunctionality {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //store the element reference instance to state

      this.#initStateAndConfig(); //create the class instances

      this.#linkWeatherDataManagerToPublisher(); //link the emit weather data to helpers class instance to the UI Functionality publisher
    } catch (error) {
      console.error(error, error.stack);
    }
  }
  //------------------ARGUMENT-VALIDATION-----------------------//

  #argValidationData = {
    constructor: {
      elementReferenceManager: {
        instanceof: ElementRefManager,
      },
    },
    weatherDataReceiver: {
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

  //---------------------STATE-AND-CONFIG-DATA------------------//

  #helperClasses = {
    weatherDataManager: null,
    userInterfaceFunctionality: null,
  };

  #functionalityActive = false;

  //------------------------HELPER-METHODS----------------------//

  #initStateAndConfig() {
    this.#helperClasses.weatherDataManager = new WeatherDataManager(
      this.#helperClasses.elementReferenceManager
    ); //make the emit class instance

    this.#helperClasses.userInterfaceFunctionality =
      new UserInterfaceFunctionality(
        this.#helperClasses.elementReferenceManager
      ); //make the user interface functionality class instance
  }
  //main entrypoint method that will commence initializing the state of
  //this class instance

  #linkWeatherDataManagerToPublisher() {
    const { weatherDataManager, userInterfaceFunctionality } =
      this.#helperClasses; //get the required helper class instances

    userInterfaceFunctionality.subscribe(
      "WeatherDataManager",
      weatherDataManager.unitButtonEntryPoint.bind(weatherDataManager)
    ); //have one helper class instance to subscribe to another
    //class instance publisher, make sure to bind the supplied api to the class origin
  }

  #emitInboundDataToDependencies(data) {
    if (this.#functionalityActive) {
      const { weatherDataManager } = this.#helperClasses;

      weatherDataManager.weatherDataEntryPoint(data);
    }
  }

  //----------------------------APIs----------------------------//

  //will be the entry point to receive weather data from both the search bar
  //and the current location query portions of the app
  weatherDataReceiver(data) {
    try {
      this.#argValidator("weatherDataReceiver", { data }); //validate the inputs

      this.#emitInboundDataToDependencies(data);
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //activate the weather app functionality
  activate() {
    try {
      if (!this.#functionalityActive) {
        this.#functionalityActive = true;
      } else {
        throw new Error(
          `Failed to activate the weather app functionality, as it appears to already be on`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //deactivate the weather app functionality
  deactivate() {
    try {
      if (!this.#functionalityActive) {
        this.#functionalityActive = false;
      } else {
        throw new Error(
          `Failed to deactivate the weather app functionality, as it appears to already be off`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
