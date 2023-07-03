class FormValidator {
  constructor(formControlElementArr, elementRefManager) {
    if (
      elementRefManager instanceof ElementRefManager &&
      Array.isArray(formControlElementArr) &&
      formControlElementArr.length > 0
    ) {
      //adds supplied arguments as values to specific configuration properties and helper classes within the class instance if they meet the following:
      //formControlElementArr must be an array that contains elements of some sort, and elementRefManager must be an instance from the class ElementRefManager
      this.#helperClasses.elementRefManager = elementRefManager;
      this.#configData.formControlElementArr = formControlElementArr;
    } else {
      throw new Error(
        `ERROR: FAILED TO INITIALIZE FORM VALIDATION ON TARGET FOR : EITHER OF THE RECEIVED ARGUMENTS ARE INVALID : 'formControlElementArr' MUST BE AN ARRAY WITH ELEMENTS AND 'elementRefManager' MUST BE AN INSTANCE OF THE CLASS 'ElementRefManager' : RECEIVED ${formControlElementArr} AND ${elementRefManager}`
      );
    }
  }

  //holds data pertaining to configuring the behavior of this class
  //which is supplied by the constructor arguments mostly
  #configData = {
    formControlElementArr: null,
  };

  //holds data that is important to facilitate the functionality of this class
  //but is not necessarily derived directly from the constructor arguments
  #refData = {
    retrievedElementRefs: {},
  };

  //holds values to important class instances that help facilitate specific functionality within the class
  //through their interfaces
  #helperClasses = {
    elementRefManager: null,
  };

  //holds the text data relating to a specific validation failure based on the corresponding form control element, which will
  //be used mainly by the check validity method in order to facilitate the basic validity check using the constraint api
  #validationFailureText = {
    email: {
      valueMissing: "Please enter a valid email address.",
      typeMismatch:
        "The supplied information for this field is not a valid email address.",
    },
    zipCode: {
      valueMissing: "Please enter a valid ZIP Code.",
      patternMismatch:
        "The supplied information for this field is not a valid ZIP Code.",
    },
    password: {
      valueMissing: "Please enter your password.",
      patternMismatch:
        "The supplied information for this field is not a valid password.",
    },
    confirmPassword: {
      valueMissing: "Please repeat your password.",
      customError: "These passwords do not match.",
    },
  };

  #fetchRequiredElementRefs() {
    //iterates over every element in the supplied form control element array, and retrieves their corresponding
    //reference in the element ref manager
    const retrievedForm =
      this.#helperClasses.elementRefManager.retrieveRef("formElement"); //for retrieving the form tag reference so to speak

    if (retrievedForm !== null) {
      this.#refData.retrievedElementRefs["formElement"] = retrievedForm; //stores it in the local cache if successfully retrieved
    }

    for (let element of this.#configData.formControlElementArr) {
      const retrievedElement =
        this.#helperClasses.elementRefManager.retrieveRef(element);

      //if a form control element reference is successfully retrieved, add it to the retrievedElementRefs property in the config data
      if (retrievedElement !== null) {
        this.#refData.retrievedElementRefs[element] = retrievedElement;
      }
    }
  }

  #eventFunctionalities = {
    input: {
      email: () => {
        //checks for the existence of the retrieved property, if the property was retrieved,
        //the associated functionality can commence
        if ("email" in this.#refData.retrievedElementRefs) {
          const emailInput =
              this.#refData.retrievedElementRefs.email.querySelector("input"),
            validationFailureTextElement = emailInput.nextElementSibling;

          //display the validation failure message or delete all of the text if the input passed
          if (emailInput.validity.valid === false) {
            const validationFailureMessage = this.#getValidationFailureMessage(
              "email",
              emailInput.validity
            );
            validationFailureTextElement.textContent = validationFailureMessage;
          } else {
            validationFailureTextElement.textContent = "";
          }
        }
      },
      zipCode: () => {
        //checks for the existence of the retrieved property, if the property was retrieved,
        //the associated functionality can commence
        if ("zipCode" in this.#refData.retrievedElementRefs) {
          const zipCodeInput =
              this.#refData.retrievedElementRefs.zipCode.querySelector("input"),
            validationFailureTextElement = zipCodeInput.nextElementSibling;

          //display the validation failure message or delete all of the text if the input passed
          if (zipCodeInput.validity.valid === false) {
            const validationFailureMessage = this.#getValidationFailureMessage(
              "zipCode",
              zipCodeInput.validity
            );
            validationFailureTextElement.textContent = validationFailureMessage;
          } else {
            validationFailureTextElement.textContent = "";
          }
        }
      },
      password: () => {
        //checks for the existence of the retrieved property, if the property was retrieved,
        //the associated functionality can commence
        if ("password" in this.#refData.retrievedElementRefs) {
          const passwordInput =
            this.#refData.retrievedElementRefs.password.querySelector("input");

          //check if there is also a retrieved confirm password, if so activate the specific functionality
          //that exists when there is also a confirm password field, which essentially disables the
          //password field if you are adding data to the confirm password field
          if ("confirmPassword" in this.#refData.retrievedElementRefs) {
            const confirmPasswordInput =
              this.#refData.retrievedElementRefs.confirmPassword.querySelector(
                "input"
              );

            if (confirmPasswordInput.value !== "") {
              passwordInput.disabled = true;
              return;
            } else {
              passwordInput.disabled = false;
            }
          }

          //retrieve the reference to the validation failure element that will display the relevant messages
          //to the user on what caused the failure, and then check the validity of the target form control element
          const validationFailureTextElement = passwordInput.nextElementSibling;

          //display the validation failure message or delete all of the text if the input passed
          if (passwordInput.validity.valid === false) {
            const validationFailureMessage = this.#getValidationFailureMessage(
              "password",
              passwordInput.validity
            );
            validationFailureTextElement.textContent = validationFailureMessage;
          } else {
            validationFailureTextElement.textContent = "";
          }
        }
      },
      confirmPassword: () => {
        if (
          "password" in this.#refData.retrievedElementRefs &&
          "confirmPassword" in this.#refData.retrievedElementRefs
        ) {
          //only activates the functionality if a password and confirm password reference was successfully retrieved
          const passwordInput =
              this.#refData.retrievedElementRefs.password.querySelector(
                "input"
              ),
            confirmPasswordInput =
              this.#refData.retrievedElementRefs.confirmPassword.querySelector(
                "input"
              );

          //if the password field either doesn't possess a value within it or fails its own validation check,
          //keep the confirm password field disabled, otherwise enable the user to add info to such
          if (
            passwordInput.value === "" ||
            passwordInput.validity.valid === false
          ) {
            confirmPasswordInput.disabled = true;
            return;
          } else {
            confirmPasswordInput.disabled = false;
          }

          const validationFailureTextElement =
            confirmPasswordInput.nextElementSibling;

          //if the confirm password input value does not match the regular password input,
          //make it manually fail validation, change its validity state manually, and display
          //the corresponding message due to this specific failure. Otherwise pass the confirm password
          //field if it's the same value as the password field
          if (confirmPasswordInput.value !== passwordInput.value) {
            //have to use setCustomValidity with a non empty string to
            //toggle the property customError as a true value, otherwise,
            //that property is read only and I cant directly modify it
            if (!confirmPasswordInput.validity.customError) {
              confirmPasswordInput.setCustomValidity(
                "placeholder to toggle customError validity property"
              );
            }

            const validationFailureMessage = this.#getValidationFailureMessage(
              "confirmPassword",
              confirmPasswordInput.validity
            );

            validationFailureTextElement.textContent = validationFailureMessage;
          } else {
            if (confirmPasswordInput.validity.customError) {
              confirmPasswordInput.setCustomValidity("");
            }
            validationFailureTextElement.textContent = "";
          }
        }
      },
    },
    submit: {
      checkFormValidity: (event) => {
        //do one last check on the validity of individual input fields
        for (let functionality of Object.values(
          this.#eventFunctionalities.input
        )) {
          functionality();
        }

        //if a specific form control element fails to be valid, prevent the submission of the form
        for (let formControlElement of Object.values(
          this.#refData.retrievedElementRefs
        )) {
          const inputElement = formControlElement.querySelector("input");
          if (!inputElement.checkValidity()) {
            event.preventDefault();
          }
        }
      },
    },
  };

  #eventListenersInitializers = {
    input: (targetElement) => {
      //check that the argument supplied is an element to append the event listener to
      if (targetElement instanceof Element) {
        //append the event listener to the target that will read for input events
        targetElement.addEventListener("input", () => {
          this.#executeEventFunctionality("input");
        });
      } else {
        throw new Error(
          `ERROR: FAILED TO APPEND INPUT EVENT LISTENER TO TARGET ELEMENT : VALUE SUPPLIED FOR TARGET ELEMENT IS NOT AN ELEMENT : RECEIVED ${targetElement}`
        );
      }
    },
    submit: (targetElement) => {
      if (targetElement instanceof Element) {
        targetElement.addEventListener("submit", (e) => {
          this.#executeEventFunctionality("submit", e);
        });
      } else {
        throw new Error(
          `ERROR: FAILED TO APPEND SUBMIT EVENT LISTENER TO TARGET ELEMENT : VALUE SUPPLIED FOR TARGET ELEMENT IS NOT AN ELEMENT : RECEIVED ${targetElement}`
        );
      }
    },
  };

  #executeEventFunctionality(eventType, event) {
    const functionalities = this.#eventFunctionalities;

    if (
      eventType in functionalities &&
      Object.values(functionalities).length > 0
      //check for existing properties and methods before attempting to execute anything
    ) {
      //check if the event was supplied and execute the methods with the event supplied as the arg,
      //otherwise just execute the methods
      console.log("checking for input event");
      if (event) {
        //execute all methods found within the corresponding event type functionality
        for (let formControlMethod of Object.values(
          functionalities[eventType]
        )) {
          formControlMethod(event);
        }
      } else {
        //execute all methods found within the corresponding event type functionality
        for (let formControlMethod of Object.values(
          functionalities[eventType]
        )) {
          formControlMethod();
        }
      }
    } else {
      throw new Error(
        `ERROR: FAILED TO EXECUTE ALL FUNCTIONALITY ASSOCIATED WITH THE SUPPLIED EVENT TYPE : VALUE SUPPLIED FOR THE EVENT TYPE DOES NOT EXIST WITHIN THE FUNCTIONALITY OBJECT : RECEIVED ${eventType}`
      );
    }
  }

  #getValidationFailureMessage(formControlElementString, validityStateObj) {
    //checks for the existence of the corresponding form control element within validationFailureText,
    //as well as whether validityStateObj is in fact an object
    //Then it checks all properties within the validityStateObj and checks for any true boolean value on
    //the various validation failure properties, if this happens, return the corresponding text to represent
    //the validation failure message to the user
    if (
      formControlElementString in this.#validationFailureText &&
      typeof validityStateObj === "object"
    ) {
      switch (true) {
        case validityStateObj.valueMissing:
          return this.#validationFailureText[formControlElementString]
            .valueMissing;
        case validityStateObj.typeMismatch:
          return this.#validationFailureText[formControlElementString]
            .typeMismatch;
        case validityStateObj.tooLong:
          return this.#validationFailureText[formControlElementString].tooLong;
        case validityStateObj.tooShort:
          return this.#validationFailureText[formControlElementString].tooShort;
        case validityStateObj.rangeOverflow:
          return this.#validationFailureText[formControlElementString]
            .rangeOverflow;
        case validityStateObj.stepMismatch:
          return this.#validationFailureText[formControlElementString]
            .stepMismatch;
        case validityStateObj.patternMismatch:
          return this.#validationFailureText[formControlElementString]
            .patternMismatch;
        case validityStateObj.customError:
          return this.#validationFailureText[formControlElementString]
            .customError;
      }
    } else {
      throw new Error(
        `ERROR: FAILED TO RETRIEVE VALIDATION FAILURE MESSAGE DATA FOR THE CORRESPONDING : TARGET FORM CONTROL ELEMENT DOES NOT EXIST WITHIN THE '#validationFailureText' OBJECT : RECEIVED ${formControlElementString}`
      );
    }
  }

  init() {
    //get the refs of the form element and the corresponding form control elements being used in the supplied instance
    this.#fetchRequiredElementRefs();
    //initialize the event listener that is already configured to the necessary functionality for input events in the context of the form, and append it to the form tag itself,
    //this way the event functionality uses event bubbling to facilitate the functionality attached to the specific event type.
    this.#eventListenersInitializers.input(
      this.#refData.retrievedElementRefs["formElement"]
    );
    console.log(this.#refData.retrievedElementRefs["formElement"]);
    this.#eventListenersInitializers.submit(
      this.#refData.retrievedElementRefs["formElement"]
    );
  }
}

