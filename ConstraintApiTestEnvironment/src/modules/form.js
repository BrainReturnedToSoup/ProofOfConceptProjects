class FormValidator {
  constructor(formControlElementArr, elementRefManager) {
    if (
      elementRefCache instanceof ElementRefManager &&
      Array.isArray(formControlElementArr) &&
      formControlElementArr.length > 0
    ) {
      //pass args into state
    } else {
      throw new Error(``);
    }
  }

  #configData = {
    retrievedElementRefs: {},
    formControlElements: null,
  };

  #helperClasses = {
    elementRefManager: null,
  };

  checkInputValidity(inputElement, formControlElement) {
    //takes an input element reference, and the corresponding form control element it represents
  }

  #eventFunctionalities = {
    input: {
      email: (event) => {},
      zipCode: (event) => {},
      password: (event) => {
        //check for the existence of a confirm password field, if the field is present and already possesses
        //a value for its input, disable the ability to interact with the regular password field
        if (this.#stateData.formControlElements.includes("password")) {
          const passwordInput =
            this.#stateData.elementRefs.password.querySelector("input");

          if (this.#stateData.formControlElements.includes("confirmPassword")) {
            const confirmPasswordInput =
              this.#stateData.elementRefs.confirmPassword.querySelector(
                "input"
              );

            //block the regular password field from being editted if
            //the confirm password field has data within it,
            if (confirmPasswordInput.value !== "") {
              passwordInput.disabled = true;
              return;
            } else {
              passwordInput.disabled = false;
            }
          }

          //get some data about the validity of the specific input, if it fails
          //the validation, then the return on this method will also include a
          //validity message pertaining to the input specs
          const passwordValidationData = this.#constraintApi.checkInputValidity(
              passwordInput,
              "password"
            ),
            validationFailureElement = passwordInput.nextElementSibling;

          //if it's not valid, display the message, if it's otherwise valid, remove any text from within the element
          if (passwordValidationData.valid === false) {
            validationFailureElement.textContent = validationData.message;
          } else {
            validationFailureElement.textContent = "";
          }
        }
      },
      confirmPassword: (event) => {
        //check for the existence of a confirm password field, if the field is present and already possesses
        //a value for its input, disable the ability to interact with the regular password field
        if (this.#stateData.formControlElements.includes("password")) {
          const passwordInput =
            this.#stateData.elementRefs.password.querySelector("input");

          if (this.#stateData.formControlElements.includes("confirmPassword")) {
            const confirmPasswordInput =
                this.#stateData.elementRefs.confirmPassword.querySelector(
                  "input"
                ),
              passwordValidationData = this.#constraintApi.checkInputValidity(
                passwordInput,
                "password"
              );

            //check if the password field has some sort of value and passes
            //its own input validation before enabling the ability to
            //confirm the password
            if (
              passwordInput.value === "" ||
              passwordValidationData.valid === false
            ) {
              confirmPasswordInput.disabled = true;
              return;
            } else {
              confirmPasswordInput.disabled = false;
            }
          }

          //logic for comparing the value between the password and confirm password fields go here
        }
      },
    },
  };

  #eventListeners = {
    input: (targetElement) => {
      //check that the target is an element t least, the functionality
      //method key is a string, and that it is an existing property
      //within the functionality object
      if (
        targetElement instanceof Element &&
        typeof functionalityMethodKey === "string" &&
        functionalityMethodKey in this.#constraintApi.functionality
      ) {
        //append the event listener to the target that will read for input events
        targetElement.addEventListener("input", (e) => {
          this.#constraintApi.eventListening.parseEventTypeFunctionality(
            "input",
            e
          );
        });
      } else {
        throw new Error(
          `ERROR: FAILED TO APPEND INPUT EVENT LISTENER TO TARGET ELEMENT : VALUE SUPPLIED FOR TARGET ELEMENT IS NOT AN ELEMENT : RECEIVED ${targetElement} : Stack Trace: ${error.stack}`
        );
      }
    },
  };

  #executeEventFunctionality(eventType, event) {
    const functionality = this.#constraintApi.functionality;

    if (
      eventType in functionality &&
      Object.values(functionality).length > 0
      //check for existing properties and methods before attempting to execute anything
    ) {
      //execute all methods found within the corresponding event type functionality
      for (let formControlMethod of functionality[eventType]) {
        formControlMethod(event);
      }
    } else {
      throw new Error(
        `ERROR: FAILED TO EXECUTE ALL FUNCTIONALITY ASSOCIATED WITH THE SUPPLIED EVENT TYPE : VALUE SUPPLIED FOR THE EVENT TYPE DOES NOT EXIST WITHIN THE FUNCTIONALITY OBJECT : RECEIVED ${eventType} : Stack Trace: ${error.stack}`
      );
    }
  }
}

class ElementRefManager {
  #cache = new Map();

