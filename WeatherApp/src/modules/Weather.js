import { Form } from "./Simple-Form-Module.js";
import { ElementRefManager } from "./Element-Ref-Manager.js";

const generalSubClasses = {
  ElementRefManager: ElementRefManager,
  Form: Form,
  ConfigValidator: class {},
};

const weatherSubClasses = {
  WeatherDataRetriever: class {
    //will be used to retrieve data from
    //the corresponding weather data api
    constructor(config, weatherDataApiLink) {}

    //will contain data that will dictate the behavior of the various private methods within this class, which in turn will determine the behavior surrounding retrieving weather data
    //all of the weather app subclasses will need to be supplied the same configurations in order for these classes to work
    #configData = {};

    //retrieves data based on config, using the supplied link to server
    retrieveData(location) {}
  },
  AppBuilder: class {
    //builds the entire weather app element fragmet with all of the necessary elements
    //will store references to each element created into the elementRefManager
    constructor(config) {}

    //builds complete app based on config, the elements created
    //will automatically be stored within the element ref manager

    #fragmentTemplates = {
      threeDayForecast: `
        `,
      sevenDayForcast: `
        `,
      location: `
        `,
      currentTempStat: `
        `,
      currentWeatherStats: `
        `,
      dailyAndHourlyToggle: `
        `,
      tempUnitToggle: `
        `,
      date: `
        `,
      locationSearchBar: `
        `,
    };

    //will contain data that will dictate the behavior of the various private methods within this class, which in turn will create corresponding weather app structure
    //all of the weather app subclasses will need to be supplied the same configurations in order for these classes to work
    #configData = {};

    //holds important data representing the state of this class instance in order to help define specific behaviors
    //for certain apis, such as buildApp, which you don't want to be able to use it more than once in an instance
    #stateData = {
      appBuilt: false,
    };

    #appComponentBuilders = {
      //holds methods to construct certain parts of the weather app elements based on the configuration
    };

    buildApp() {}
  },
  ApplyDataToDOM: class {
    //will be used to keep the weather data within this app feature always up to date,
    //will utilize the element cache manager to do so
    constructor(config) {}

    //will contain data that will dictate the behavior of the various private methods within this class, which in turn will determine what data to apply to existing elements as determined by the config
    //all of the weather app subclasses will need to be supplied the same configurations in order for these classes to work
    #configData = {};
    //will fetch and apply api data to the
    //display based on the config supplied
    applyCurrentDataToDisplay() {}
  },
};

export class WeatherApp {
  constructor(config) {}

  //will store the entire weather app instance element if everything is successful
  #weatherAppInstance = null;