class ElementRefManager {
  //holds unique key value pairs representing specific form element references
  #refCache = new Map();

  addRef(key, element) {
    if (
      typeof key === "string" &&
      !this.#refCache.has(key) &&
      element instanceof Element
    ) {
      //adds a key value pair representing an element ref within the class cache if the arguments follow these requirements:
      //the supplied key is a string, the ref cache doesn't already have a key value pair with said key, and the value is an element
      this.#refCache.set(key, element);
    } else {
      throw new Error(
        `ERROR: FAILED TO ADD KEY VALUE PAIR FOR AN ELEMENT REFERENCE TO REFERENCE CACHE : ARGUMENTS FAILED TO MEET REQUIREMENTS TO BE VALID : RECEIVED ${key} AS THE KEY AND ${element} AS THE ELEMENT`
      );
    }
  }

  removeRef(key) {
    if (this.#refCache.has(key)) {
      //removes the key value pair if the target key exists within the ref cache
      this.#refCache.delete(key);
    } else {
      throw new Error(
        `ERROR: FAILED TO DELETE KEY VALUE PAIR FOR AN ELEMENT REFERENCE IN REFERENCE CACHE : TARGET KEY DOES NOT EXIST : RECEIVED ${key}`
      );
    }
  }

  retrieveRef(key) {
    if (this.#refCache.has(key)) {
      //retrieves the reference value if the target key has been declared within the ref cache
      const retrievedRef = this.#refCache.get(key);
      return retrievedRef;
    } else {
      //will return null if the specific reference couldn't be retrieved, as opposed to throwing an error as I do not want the thread of execution stopping here
      //which making this method this way opens more possibilities in terms of what can be done whenever another class uses this class instance
      return null;
    }
  }
}