  addRef(key, element) {
    if (typeof key === "string" && element instanceof Element) {
    }
  }

  removeRef(key) {}

  retrieveRef(key) {}
}

class FormConstructor {
  constructor(formControlElementArr, action, method, elementRefManager) {
    //stores the valid supplied arguments in the state data, and throw error for invalid supplied arguments
    if (elementRefManager instanceof ElementRefManager) {
      this.#helperClasses.elementRefManager = elementRefManager;
    }

    if (
      Array.isArray(formControlElementArr) &&
      formControlElementArr.length > 0
    ) {
      this.#configData.formControlElementArr = formControlElementArr;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'formControlElementArr' MUST BE AN ARRAY AND CONTAIN ELEMENTS : RECEIVED ${formControlElementArr} : Stack Trace: ${error.stack}`
      );
    }

    if (typeof action === "string") {
      this.#configData.action = action;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'action' MUST BE A STRING : RECEIVED ${action} : Stack Trace: ${error.stack}`
      );
    }

    if (typeof method === "string") {
      this.#configData.method = method;
    } else {
      throw new Error(
        `ERROR: FAILED TO APPLY ARGUMENT TO '${this.constructor.name}' CLASS STATE : SUPPLIED ARGUMENT 'method' MUST BE A STRING : RECEIVED ${method} : Stack Trace: ${error.stack}`
      );
    }
  }

  //holds important data that is used by the builder methods to create the desired form element
  #configData = {
    formControlElementArr: null,
    action: null,
    method: null,
  };

  #helperClasses = {
    elementRefManager: null,
  };

  #formControlElementTemplates = {
    email: `
    <div class="email-input-container">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
        <div class="email-validation-failure"></div>
    </div>
    `,
    zipCode: `
    <div class="zipcode-input-container">
        <label for="email">Zip Code</label>
        <input type="text" id="zipcode" name="zipcode" pattern="[0-9]{5}">
        <div class="zipcode-validation-failure"></div>
    </div>
    `,
    password: ` 
    <div class="password-input-container">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <div class="password-validation-failure"></div>
    </div>
    `,
    confirmPassword: `
    <div class="confirm-password-input-container">
        <label for="confirm-password">Confirm Password</label>
        <input type="password" id="confirm-password" name="confirmPassword" disabled="true">
        <div class="confirm-password-validation-failure"></div>
    </div>
    `,
  };

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

      return formElement;
    },
    formControl: (formControlElement) => {
      if (formControlElement in this.#formControlElementTemplates) {
        //create the corresponding form control element fragment
        const range = document.createRange(),
          elementFrag = range.createContextualFragment(
            this.#formControlElementTemplates[formControlElement]
          ),
          containerRef = elementFrag.firstElementChild;

        //add the container to element reference cache based on the created form control element
        this.#stateData.elementRefs[formControlElement] = containerRef;

        return containerRef;
      } else {
        throw new Error(
          `ERROR: COULD NOT CONSTRUCT FORM CONTROL ELEMENT : SUPPLIED FORM CONTROL ELEMENT NOT FOUND : RECEIVED ${formControlElement} : Stack Trace: ${error.stack}`
        );
      }
    },
  };

  #buildCompleteFormElement(formControlElementArr, action, method) {
    //create the form element and the submit button element as they are mandatory
    //features when creating a form
    const formElement = this.#elementBuilders.form(action, method),
      submitButtonElement = document.createElement("button");

    //iterate over the existing form control elements and create them based on existing templates
    for (let formControlElement of formControlElementArr) {
      //if the current form control element listed in the config array exists within the templates, create it and append it to the form element
      if (formControlElement in this.#formControlElementTemplates) {
        const formControlElement =
          this.#elementBuilders.formControl(formControlElement);

        formElement.append(formControlElement);
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
  constructor(formControlElementArr, action, method) {
    this.#subClasses.elementRefManager = new ElementRefManager();
    this.#subClasses.formConstructor = new FormConstructor(
      formControlElementArr,
      action,
      method,
      this.#subClasses.elementRefManager
    );
    this.#subClasses.formValidator = new FormValidator(
      formControlElementArr,
      this.#subClasses.elementRefManager
    );
  }

  #subClasses = {
    elementRefManager: null,
    formConstructor: null,
    formValidator: null,
  };

  init(parentElement) {
    if (parentElement instanceof Element) {
      const formElement = this.#subClasses.formConstructor.init();

      this.#subClasses.formValidator.init();

      parentElement.append(formElement); //append the form to a target parent element
    } else {
      throw new Error(
        `ERROR: COULD NOT APPEND FORM TO TARGET ELEMENT : VALUE SUPPLIED AS THE PARENT ELEMENT IS NOT AN ELEMENT : RECEIVED ${parentElement} : Stack Trace: ${error.stack}`
      );
    }
  }
}
