import { ElementRefManager } from "../Level-0/Element-Ref-Manager"; //dependency for various argument validation

class GeneralInfoConstructor {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //save helper class instance

      this.#createGeneralInfoElement(); //create the entire general info fragment
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

  //---------------------CLASS-AND-CONFIG-DATA--------------------//

  #generalIdentifiers = {
    general: `General-Info`,
  };

  #helperClasses = {
    elementReferenceManager: null,
  };

  #generalInfoElement = null;

  //-------------------ELEMENT-REFERENCE-CACHING------------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //------------------------HELPER-METHODS------------------------//

  #createGeneralInfoElement() {
    const { main } = this.#containerElementConstructors,
      { location } = this.#generalInfoElementConstructors;

    //create all of the necessary elements to create the general info fragment
    const mainContainerElement = main(),
      childElements = {
        location: location(),
      };

    //append the child elements to the container
    for (let element in childElements) {
      mainContainerElement.append(childElements[element]);
    }

    this.#generalInfoElement = mainContainerElement; //save completely constructed and assembled general info element to state
  }

  //----------------------ELEMENT-CONSTRUCTORS--------------------//

  #containerElementConstructors = {
    main: () => {
      const mainContainerElement = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Main-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      mainContainerElement.classList.add(generalIdentifier);
      mainContainerElement.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, mainContainerElement); //General-Info-Main-Container

      return mainContainerElement;
    },
  };

  #generalInfoElementConstructors = {
    location: () => {
      const locationElement = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Location`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      locationElement.classList.add(generalIdentifier);
      locationElement.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, locationElement); //General-Info-Location

      return locationElement;
    },
  };

  //-----------------------------APIs-----------------------------//

  returnGeneralInfoFragment() {
    try {
      return this.#generalInfoElement;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
} // constructs the portion of the app that holds the general information, such as location and current time

class CurrentWeatherConstuctor {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //save helper class instance

      this.#createCurrentWeatherFragment(); //create the entire fragment, and save the product to state
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

  //----------------------STATE-AND-CONFIG-DATA-----------------------//

  #generalIdentifiers = {
    general: `Current-Weather`,
  };

  #helperClasses = {
    elementReferenceManager: null,
  };

  #currentWeatherElement = null;

  //-------------------------ELEMENT-CACHING--------------------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //--------------------------HELPER-METHODS--------------------------//

  #createCurrentWeatherFragment() {
    const { main } = this.#containerConstructors,
      {
        conditionText,
        conditionImage,
        temp,
        tempFeelsLike,
        precip,
        humidity,
        dayOrNightImage,
        visibility,
        windDegree,
        windDirection,
        windSpeed,
      } = this.#currentWeatherElementConstructors,
      mainContainerElement = main(); //create the main container to append the various child elements to

    //define the order to create and append the corresponding elements within the
    //main container
    const createAndAppendOrder = [
      dayOrNightImage,
      conditionImage,
      conditionText,
      temp,
      tempFeelsLike,
      precip,
      windDirection,
      windDegree,
      windSpeed,
      humidity,
      visibility,
    ];

    //create and append each imported method that represents a specific data display element,
    //follows the order of the defined array
    createAndAppendOrder.forEach((method) => {
      const element = method();
      mainContainerElement.append(element);
    });

    this.#currentWeatherElement = mainContainerElement; //save the complete current weather fragment to state
  }

  //------------------------ELEMENT-CONSTRUCTORS----------------------//

  #containerConstructors = {
    main: () => {
      const currentWeatherContainerElement = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Main-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      currentWeatherContainerElement.classList.add(generalIdentifier);
      currentWeatherContainerElement.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, currentWeatherContainerElement);

      return currentWeatherContainerElement;
    },
  };

  #currentWeatherElementConstructors = {
    conditionText: () => {
      const conditionTextField = document.createElement("h1"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Condition-Text`,
        combinedIdentifier = generalIdentifier + "-" + specificIdentifier;

      conditionTextField.classList.add(generalIdentifier);
      conditionTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, conditionTextField); //Current-Weather-Condition-Text

      return conditionTextField;
    }, //will say a phrase like 'partly cloudly' or 'sunny' etc to represent the weather
    conditionImage: () => {
      const conditionImageElement = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Condition-Image`,
        combinedIdentifier = generalIdentifier + "-" + specificIdentifier;

      conditionImageElement.classList.add(generalIdentifier);
      conditionImageElement.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, conditionImageElement); //Current-Weather-Condition-Image

      return conditionImageElement;
    }, //holds an image that will match the condition text phrase
    temp: () => {
      const tempTextField = document.createElement("h1"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Temp`,
        combinedIdentifier = generalIdentifier + "-" + specificIdentifier;

      tempTextField.classList.add(generalIdentifier);
      tempTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, tempTextField); //Current-Weather-Temp

      return tempTextField;
    }, //actual temp
    tempFeelsLike: () => {
      const feelsLikeTempTextField = document.createElement("h2"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Feels-Like-Temp`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      feelsLikeTempTextField.classList.add(generalIdentifier);
      feelsLikeTempTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, feelsLikeTempTextField); //Current-Weather-Feels-Like-Temp

      return feelsLikeTempTextField;
    }, //what it feels like
    precip: () => {
      const precipTextField = document.createElement("h2"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Precip`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      precipTextField.classList.add(generalIdentifier);
      precipTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, precipTextField); //Current-Weather-Precip

      return precipTextField;
    }, //amount of precipitation
    humidity: () => {
      const humidityTextField = document.createElement("h2"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Humidity`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      humidityTextField.classList.add(generalIdentifier);
      humidityTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, humidityTextField); //Current-Weather-Humidity

      return humidityTextField;
    }, //how humid the air is
    dayOrNightImage: () => {
      const dayOrNightImage = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Day-Or-Night-Image`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      dayOrNightImage.classList.add(generalIdentifier);
      dayOrNightImage.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, dayOrNightImage); //Current-Weather-Day-Or-Night-Image

      return dayOrNightImage;
    }, //value that represents if its day or night
    visibility: () => {
      const visibilityTextField = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Visibility`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      visibilityTextField.classList.add(generalIdentifier);
      visibilityTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, visibilityTextField); //Current-Weather-Visibility

      return visibilityTextField;
    }, //length of visibility through the sky
    windDegree: () => {
      const windDegreeTextField = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Wind-Degree`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      windDegreeTextField.classList.add(generalIdentifier);
      windDegreeTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, windDegreeTextField); //Current-Weather-Wind-Degree

      return windDegreeTextField;
    }, //wind direction in degrees
    windDirection: () => {
      const windDirectionTextField = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Wind-Direction`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      windDirectionTextField.classList.add(generalIdentifier);
      windDirectionTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, windDirectionTextField); //Current-Weather-Wind-Direction

      return windDirectionTextField;
    }, //wind direction in compass units
    windSpeed: () => {
      const windSpeedTextField = document.createElement("h3"),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Wind-Speed`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      windSpeedTextField.classList.add(generalIdentifier);
      windSpeedTextField.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, windSpeedTextField); //Current-Weather-Wind-Speed

      return windSpeedTextField;
    }, //how fast the wind is moving
  };

  //---------------------------APIs------------------------//

  returnCurrentWeatherFragment() {
    try {
      return this.#currentWeatherElement;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
} // constructs the portion of the app that holds the current weather information based on location

class ForecastConstructor {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //store helper class instance

      this.#createForecastFragment(); //create the entire fragment and store it into the state
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

  //--------------------STATE-AND-CONFIG-DATA---------------------//

  #generalIdentifiers = {
    dayCardElements: `Forecast-Day`,
    generalElements: `Forecast`,
  };

  #helperClasses = {
    elementReferenceManager: null,
  };

  #forecastElement = null;

  //----------------------ELEMENT-CACHING-------------------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //-----------------------HELPER-METHODS-------------------------//

  #createForecastFragment() {
    //create the main container that will hold all of the day cards
    const { mainContainer } = this.#containerConstructors,
      mainContainerElement = mainContainer();

    for (let i = 0; i < 7; i++) {
      const dayCard = this.#createDayCard(`Day-${i}`); //create a day card corresponding to the day, this way each created day card element has something unique attached to them

      mainContainerElement.append(dayCard);
    }

    this.#forecastElement = mainContainerElement; //set the completely assembled forecast element to the state
  } //will construct and assemble all of the necessary cards and containers to create the entire fragment

  #createDayCard(dayNumString) {
    const {
        dayDate,
        conditionText,
        conditionImage,
        tempHigh,
        tempLow,
        precipChance,
      } = this.#dayCardElementConstructors,
      { dayCardContainer } = this.#containerConstructors;

    //create all of the necessary elements that make up a single day card
    const dayCardContainerElement = dayCardContainer(dayNumString),
      dayCardChildElements = {
        date: dayDate(dayNumString),
        conditionText: conditionText(dayNumString),
        conditionImage: conditionImage(dayNumString),
        tempHigh: tempHigh(dayNumString),
        tempLow: tempLow(dayNumString),
        precipChance: precipChance(dayNumString),
      }; //all of the child elements of the day card container, will be appended in this order

    //append the child elements to the container
    for (let element in dayCardChildElements) {
      dayCardContainerElement.append(dayCardChildElements[element]);
    }

    return dayCardContainerElement; //return the assembled day card template
  } //will construct and assemble individual day cards

  //---------------------ELEMENT-CONSTRUCTORS---------------------//

  #containerConstructors = {
    mainContainer: () => {
      const mainContainerElement = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.generalElements,
        specificIdentifier = `Main-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      mainContainerElement.classList.add(generalIdentifier);
      mainContainerElement.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, mainContainerElement); //Forecast-Main-Container

      return mainContainerElement;
    }, //the container that contains the entire forecast, including the day containers
    dayCardContainer: (dayNumString) => {
      const dayContainerElement = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Card-Container`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      dayContainerElement.classList.add(generalIdentifier);
      dayContainerElement.classList.add(specificIdentifier);
      dayContainerElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, dayContainerElement); //Forecast-Day-Card-Container-Day-${number}

      return dayContainerElement;
    }, //will represent a single way within the forecast
  };

  #dayCardElementConstructors = {
    dayDate: (dayNumString) => {
      const dayDateTextElement = document.createElement("p"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Date`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      dayDateTextElement.classList.add(generalIdentifier);
      dayDateTextElement.classList.add(specificIdentifier);
      dayDateTextElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, dayDateTextElement); //Forecast-Day-Date-Day-${number}

      return dayDateTextElement;
    },
    conditionText: (dayNumString) => {
      const conditionTextElement = document.createElement("p"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Condition-Text`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      conditionTextElement.classList.add(generalIdentifier);
      conditionTextElement.classList.add(specificIdentifier);
      conditionTextElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, conditionTextElement); //Forecast-Day-Condition-Text-Day-${number}

      return conditionTextElement;
    }, //will say a phrase like 'partly cloudly' or 'sunny' etc to represent the weather for a given day
    conditionImage: (dayNumString) => {
      const conditionImageElement = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Condition-Image`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      conditionImageElement.classList.add(generalIdentifier);
      conditionImageElement.classList.add(specificIdentifier);
      conditionImageElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, conditionImageElement); //Forecast-Day-Condition-Image-Day-${number}

      return conditionImageElement;
    }, //holds an image that will match the condition text phrase within a corresponding day container
    tempHigh: (dayNumString) => {
      const tempHighElement = document.createElement("p"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Temp-High`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      tempHighElement.classList.add(generalIdentifier);
      tempHighElement.classList.add(specificIdentifier);
      tempHighElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, tempHighElement); //Forecast-Day-Temp-High-Day-${number}

      return tempHighElement;
    }, //the predicted high temp for a given forecast day
    tempLow: (dayNumString) => {
      const tempLowElement = document.createElement("p"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Temp-Low`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      tempLowElement.classList.add(generalIdentifier);
      tempLowElement.classList.add(specificIdentifier);
      tempLowElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, tempLowElement); //Forecast-Day-Temp-Low-Day-${number}

      return tempLowElement;
    }, //the predicted low temp for a given forecast day
    precipChance: (dayNumString) => {
      const precipChanceElement = document.createElement("p"),
        generalIdentifier = this.#generalIdentifiers.dayCardElements,
        specificIdentifier = `Precip-Chance`,
        combinedIdentifier =
          generalIdentifier + `-` + specificIdentifier + `-` + dayNumString;

      precipChanceElement.classList.add(generalIdentifier);
      precipChanceElement.classList.add(specificIdentifier);
      precipChanceElement.classList.add(dayNumString);

      this.#storeElementRef(combinedIdentifier, precipChanceElement); //Forecast-Day-Precip-Chance-Day-${number}

      return precipChanceElement;
    }, //the predicted amount of precipitation for a given forecast day
  };

  //----------------------------APIs------------------------------//

  returnForecastFragment() {
    try {
      return this.#forecastElement;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
} // constructs the portion of the app that holds the forecast based on the location

class UserInterfaceConstructor {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate the args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //store the helper class instance to the state

      this.#createUserInterfaceFragment(); //create the entire fragment, which its saved to the state
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

  //------------------STATE-AND-CONFIG-DATA----------------------//

  #helperClasses = {
    elementReferenceManager: null,
  };

  #generalIdentifiers = {
    buttons: `User-Interface-Buttons`,
    containers: `User-Interface-Containers`,
  };

  #userInterfaceElement = null;

  //------------------ELEMENT-REFERENCE-CACHING-----------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //---------------------HELPER-METHODS--------------------------//

  //orchestrates the entire creation of the user interface fragment
  #createUserInterfaceFragment() {
    const { main } = this.#containers,
      { toggleButtons } = this.#sectionConstructors;

    const userInterfaceContainer = main(), //create the main container, as well as the constructed section for toggle buttons
      toggleButtonsSection = toggleButtons();

    userInterfaceContainer.append(toggleButtonsSection);

    this.#userInterfaceElement = userInterfaceContainer; //save the completely assembled user interface fragment to state
  }

  //-------------------ELEMENT-CONSTRUCTORS----------------------//

  #sectionConstructors = {
    toggleButtons: () => {
      const { button } = this.#containers,
        { toggleTempUnit, toggleDistanceUnit, toggleMeasurementUnit } =
          this.#buttons;

      const buttonContainer = button(),
        buttonElements = {
          toggleTempUnit: toggleTempUnit(),
          toggleDistanceUnit: toggleDistanceUnit(),
          toggleMeasurementUnit: toggleMeasurementUnit(),
        }; //create the container and all of the individual buttons

      //append all of the buttons to the container
      for (let button in buttonElements) {
        buttonContainer.append(buttonElements[button]);
      }

      return buttonContainer; //return the assembled button container
    },
  };

  #containers = {
    main: () => {
      const mainContainer = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.containers,
        specificIdentifier = `Main-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      mainContainer.classList.add(generalIdentifier);
      mainContainer.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, mainContainer); //User-Interface-Containers-Main-Container

      return mainContainer;
    },
    button: () => {
      const buttonContainer = document.createElement("div"),
        generalIdentifier = this.#generalIdentifiers.containers,
        specificIdentifier = `Button-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      buttonContainer.classList.add(generalIdentifier);
      buttonContainer.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, buttonContainer); //User-Interface-Containers-Button-Container

      return buttonContainer;
    },
  };

  #buttons = {
    toggleTempUnit: () => {
      const tempToggleButton = document.createElement("button"),
        generalIdentifier = this.#generalIdentifiers.buttons,
        specificIdentifier = `Temp-Toggle`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      tempToggleButton.classList.add(generalIdentifier);
      tempToggleButton.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, tempToggleButton); //User-Interface-Buttons-Temp-Toggle

      return tempToggleButton;
    }, //F or C
    toggleDistanceUnit: () => {
      const distanceToggleButton = document.createElement("button"),
        generalIdentifier = this.#generalIdentifiers.buttons,
        specificIdentifier = `Distance-Toggle`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      distanceToggleButton.classList.add(generalIdentifier);
      distanceToggleButton.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, distanceToggleButton); //User-Interface-Buttons-Distance-Toggle

      return distanceToggleButton;
    }, //km or mi
    toggleMeasurementUnit: () => {
      const measurementToggleButton = document.createElement("button"),
        generalIdentifier = this.#generalIdentifiers.buttons,
        specificIdentifier = `Measurement-Toggle`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      measurementToggleButton.classList.add(generalIdentifier);
      measurementToggleButton.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, measurementToggleButton); //User-Interface-Buttons-Measurement-Toggle

      return measurementToggleButton;
    }, //mm or in
  };

  //------------------------APIs----------------------------//

  returnUserInterfaceFragment() {
    try {
      return this.#userInterfaceElement; //return the entire user interface fragment completely constructed and assembled
    } catch (error) {
      console.error(error, error.stack);
    }
  }
} // constructs the portion of the app that holds the user interface, such as the location search bar, and the unit toggle buttons

export class WeatherAppConstructor {
  constructor(elementReferenceManager) {
    try {
      this.#argValidator("constructor", { elementReferenceManager }); //validate the args

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //save the element reference manager instance

      this.#createWeatherAppFragment(); //create the entire weather app web page fragment, in which its stored in state for later retrieval
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

  //------------------STATE-AND-CONFIG-DATA-----------------//

  #generalIdentifiers = {
    general: `Weather-App`,
  };

  #fragments = {
    generalInfo: null,
    currentWeather: null,
    userInterface: null,
    forecast: null,
  };

  //holds the entirely constructed and assembled weather app essentially,
  //will be returned by the api of this class
  #completeWeatherAppElement = null;

  //cache to store element references within, in which the functionality class will use the
  //same reference manager instance to apply functionality to
  #helperClasses = {
    elementReferenceManager: null,
  };

  //----------------ELEMENT-REFERENCE-CACHING---------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //------------------CREATE-ENTIRE-WEB-PAGE----------------//

  #createWeatherAppFragment() {
    this.#createSubFragments(); //create all of the necessary sub fragmentsd

    const { main } = this.#containers,
      mainContainerElement = main();

    //fetch all of the previously created fragments from state
    const { generalInfo, currentWeather, userInterface, forecast } =
      this.#fragments;

    //append them to the main container in this order
    [generalInfo, currentWeather, userInterface, forecast].forEach((fragment) =>
      mainContainerElement.append(fragment)
    );

    this.#completeWeatherAppElement = mainContainerElement; //store the completely constructed and assembled weather app page to state
  }

  //will orchestrate the entire creation of the weather app page
  #createSubFragments() {
    const { generalInfo, currentWeather, userInterface, forecast } =
      this.#fragmentCreation; //get all of the necessary fragment creation methods

    //create each fragment and store it in state
    [generalInfo, currentWeather, userInterface, forecast].forEach((method) => {
      method();
    });
  }

  //-------------------ELEMENT-CONSTRUCTORS-----------------//

  #containers = {
    main: () => {
      const weatherAppContainer = document.createElement(`div`),
        generalIdentifier = this.#generalIdentifiers.general,
        specificIdentifier = `Main-Container`,
        combinedIdentifier = generalIdentifier + `-` + specificIdentifier;

      weatherAppContainer.classList.add(generalIdentifier);
      weatherAppContainer.classList.add(specificIdentifier);

      this.#storeElementRef(combinedIdentifier, weatherAppContainer); //Weather-App-Main-Container

      return weatherAppContainer;
    },
  };

  //--------------------FRAGMENT-CREATION-------------------//

  //methods to create fragments of the weather app
  //page, in which they will all be supplied the same
  //element reference manager instance, so every
  //single element made will be on the same cache.
  //these methods will use the helper classes to
  //facilitate the creation
  #fragmentCreation = {
    generalInfo: () => {
      const { elementReferenceManager } = this.#helperClasses,
        generalInfoConstructorInstance = new GeneralInfoConstructor(
          elementReferenceManager
        ); // make the corresponding fragment construtor instance, supply it the reference manager instance that was supplied before

      this.#fragments.generalInfo =
        generalInfoConstructorInstance.returnGeneralInfoFragment(); //return the fragment and store it in the controller state
    },
    currentWeather: () => {
      const { elementReferenceManager } = this.#helperClasses,
        currentWeatherConstructorInstance = new CurrentWeatherConstuctor(
          elementReferenceManager
        );

      this.#fragments.currentWeather =
        currentWeatherConstructorInstance.returnCurrentWeatherFragment();
    },
    userInterface: () => {
      const { elementReferenceManager } = this.#helperClasses,
        userInterfaceConstructorInstance = new UserInterfaceConstructor(
          elementReferenceManager
        );

      this.#fragments.userInterface =
        userInterfaceConstructorInstance.returnUserInterfaceFragment();
    },
    forecast: () => {
      const { elementReferenceManager } = this.#helperClasses,
        forecastConstructorInstance = new ForecastConstructor(
          elementReferenceManager
        );

      this.#fragments.forecast =
        forecastConstructorInstance.returnForecastFragment();
    },
  };

  //--------------------------APIs--------------------------//

  returnWeatherAppFragment() {
    try {
      return this.#completeWeatherAppElement;
    } catch (error) {
      console.error(error, error.stack);
    }
  } //will return the entire weather app fragment that was created
} //uses the helper classes in order to combined all of the made fragments to create an entire web page for the weather app
