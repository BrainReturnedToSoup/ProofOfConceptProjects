import { ElementRefManager } from "../Level-0/Element-Ref-Manager";

class SearchBarFunctionality {
  constructor(argsObj) {}

  //------------------ARGUMENT-VALIDATION-----------------------//

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

  //-------------------FUNCTIONALITIES---------------------------//

  //-------------------EVENT-LISTENERS---------------------------//

  //-------------------------APIs--------------------------------//

  activate() {}

  deactivate() {}
}

class SearchBarConstructor {
  constructor(argsObj) {
    try {
      this.#argValidator("constructor", argsObj);

      //apply the arguments to the state as part of configuring said state
      const { uniqueIdentifier, elementReferenceManager, dynamicOptionsOn } =
        argsObj;

      this.#configData.uniqueIdentifier = uniqueIdentifier; //reg data
      this.#configData.dynamicOptionsOn = dynamicOptionsOn;

      this.#helperClasses.elementReferenceManager = elementReferenceManager; //class instance
    } catch (error) {
      console.error(error, error.stack);
    }
  }

  //--------------------ARGUMENT-VALIDATION-------------------------//

  #argValidationData = {
    //method
    constructor: {
      //args
      uniqueIdentifier: { type: "string" },
      elementReferenceManager: { instanceof: ElementRefManager },
      dynamicOptionsOn: { type: "boolean" },
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

  //---------------------STATE-AND-CONFIG-DATA---------------------//

  #configData = {
    uniqueIdentifier: null, //used to distinguish instances, as well as make the search bar unique on the DOM
    dynamicOptionsOn: null, //decides whether to append a datalist and configure the input with it as well
  };

  #helperClasses = {
    elementReferenceManager: null, //used to store references instead of spam querying
  };

  //--------------------ELEMENT-REFERENCE-CACHING-------------------//

  #storeElementRef(identifier, element) {
    this.#helperClasses.elementReferenceManager.addRef(identifier, element);
  }

  //----------------------ELEMENT-CONSTRUCTION----------------------//

  #elementConstructors = {
    form: () => {
      const formElement = document.createElement("form"),
        { uniqueIdentifier } = this.#configData;

      //define classes
      formElement.classList.add("Search-Bar-Form");
      formElement.classList.add(uniqueIdentifier);

      //define attributes
      formElement.setAttribute("novalidate", ""); //part of implementing the search bar functionality manually

      //store reference
      this.#storeElementRef("Search-Bar-Form", formElement);

      return formElement;
    },
    input: () => {
      const inputElement = document.createElement("input"),
        { uniqueIdentifier, dynamicOptionsOn } = this.#configData;

      //define classes
      inputElement.classList.add("Search-Bar-Input");
      inputElement.classList.add(uniqueIdentifier);

      //define attributes
      if (dynamicOptionsOn) {
        inputElement.setAttribute(
          "list",
          `Search-Bar-Data-List-${uniqueIdentifier}`
        );
      }

      //store reference
      this.#storeElementRef("Search-Bar-Input", inputElement);

      return inputElement;
    },
    dataList: () => {
      const dataListElement = document.createElement("datalist"),
        { uniqueIdentifier } = this.#configData;

      //define classes
      dataListElement.classList.add("Search-Bar-Data-List");
      dataListElement.classList.add(uniqueIdentifier);

      //define attributes
      dataListElement.setAttribute(
        "id",
        `Search-Bar-Data-List-${uniqueIdentifier}`
      );

      //store reference
      this.#storeElementRef("Search-Bar-Data-List", dataListElement);

      return dataListElement;
    },
  };

  //----------------------SEARCH-BAR-ASSEMBLY-----------------------//

  #createSearchBarFrag() {
    const { dynamicOptionsOn } = this.#configData;

    //create base search bar
    const formElement = this.#elementConstructors.form(),
      inputElement = this.#elementConstructors.input();

    formElement.append(inputElement);

    if (dynamicOptionsOn) {
      //transform search bar into one with a data list for dynamic options
      const dataListElement = this.#elementConstructors.dataList();

      formElement.append(dataListElement);

      return formElement; //return data list search bar
    } else {
      return formElement; //return base search bar
    }
  }

  //------------------------------APIs------------------------------//

  returnSearchBarFragment() {
    const completeSearchBar = this.#createSearchBarFrag();
    return completeSearchBar;
  }
}

class WeatherLocationSearchBar {
  //facilitate the building of the entire search bar,
  constructor() {
    //logic for executing the build and appending functionality in one complete package
  }

  //------------------ARGUMENT-VALIDATION-------------------------//

  #argValidationData = {
    //method
    subscribe: {
      //args
      subName: {
        //properties of arg
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
    append: {
      parentElement: {
        instanceof: Element,
      },
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

  //------------------STATE-AND-CONFIG-DATA-----------------------//

  #helperClassArgs = {
    searchBarConstructor: {},
    searchBarFunctionality: {},
  };

  #helperClassInstances = {
    weatherApi: null,
    searchBarConstructor: null,
    searchBarFunctionality: null,
    elementReferenceManager: null,
  };

  #searchBarAppended = false;

  #completeSearchBarElement = null;

  //--------------------FETCH-DATA-PUB-SUB-------------------------//

  //will be supplied to the SearchBar Functionality class subscription, so that the controller can emit
  //data from successful api requests
  #publisherEntryPoint(apiData) {
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
      this.#argValidationData("unsubscribe", { subName });

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

  //--------------------------MAIN-APIs------------------------------//

  //append the complete search bar element after it has been made completely
  append(parentElement) {
    try {
      this.#argValidator("append", { parentElement });

      if (!this.#searchBarAppended) {
        parentElement.append(this.#completeSearchBarElement);

        this.#searchBarAppended = true;
      } else {
        throw new Error(
          `Failed to append a weather app search bar instance, as the target instance was
           already appended somewhere else`
        );
      }
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
