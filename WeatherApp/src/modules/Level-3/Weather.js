//general dependencies
import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";

//specific implementation for this app specifically
import { WeatherLocationSearchBar } from "../Level-2/Weather-Location-Search-Bar.js";
import { WeatherAppConstructor } from "../Level-2/Weather-App-Constructor.js";
import { WeatherAppFunctionality } from "../Level-2/Weather-App-Functionality.js";
import { CurrentLocationWeather } from "../Level-2/Weather-Current-Location.js";


//orchestrates all of these sub classes together in order to form the entire weather app
//will inject dependencies where they are needed etc. Will provide a way to customize
//some features with the weather app
export class WeatherApp {
  constructor() {
    try {
      this.#initHelperClasses(); //initialize the helper class instances that make up the entire weather app

      this.#appendSearchBarFeatureToUI();
      //appends the search bar feature to the main weather app element fragment, since the search
      //bar is completely independent in nature

      this.#linkObserverToWeatherDataPublishers();
      //links the functionality helper class to any publishers that will emit
      //weather data for said helper to use and render on the DOM, this includes the search bar
      //and the current location weather helper classes

      this.#retrieveWeatherAppFragment();
      //retrieves the complete weather app from the constructor helper after everything else is initialized
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //------------ARGUMENT-VALIDATION-------------//

  #argValidationData = {
    append: {
      parentElement: {
        instanceof: Element,
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

  //-----------STATE-AND-CONFIG-DATA------------//

  #helperClasses = {
    elementReferenceManager: null,
    weatherAppConstructor: null,
    weatherAppFunctionality: null,
    weatherLocationSearchBar: null,
    currentLocationWeather: null,
  };

  #weatherAppFragment = null;

  #configData = {
    apiKey: `d9563f6e601e4aa199a205713232607`,
    searchBarUniqueIdentifier: `Weather-Location`,
  };

  //---------------HELPER-METHODS---------------//

  #initHelperClasses() {
    //create the helper classes in this order, so that the element references stored upon
    //element creation can be transfered from the constructor helper to the functionality helper
    this.#helperClasses.elementReferenceManager = new ElementRefManager();

    this.#helperClasses.weatherAppConstructor = new WeatherAppConstructor(
      this.#helperClasses.elementReferenceManager
    );
    //uses the ref manager as a dependency, so that all created elements are immediately stored in the cache

    this.#helperClasses.weatherAppFunctionality = new WeatherAppFunctionality(
      this.#helperClasses.elementReferenceManager
    );
    //uses the same ref manager with all of the necessary elements already stored within it in order
    //to facilitate functionality to existing elements

    //a completely separate feature in nature, outside of the functionality helper, in fact
    //the functionality helper will subscribe to this class in order to receive weather data
    //based on locations that are searched
    this.#helperClasses.weatherLocationSearchBar = new WeatherLocationSearchBar(
      this.#configData.searchBarUniqueIdentifier,
      this.#configData.apiKey
    );
    //need a unique identifier since the search bar is an independent feature in nature
    //also needs an api key to connect with the weather api

    //a module that takes the current location of the user, and then makes a weather api request
    //using their location
    this.#helperClasses.currentLocationWeather = new CurrentLocationWeather(
      this.#configData.apiKey
    );
  }

  #appendSearchBarFeatureToUI() {
    const { elementReferenceManager, weatherLocationSearchBar } =
      this.#helperClasses; //reference the appropriate helper classes to do so.

    const containerForUI = elementReferenceManager.retrieveRef(
        `User-Interface-Containers-Main-Container`
      ),
      firstChild = containerForUI.firstChild;
    //retrieve the UI main container reference, and save its first child as a reference

    const searchBarFrag = weatherLocationSearchBar.returnFragment();
    //get the complete search bar fragment

    containerForUI.insertBefore(searchBarFrag, firstChild);
    //using the previously saved first child, insert the search bar
    //before it so that the search bar is now the first child of the UI container
  }

  #linkObserverToWeatherDataPublishers() {
    const {
      weatherLocationSearchBar,
      weatherAppFunctionality,
      currentLocationWeather,
    } = this.#helperClasses;

    //link the weather app functionality helper to the search bar and the current location query module, so that
    //it can receive weather data that is emitted by either the search bar or current location query,
    //have to make sure to bind the supplied method to the functionality
    //helper instance
    weatherLocationSearchBar.subscribeToApiData(
      "Observer",
      weatherAppFunctionality.weatherDataReceiver.bind(weatherAppFunctionality)
    );

    currentLocationWeather.subscribeToApiData(
      "Observer",
      weatherAppFunctionality.weatherDataReceiver.bind(weatherAppFunctionality)
    );
  }

  #retrieveWeatherAppFragment() {
    const { weatherAppConstructor } = this.#helperClasses;

    this.#weatherAppFragment = weatherAppConstructor.returnWeatherAppFragment();
  }

  //--------------------APIs--------------------//

  append(parentElement) {
    try {
      this.#argValidator("append", { parentElement });

      parentElement.append(this.#weatherAppFragment);
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  useUserLocation() {
    const { currentLocationWeather } = this.#helperClasses;

    currentLocationWeather.requestCurrentLocation();
  }
}
