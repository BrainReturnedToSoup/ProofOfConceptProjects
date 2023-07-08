import { Form } from "./Simple-Form-Module.js";

//link to the weather api endpoint using my personal key, don't worry the service is free
const defaultLinkToWeatherDataApi =
  "https://api.weatherapi.com/v1/current.json?key=1b02a8d7c80a47a992443529230607&q=";

const generalSubClasses = {
  ElementRefManager: class {
    //acts as a means of managing all element references within this feature
    //this way weather sub classes can easily access these references

    #cache = new Map();

    //APIs for adding, removing, or retrieving stored element refs
    addRef(key, value) {
      if (
        typeof key === "string" &&
        !this.#cache.has(key) &&
        value instanceof Element
      ) {
        this.#cache.set(key, value);
      } else {
        throw new Error(``);
      }
    }

    deleteRef(key) {
      if (typeof key === "string" && this.#cache.has(key)) {
        this.#cache.delete(key);
      } else {
        throw new Error(``);
      }
    }

    retrieveRef(key) {
      if (typeof key === "string" && this.#cache.has(key)) {
        return this.#cache.get(key);
      } else {
        return null;
      }
    }
  },
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
      mainTempStat: `
        `,
      mainWeatherStats: `
        `,
      dailyAndHourlyToggle: `
        `,
      tempUnitToggle: `
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
  constructor(config, weatherDataApiLink = defaultLinkToWeatherDataApi) {
    // will create new class instances using supplied arguments to determine
    // various configs, and then add the instances within the helper classes state
  }
  #helperClasses = {
    weatherDataRetriever: null,
    appBuilder: null,
    applyDataToDOM: null,
    elementRefManager: new generalSubClasses.ElementRefManager(),
  };

  init(targetElement) {
    //will append entire weatherApp that is created to targetElement
  }
}