class FormConstructor {
  constructor(
    formControlElementArr,
    action,
    method,
    submitButtonText,
    elementRefManager
  ) {
    if (elementRefManager instanceof ElementRefManager) {
      this.#helperClasses.elementRefManager = elementRefManager; //add the element ref manager class instance to the state of the class
    }

    //add necessary properties supplied by the constructor argument to the configuration data of this class
    //This will make the class create the form desired based on the supplied configuration so to speak
    if (
      Array.isArray(formControlElementArr) &&
      formControlElementArr.length > 0
    ) {
      this.#configData.formControlElementArr = formControlElementArr;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'formControlElementArr' MUST BE AN ARRAY AND CONTAIN ELEMENTS : RECEIVED ${formControlElementArr}`
      );
    }

    if (typeof action === "string") {
      this.#configData.action = action;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'action' MUST BE A STRING : RECEIVED ${action}`
      );
    }

    if (typeof method === "string") {
      this.#configData.method = method;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'method' MUST BE A STRING : RECEIVED ${method}`
      );
    }

    if (typeof submitButtonText === "string") {
      this.#configData.submitButtonText = submitButtonText;
    }
  }

  //configuration data that the builder methods reference when executing
  #configData = {
    formControlElementArr: null,
    action: null,
    method: null,
    submitButtonText: "Submit",
  };

  //contains references to class instances that will help this class
  //facilitate its functionality in some way
  #helperClasses = {
    elementRefManager: null,
  };

  //contains predefined templates in order to make the creation of specific form control
  //elements straight forward through the script, as well as easy to maintain and add more
  //templates
  #formControlElementTemplates = {
    email: `
    <div class="email-input-container">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
        <div class="email-validation-failure"></div>
    </div>
    `,
    zipCode: `
    <div class="zipcode-input-container">
        <label for="zipcode">ZIP Code</label>
        <input type="text" id="zipcode" name="zipcode" pattern="[0-9]{5}" inputmode="numeric" minlength="5" maxlength="5" required>
        <div class="zipcode-validation-failure"></div>
    </div>
    `,
    password: ` 
    <div class="password-input-container">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" pattern="^[^\\s]*$" required>
        <div class="password-validation-failure"></div>
    </div>
    `,
    confirmPassword: `
    <div class="confirm-password-input-container">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirmPassword" disabled="true" required>
        <div class="confirm-password-validation-failure"></div>
    </div>
    `,
  };

  //holds methods that are capable of building all of the necessary elements
  //within a form, which can be configured to include specific form control elements
  //of choice
  #elementBuilders = {
    form: (action, method) => {
      const formElement = document.createElement("form"); //create the form tag itself

      formElement.classList.add(`form-element`); //add a base class

      //add important specific to form elements as listed below, or use default values if they aren't supplied
      if (typeof action === "string") {
        formElement.setAttribute("action", action);
      } else {
        formElement.setAttribute("action", "#");
      }

      if (typeof method === "string") {
        formElement.setAttribute("method", method);
      } else {
        formElement.setAttribute("method", "get");
      }

      formElement.setAttribute("novalidate", "");

      //stores it as a reference in the ref manager if such is being used
      //Defines explicitly the key of the pair since its not pulled from a template name
      //rather its created explicitly itself
      if (this.#helperClasses.elementRefManager !== null) {
        this.#helperClasses.elementRefManager.addRef(
          "formElement",
          formElement
        );
      }

      return formElement;
    },
    formControl: (formControlElement) => {
      if (formControlElement in this.#formControlElementTemplates) {
        //create the corresponding form control element fragment if an existing template is found
        const range = document.createRange(),
          elementFrag = range.createContextualFragment(
            this.#formControlElementTemplates[formControlElement]
          ),
          containerRef = elementFrag.firstElementChild;

        //stores it as a reference in the ref manager if such is being used
        //Uses the ref of the container element in the value of the saved key value pair
        if (this.#helperClasses.elementRefManager !== null) {
          this.#helperClasses.elementRefManager.addRef(
            formControlElement,
            containerRef
          );
        }

        return containerRef;
      } else {
        throw new Error(
          `ERROR: COULD NOT CONSTRUCT FORM CONTROL ELEMENT : SUPPLIED FORM CONTROL ELEMENT NOT FOUND WITHIN TEMPLATE DATA : RECEIVED ${formControlElement}`
        );
      }
    },
    submitButton: () => {
      const submitButton = document.createElement("button");
      return submitButton;
    },
  };

  #buildCompleteFormElement(formControlElementArr, action, method) {
    //create the form element and the submit button element as they are mandatory
    //features when creating a form
    const formElement = this.#elementBuilders.form(action, method),
      submitButtonElement = this.#elementBuilders.submitButton();

    //adds text to submit button
    submitButtonElement.textContent = this.#configData.submitButtonText;

    //iterate over the existing form control elements and create them based on existing templates
    for (let formControlElement of formControlElementArr) {
      //if the current form control element listed in the config array exists within the templates, create it and append it to the form element
      if (formControlElement in this.#formControlElementTemplates) {
        const builtformControlElement =
          this.#elementBuilders.formControl(formControlElement);

        formElement.append(builtformControlElement);
      }
    }

    formElement.append(submitButtonElement);

    //return complete form
    return formElement;
  }

  //single api to return the corresponding form element based on the supplied arguments to the class constructor
  init() {
    const { formControlElementArr, action, method } = this.#configData,
      assembledFormElement = this.#buildCompleteFormElement(
        formControlElementArr,
        action,
        method
      );

    return assembledFormElement;
  }
}