  //store all of the helper classes that make up the entire weather app
  #helperClasses = {
    WeatherDataRetriever: null,
    AppBuilder: null,
    ApplyDataToDOM: null,
    ElementRefManager: new generalSubClasses.ElementRefManager(),
  };

  //holds various methods to handle the supplied config and create a final config that will be supplied to the helper class instances
  #configMethods = {
    iterate: (suppliedConfig) => {
      for (let property in this.#validConfigValues) {
        if (property in suppliedConfig) {
          //for condition that the corresponding property exists within the supplied config
          //will try to validate the value of said property, and if anything is wrong, an error will be thrown and caught by the try/catch
          try {
            this.#configMethods.validate(
              property,
              suppliedConfig[property],
              suppliedConfig
            );
          } catch (error) {
            console.error(error, error.stack);
          }

          //will add the property and value to the final config if the corresponding property validates
          this.#configMethods.applyToFinal(property, suppliedConfig[property]);
        } else {
          //will automatically use the default value if a property wasn't explicitly defined otherwise
          this.#configMethods.applyToFinal(
            property,
            this.#defaultConfigValues[property]
          );
        }
      }
    },
    validate: (property, propertyValue, suppliedConfig) => {
      if (typeof this.#validConfigValues[property] === "string") {
        //this means that it's an explicitly defined data type
        const validDataType = this.#validConfigValues[property];
        this.#validationMethods.type(propertyValue, validDataType);
      } else if (Array.isArray(this.#validConfigValues[property])) {
        //this means that there is an array of valid values for the corresponding property
        //grab the data type expected from the array that contains valid values, as all of the elements should be the same data type
        const validDataType = typeof this.#validConfigValues[property][0];
        this.#validationMethods.type(propertyValue, validDataType);

        //then if the property value passes the type check, do a value check
        const validDataValues = this.#validConfigValues[property];
        this.#validationMethods.value(propertyValue, validDataValues);
      } else if (typeof this.#validConfigValues[property] === "object") {
        //this means that this property has a dependency on another property being
        // different as well, so multiple properties have to be validated at once essentially
        const { checkDependentProperty } = this.#validConfigValues[property];

        if (
          "validInputs" in this.#validConfigValues[property] === true &&
          "validDataType" in this.#validConfigValues[property] === false
        ) {
          //validate the data type of the supplied property value
          const validDataType =
            typeof this.#validConfigValues[property]["validInputs"][0];
          this.#validationMethods.type(propertyValue, validDataType);
          //then validate whether the supplied value is a possible value
          const validDataValues =
            this.#validConfigValues[property]["validInputs"];
          this.#validationMethods.value(propertyValue, validDataValues);
        } else if (
          "validDataType" in this.#validConfigValues[property] === true &&
          "validInputs" in this.#validConfigValues[property] === false
        ) {
          const validDataType =
            this.#validConfigValues[property]["validDataType"];
          this.#validationMethods.type(propertyValue, validDataType);
        } else {
          throw new SyntaxError(
            `A specific property within the validConfigValues object was not configured correctly, either both properties 'validInputs' and 'validDataType' were declared, or neither of them were declared, only or the other can be declared, within '${property}' this was found.`
          );
        }
      }
    },
    applyToFinal: (property, propertyValue) => {
      this.#finalConfig[property] = propertyValue;
    },
  };

  #configPropertyValueValidators = {
    explicitDataType: () => {},
    possibleValues: () => {},
    complexDependencies: () => {},
  };

  //will hold validation methods for various types of checks on property data
  #validationMethods = {
    type: (propertyValue, validDataType, property) => {
      if (typeof propertyValue !== validDataType) {
        throw new TypeError(
          `Supplied configuration property value invalid, supplied value is not the correct data type, received '${propertyValue}' for the configuration property '${property}'.`
        );
      }
    },
    value: (propertyValue, validInputs, property) => {
      if (!validInputs.includes(propertyValue)) {
        throw new SyntaxError(
          `Supplied configuration property value invalid, does not match any of the valid values possible, received '${propertyValue}' for the configuration property '${property}'.`
        );
      }
    },
  };

  //will hold the final configuration that will be supplied to the helper classes
  #finalConfig = {};

  //holds data that represent valid configuration object property values
  #validConfigValues = {
    numberOfDaysForecast: [3, 7],
    currentWeatherStats: "boolean",
    currentTempStats: "boolean",
    forecastTimeframe: ["daily", "hourly", "both"],
    date: "boolean",
    tempUnit: ["F", "C", "both"],
    locationSearchBar: "boolean",
    useCurrentLocation: "boolean",
    weatherApiSource: {
      checkDependentProperty: "apiKey",
      validInputs: ["WeatherAPI"],
    },
    apiKey: "string",
  };

  //holds default configuration values that can be overridden by the supplied config to the constructor
  #defaultConfigValues = {
    numberOfDaysForecast: 3,
    currentWeatherStats: true,
    forecastTimeframe: "both",
    date: true,
    tempUnit: "both",
    locationSearchBar: true,
    useCurrentLocation: true,
    weatherApiSource: "WeatherAPI",
    apiKey: "1b02a8d7c80a47a992443529230607", //my personal api key for Weather API
  };

  //will append the weather app instance stored within the state if weather app instance was successfully created
  init(targetElement) {
    if (
      targetElement instanceof Element &&
      this.#weatherAppInstance !== null &&
      this.#weatherAppInstance instanceof Element
    ) {
      targetElement.append(this.#weatherAppInstance);
    }
  }
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