export class Form {
  //creates unique class instances of all the sub classes, which
  //may or may not use the supplied configuration from this main constructor
  constructor(formControlElementArr, action, method, submitButtonText) {
    this.#subClasses.elementRefManager = new ElementRefManager();
    this.#subClasses.formConstructor = new FormConstructor(
      formControlElementArr,
      action,
      method,
      submitButtonText,
      this.#subClasses.elementRefManager
    );
    this.#subClasses.formValidator = new FormValidator(
      formControlElementArr,
      this.#subClasses.elementRefManager
    );
  }

  //holds values of specific sub class references
  #subClasses = {
    elementRefManager: null,
    formConstructor: null,
    formValidator: null,
  };

  appendForm(parentElement) {
    if (parentElement instanceof Element) {
      //checks that the supplied parent element is actually an element so the form can be appended to it

      const formElement = this.#subClasses.formConstructor.init(); //creates the entire form fragment with all necessary children within it

      this.#subClasses.formValidator.init(); //initializes the form validation feature of the form which uses the constraint api

      parentElement.append(formElement); //append the form to a target parent element
    } else {
      throw new Error(
        `ERROR: COULD NOT APPEND FORM TO TARGET ELEMENT : VALUE SUPPLIED AS THE PARENT ELEMENT IS NOT AN ELEMENT : RECEIVED ${parentElement}`
      );
    }
  }
}
