import { config } from "webpack";

export function UserInfoFormModule() {
  const defaultValues = {
    formControlText: {
      email: {
        labelText: "Email",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered not a valid email address",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter a valid email address",
        },
      },

      confirmEmail: {
        labelText: "Confirm Email",
        instructionsText: "",
        errorBoxText: {
          patternMismatch:
            "Value entered does not match the previous email address",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter the same email address",
        },
      },

      address: {
        labelText: "Address",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid street address",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter a valid street address",
        },
      },

      stateOrProvince: {
        labelText: "State/Province",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid state or province",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter a valid state or province",
        },
      },

      country: {
        labelText: "Country",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid country",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter a valid country",
        },
      },

      postalCode: {
        labelText: "Postal Code",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid postal code",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort:
            "Value entered fails to meet minimum character count required",
          valueMissing: "Please enter a valid postal code",
        },
      },

      password: {
        labelText: "Password",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid password",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid password",
        },
      },

      confirmPassword: {
        labelText: "Confirm Password",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered not equal to password",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter the same password",
        },
      },

      dateOfBirth: {
        labelText: "Date Of Birth",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid birth date",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid birth date",
        },
      },

      phoneNumber: {
        labelText: "Phone Number",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid phone number",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid phone number",
        },
      },

      creditCardType: {
        labelText: "",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid card type",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid card type",
        },
      },

      creditCardNumber: {
        labelText: "Card Number",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid credit card number",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid credit card number",
        },
      },

      creditCardExpDate: {
        labelText: "Expiration Date",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid expiration date",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid expiration date",
        },
      },

      creditCardSecurityNumber: {
        labelText: "CVV",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid security number",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid security number",
        },
      },

      subjectLine: {
        labelText: "Subject",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid subject line",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter a valid subject line",
        },
      },

      textBox: {
        labelText: "",
        instructionsText: "",
        errorBoxText: {
          patternMismatch: "Value entered is not a valid within this text box",
          tooLong: "Value entered exceeds the maximum character count",
          tooShort: "Value entered fails to meet minimum character count",
          valueMissing: "Please enter valid information within this text box",
        },
      },
    },
    formControlAttributes: {},
    formControlElements: [],
    functionalityRules: {},
    thirdPartyApiRules: {},
  };

  const formTemplates = {
    newAccountBasic: {},
    newAccountFull: {},
    paymentBasic: {},
    paymentFull: {},
    login: {},
    passwordReset: {},
    subscriptionBasic: {},
    contactBasic: {},
  };

  function addPreset(presetsObj) {}

  const uniqueInstances = [];

  class FormFragmentConstructor {
    constructor(configObj, elementCache) {
      //optional, since element caching wouldn't be used in the case of not using the constraint API and third party API's
      if (elementCache) {
        this.#elementCache = elementCache;
      }

      if (typeof configObj === "object") {
        this.#applyConfigToState(configObj);
        this.assembledForm = this.#buildCompleteForm(); //returns entire form fragment with all of the necessary form control elements within it
      } else {
        throw new Error(
          `FATAL ERROR: within the scope of 'constructor' of class instance '${this.constructor.name}' : form fragment cannot be created, supplied config is not the correct data type, must be an object containing all of the necessary properties and references, received ${configObj}`
        );
      }
    }

    //apply relevant data that exists within the config object to this class state, so that the corresponding form matching the config is created
    #config = {
      formControlText: null,
      formAttributes: null, //keys should be the corresponding form control element name that matches the method for the constructor
      formControlElements: null, //elements should be the corresponding form control element name that matches the method for the constructor
      formControlAttributes: null, //keys should be the corresponding form control element name that matches the method for the constructor
      useConstraintAPI: true,
      uniqueIdentifier: "NOT-SET",
    };

    #elementCache = null;

    #applyConfigToState(configObj) {
      //applies all of the relevant properties within the config to the state cache
      for (let property in this.#config) {
        if (configObj[property]) {
          this.#config[property] = configObj[property];
        } else {
          throw new Error(
            `FATAL ERROR: within scope of '#applyConfigToState' of class instance '${this.constructor.name}' : essential property missing from the final configuration object supplied, lacks ${property}, cannot create form fragment, check the default and or template configuration data if applicable`
          );
        }
      }
    }

    //produces the entire form as a fragment
    #buildCompleteForm() {
      const formElement = this.#buildFormElement();

      //create all of the corresponding form elements that are listed in the formControlElements array
      if (Array.isArray(this.#config.formControlElements)) {
        for (let formControlElement of this.#config.formControlElements) {
          const formControlFrag =
            this.#formControlFragBuilder(formControlElement); //invokes the corresponding method based on the current form control element
          formElement.append(formControlFrag);
        }

        return formElement;
      } else {
        throw new Error(
          `FATAL ERROR: within scope of '#initializeFormCreation' of class instance '${this.constructor.name}' : essential property 'this.#config.formControlElement' is not the correct data type, should be an array full of strings containing individual form control element references, check the default and or template configuration data if applicable`
        );
      }
    }

    //for creating and assembling a complete input field fragment
    #formControlFragBuilder = (formControlElement) => {
      //holds all of the element pieces to make a complete form control element, the dataList property is null since the data list
      //is situational
      const components = {
        mainShell:
          this.#formControlElementComponents.mainShell(formControlElement),
        label: this.#formControlElementComponents.label(formControlElement),
        input: this.#formControlElementComponents.input(formControlElement),
        dataList: null,
        instructions:
          this.#formControlElementComponents.instructions(formControlElement),
        errorFrag:
          this.#formControlElementComponents.errorTextFrag(formControlElement),
      };

      //checks for its existence as an attribute and checks its boolean value
      if (
        "dataList" in this.#config.formAttributes[formControlElement] &&
        this.#config.formAttributes[formControlElement].dataList === true
      ) {
        components.dataList =
          this.#formControlElementComponents.dataList(formControlElement);
      }

      //assemble the entire piece
      for (let component in components) {
        if (component !== "mainShell" && components[component] !== null) {
          components.mainShell.append(components[component]);
        }
      }

      return components.mainShell;
    };

    //for the <form> tag creation
    #buildFormElement() {
      const formElement = document.createElement("form"),
        {
          action,
          method,
          target,
          enctype,
          "aria-label": ariaLabel,
          "aria-labelledby": ariaLabelledBy,
          "aria-describedby": ariaDescribedBy,
        } = this.#config.formAttributes;

      formElement.classList.add("Form-Element"); //add the general identifier as the first tag for all form elements and associated elements

      //these conditions below check for the existence of mandatory properties, as well as their value data types
      if (typeof action === "string") {
        formElement.setAttribute("action", action);
      } else {
        throw new Error(
          `FATAL ERROR: within scope of '#buildFormElement' of class instance '${this.constructor.name}' : essential property 'this.#config.formAttributes.action' either does not exist or its value is an incorrect data type, must be a string, received ${action}, Stack Trace: ${error.stack}`
        );
      }

      if (typeof method === "string") {
        formElement.setAttribute("method", method);
      } else {
        throw new Error(
          `FATAL ERROR: within scope of '#buildFormElement' of class instance '${this.constructor.name}' : essential property 'this.#config.formAttributes.method' either does not exist or its value is an incorrect data type, must be a string, received ${method}, Stack Trace: ${error.stack}`
        );
      }

      //these conditions below check for the existence of optional properties, as well as their value data types in the case they are used
      if (typeof target === "string") {
        formElement.setAttribute("target", target);
      } else if (target && typeof target !== "string") {
        throw new Error(
          `MINOR ERROR: within the scope of '#buildFormElement" of class instance '${this.constructor.name}' : optional property 'this.#config.formAttributes.target' was declared, but cannot be applied to the form as its value is the wrong data type, must be a string, received ${target}, Stack Trace: ${error.stack}`
        );
      }

      if (typeof enctype === "string") {
        formElement.setAttribute("enctype", enctype);
      } else if (enctype && typeof enctype !== "string") {
        throw new Error(
          `MINOR ERROR: within the scope of '#buildFormElement" of class instance '${this.constructor.name}' : optional property 'this.#config.formAttributes.enctype' was declared, but cannot be applied to the form as its value is the wrong data type, must be a string, received ${enctype}, Stack Trace: ${error.stack}`
        );
      }

      if (typeof ariaLabel === "string") {
        formElement.setAttribute("aria-label", ariaLabel);
      } else if (ariaLabel && typeof ariaLabel !== "string") {
        throw new Error(
          `MINOR ERROR: within the scope of '#buildFormElement' of class instance '${this.constructor.name}' : optional property 'this.#config.formAttributes['aria-label']' was declared, but cannot be applied to the form as its value is the wrong data type, must be a string, received ${ariaLabel}, Stack Trace: ${error.stack} `
        );
      }

      if (typeof ariaLabelledBy === "string") {
        formElement.setAttribute("aria-labelledby", ariaLabelledBy);
      } else if (ariaLabelledBy && typeof ariaLabelledBy !== "string") {
        throw new Error(
          `MINOR ERROR: within the scope of '#buildFormElement' of class instance '${this.constructor.name}' : optional property 'this.#config.formAttributes['aria-labelledby']' was declared, but cannot be applied to the form as its value is the wrong data type, must be a string, received ${ariaLabelledBy}, Stack Trace: ${error.stack}`
        );
      }

      if (typeof ariaDescribedBy === "string") {
        formElement.setAttribute("aria-describedby", ariaDescribedBy);
      } else if (ariaDescribedBy && typeof ariaDescribedBy !== "string") {
        throw new Error(
          `MINOR ERROR: within the scope of '#buildFormElement' of class instance '${this.constructor.name}' : optional property 'this.#config.formAttributes['aria-describedby']' was declared, but cannot be applied to the form as its value is the wrong data type, must be a string, received ${ariaDescribedBy}, Stack Trace: ${error.stack}`
        );
      }

      if ("novalidate" in this.#config.formAttributes) {
        formElement.setAttribute("novalidate", "");
      }

      this.#addUniqueIdentifier(formElement);

      return formElement;
    }

    //<div class="Form-Control-Container">
    //  <label></label>
    //  *<input></input>
    //  *<div class="Form-Control-Instructions"></div>
    //  *<div class="Form-Control-Error-Text-Container">
    //
    //   </div>
    //</div>

    //methods for creating the corresponding form control element with all of the necessary properties applied to such
    //these will create entire fragments, and then return the fragments

    //contains all of the necessary methods for creating each individual template element to make up a specific input field on the form
    #formControlElementComponents = {
      mainShell: (formControlElement) => {
        //<div class="Form-Control-Container-formControlElement uniqueIdentifier"></div>
        const formControlContainer = document.createElement("div");

        //general class tag
        formControlContainer.classList.add(
          `Form-Control-Container-${formControlElement}`
        );

        this.#addUniqueIdentifier(formControlContainer);

        if (this.#elementCache && this.#elementCache !== null) {
          this.#elementCache.addElement(
            `Form-Control-Container-${formControlElement}`,
            formControlContainer
          );
        }

        return formControlContainer;
      },
      label: (formControlElement) => {
        //<label class="Form-Control-Label-formControlElement uniqueIdentifier" for="Form-Control-formControlElement_uniqueIdentifier">labelText</label>
        if (
          "labelText" in this.#config.formControlText[formControlElement] &&
          typeof this.#config.formControlText[formControlElement].labelText ===
            "string" &&
          this.#config.formControlText[formControlElement].labelText ===
            this.#config.formControlText[formControlElement].labelText.replace(
              / /g,
              ""
            ) &&
          this.#config.formControlText[formControlElement].labelText !== ""
          //checks for the corresponding property, whether its a string, and whether its an empty string or not
          //These need to exist in order to create a label, otherwise there is no point to creating the label
        ) {
          const formControlLabel = document.createElement("label");

          //general class tag
          formControlLabel.classList.add(
            `Form-Control-Label-${formControlElement}`
          );

          //if a for attribute was explicitly set in the config, use that, otherwise set its default value
          if ("for" in this.#config.formControlAttributes[formControlElement]) {
            formControlLabel.setAttribute(
              "for",
              this.#config.formControlAttributes[formControlElement]["for"]
            );
          } else {
            formControlLabel.setAttribute(
              "for",
              `Form-Control-${formControlElement}_${
                this.#config.uniqueIdentifier
              }`
            );
          }

          //defines the text of the label
          formControlLabel.innerText =
            this.#config.fragmentTextData[formControlElement].labelText;

          this.#addUniqueIdentifier(formControlLabel);

          if (this.#elementCache) {
            this.#elementCache.addElement(
              `Form-Control-Label-${formControlElement}`,
              formControlLabel
            );
          }

          return formControlLabel;
        } else {
          return null;
        }
      },
      instructions: (formControlElement) => {
        //<div class="Form-Control-Instructions-formControlElement uniqueIdentifier">instructionsText</div>
        if (
          this.#config.useConstraintAPI &&
          "instructionsText" in
            this.#config.fragmentTextData[formControlElement] &&
          typeof this.#config.fragmentTextData[formControlElement]
            .instructionsText === "string" &&
          this.#config.fragmentTextData[formControlElement].instructionsText ===
            this.#config.fragmentTextData[
              formControlElement
            ].instructionsText.replace(/ /g, "")
          //checks to see if the constraint API is going to be used on this form, whether the instructions property exists, whether its a string, and whether its not an empty string
        ) {
          const formControlInstructions = document.createElement("div");

          //general class tag
          formControlInstructions.classList.add(
            `Form-Control-Instructions-${formControlElement}`
          );

          //defines the inner text of the element representing the instructions
          formControlInstructions.innerText =
            this.#config.fragmentTextData[formControlElement].instructionsText;

          this.#addUniqueIdentifier(formControlInstructions);

          if (this.#elementCache && this.#elementCache !== null) {
            this.#elementCache.addElement(
              `Form-Control-Instructions-${formControlElement}`,
              formControlInstructions
            );
          }

          return formControlInstructions;
        } else {
          return null;
        }
      },
      validationFailure: (formControlElement) => {
        if (
          this.#config.useConstraintAPI &&
          formControlElement in this.#config.formControlText &&
          "validationFailure" in
            this.#config.formControlText[formControlElement] &&
          typeof this.#config.formControlText[formControlElement]
            .errorBoxText === "object" &&
          Object.keys(
            this.#config.formControlText[formControlElement].errorBoxText
          ).length > 0
          //checks for use of the constraint api, the existence of the text properties for the specific form control element,
          //whether the text properties includes error text, and whether their are individual error text properties within the parent property
        ) {
          const errorBox = document.createElement("div");

          errorBox.classList.add(
            `Form-Control-Error-Box-${formControlElement}`
          );

          this.#addUniqueIdentifier(errorBox);

          if (this.#elementCache) {
            this.#elementCache.addElement(
              `Form-Control-Error-Box-${formControlElement}`
            );
          }

          return errorBox;
        } else {
          return null;
        }
      },
      input: (formControlElement) => {
        if (formControlElement in this.#config.formControlAttributes) {
          //if the data for the attributes of said specific form control exists, apply the built in default values and mandatory values,
          const input = document.createElement("input");

          input.classList.add(`Form-Control-${formControlElement}`);

          //sets default id value
          input.setAttribute(
            "id",
            `Form-Control-${formControlElement}_${
              this.#config.uniqueIdentifier
            }`
          );

          //sets default name attribute value
          input.setAttribute(
            "name",
            `Form-Control-${formControlElement}_${
              this.#config.uniqueIdentifier
            }_Var`
          );

          //iterates through all of the attributes for the specific form control, applies/overrides attributes that are references within the config,
          //will ignore the for attribute, but will check to see if a datalist was defined as an attribute and add the necessary properties
          for (let attribute in this.#config.formControlAttributes[
            formControlElement
          ]) {
            //if its an inline attribute for the input tag
            if (attribute !== "for" && attribute !== "dataList") {
              input.setAttribute(
                attribute,
                this.#config.formControlAttributes[formControlElement][
                  attribute
                ]
              );
            } else if (
              //a unique attribute for instances of using a datalist for the input, this just
              //adds the necessary attributes to the input tag such as the list attribute to link
              //it to the datalist
              attribute === "dataList" &&
              this.#config.formControlAttributes[formControlElement]
                .dataList === true
            ) {
              input.setAttribute(
                "list",
                `Form-Control-Data-List-${formControlElement}_${
                  this.#config.uniqueIdentifier
                }`
              );
            } else if (attribute === null) {
              //sets purely inline attributes to the input
              input.setAttribute(attribute, "");
            }
          }

          this.#addUniqueIdentifier(input);

          if (this.#elementCache) {
            this.#elementCache.addElement(
              `Form-Control-${formControlElement}`,
              input
            );
          }

          return input;
        } else {
          throw new Error(
            `FATAL ERROR: within the scope 'input' of class instance '${this.constructor.name}' : input element of a specific type of form control, that being ${formControlElement}, could not be created, as there lacks a reference for its own attributes within 'this.#config.formAttributes', Stack Trace: ${error.stack} `
          );
        }
      },
      //needs to be used in conjunction with an input tag, and match the id value of such
      dataList: (formControlElement) => {
        if (
          "dataList" in
            this.#config.formControlAttributes[formControlElement] &&
          this.#config.formControlAttributes[formControlElement].dataList ===
            true
        ) {
          const dataList = document.createElement("datalist");

          //general class tag
          dataList.classList.add(
            `Form-Control-Data-List-${formControlElement}`
          );

          //default id
          dataList.setAttribute(
            "id",
            `Form-Control-Data-List-${formControlElement}_${
              this.#config.uniqueIdentifier
            }`
          );

          //apply title property if present
          if (
            "title" in this.#config.formControlAttributes[formControlElement] &&
            typeof this.#config.formControlAttributes[formControlElement]
              .title === "string"
          ) {
            dataList.setAttribute(
              "title",
              this.#config.formControlAttributes[formControlElement].title
            );
          }

          this.#addUniqueIdentifier(dataList);

          if (this.#elementCache) {
            this.#elementCache.addElement(
              `Form-Control-Data-List-${formControlElement}`,
              dataList
            );
          }

          return dataList;
        } else {
          return null;
        }
      },
    };

    //every created element will have the defined unique identifier attached to its class
    #addUniqueIdentifier(element) {
      const uniqueIdentifier = this.#config.uniqueIdentifier;

      if (
        element.nodeType === Node.ELEMENT_NODE ||
        element.nodeType === Node.DOCUMENT_FRAGMENT_NODE
      ) {
        const allElements = element.querySelectorAll("*");

        //makes sure to apply the unique identifier to the element and all of its descendants
        allElements.forEach((currElement) => {
          currElement.classList.contains(uniqueIdentifier)
            ? null
            : currElement.classList.add(uniqueIdentifier);
        });
      } else {
        throw new Error(
          `FATAL ERROR: within '#addUniqueIdentifier' of class instance '${this.constructor.name}' : supplied argument fails to meet processing requirements, must be either an element or a fragment that contains elements and there must be a unique identifier to use, received ${element} as the received element and ${uniqueIdentifier} as the unique identifier, Stack Trace: ${error.stack}`
        );
      }
    }
  }

  class DynamicOptionsManager {
    //a mixture between the form fragment constructor and the main functionality manager as it will
    //create and render specific input elements such as options for data lists dynamically, this will be used
    //in instances such as rendering in options based on the data set being dynamic, such as countries, or card payment
    //types, as well as render in options based on already selected options, such as relevant states to the selected country.
    //This class will use various geocoding API's in order to facilitate this dynamic rendering
  }

  class ElementCacheManager {
    #refsCache = new Map();
    //will be used to manage all element references created in the form instance, this way it makes it easier to target specific elements based
    //on the situation automatically, also it prevents multiple queries of the same elements.
    //Thinking about adding an API that allows this class to emit all of it's references to a global DOM refs cache.
    addElement(key, element) {
      //has to be an element of course
      if (element.nodeType === Node.ELEMENT_NODE) {
        if (!this.#refsCache.has(key)) {
          this.#refsCache.set(key, element);
        } else if (this.#refsCache.has(key)) {
          //if the corresponding key already has been used, meaning a specific element has already been stored within the map, it wouldn't make sense to redeclare the key to different vale
          if (this.#refsCache.get(key) !== element) {
            throw new Error(
              `MODERATE ERROR: within the scope 'addElement' of class instance '${this.constructor.name}' : element reference with the same key already exists within the cache manager, received ${key} as the supplied key to add, Stack Trace: ${error.stack}`
            );
          }
        }
      } else {
        throw new Error(
          `MINOR ERROR: within the scope 'addElement' of class instance '${this.constructor.name}' : failed to add reference to element cache manager, value is not an element, received ${element} as the supplied element, received ${key}, as the supplied key as well, Stack Trace: ${error.stack}`
        );
      }
    }

    removeElement(key) {
      if (!this.#refsCache.has(key)) {
        this.#refsCache.delete(key);
        return `DELETED`;
      } else {
        throw new Error(
          `MODERATE ERROR: within the scope 'removeElement' of class instance '${this.constructor.name}' : failed to remove a target key value pair because the key supplied does not exist within the map, received ${key}, Stack Trace: ${error.stack}`
        );
      }
    }

    retrieveElement(key) {
      if (!this.#refsCache.has(key)) {
        const element = this.#refsCache.get(key);
        return element;
      } else {
        return null;
      }
    }
  }

  class FunctionalityManager {
    //will append all necessary functionality to the created HTML form fragment, including the validation
    //and actual submission logic if necessary
    constructor(configObj, elementCache) {
      if (elementCache) {
        this.#elementCache = elementCache;
      } else {
        throw new Error(
          `FATAL ERROR: within scope of 'constructor' of class instance '${this.constructor.name}' : `
        );
      }
    }

    #applyFunctionality() {
      //check for all existing form control elements, query for their necesary elements, and then apply them to either the input or submit event listener logic
    }

    #config = {
      useConstraintAPI: null,
      formControlElements: null,
      formControlAttributes: null,
      formAttributes: null,
      functionalityRules: null,
      thirdPartyApiRules: null,
    };

    #dataSets = {
      countries: null,
      states: null,
    };

    #elementCache = null;

    #localElementCache = {};

    #findSpecificElements(key) {
      if (this.#elementCache) {
        return this.#elementCache.get(key);
      }
    }

    #formControlElementFunctionalities = {};

    #constraintApiEntryPoint = {
      input: () => {},
      submit: () => {},
    };

    #thirdPartyApiFunctionality = {};
  }

  class Main_UserInfoForm {
    //will incorporate all of the other class intances, as this class will act as the main hub that encompasses all of the functionality of
    //the form and handle certain state data attached to such
    constructor(configObj) {
      this.#stateData.configObj = new CreateFinalConfig(configObj); //creates final config
      this.#stateData.elementCache = new ElementCacheManager(); //maps out all of the element references within the form created
      this.#stateData.formFragment = new FormFragmentConstructor(
        this.#stateData.configObj,
        this.#stateData.elementCache
      ).assembledForm; //creates an entire form using the settings in the stored config
      this.#stateData.functionalityManager = new FunctionalityManager(
        this.#stateData.configObj,
        this.#stateData.elementCache
      ); //applies functionality using the element references stored within the cache
      this.#stateData.dynamicOptionsManager = new DynamicOptionsManager(
        this.#stateData.configObj,
        this.#stateData.functionalityManager,
        this.#stateData.elementCache
      ); //applies a specific functionality to auto generate options using event listeners from the functionality manager in conjunction with the element references stored
    }

    #stateData = {
      configObj: null,
      formFragment: null,
      elementCache: null,
      functionalityManager: null,
      autoFillFields: null,
      dynamicOptionsManager: null,
    };

    init(parentElement) {
      if (
        this.#stateData.formFragment.nodeType === Node.ELEMENT_NODE &&
        parentElement.nodeType === Node.ELEMENT_NODE
      ) {
        parentElement.append(this.#stateData.formFragment);
      } else {
        throw new Error(
          `FATAL ERROR: within the scope 'init' of 'Main_UserInfoForm' : could not append form to parent element because either the form fragment received is not an element or the target parent element is not actually and element, received ${
            this.#stateData.formFragment
          } as the form element, and ${parentElement} as the target parent element`
        );
      }
    }
  }

  class CreateFinalConfig {
    constructor(configObj) {
      //returns an object representing the final configuration that the other classes will use to determine their behavior
      //will only contain data that is necessary, and data that has been processed by the data merging hierarchy
      if (
        "applyDefaultValues" in configObj &&
        typeof configObj.applyDefaultValues === "boolean"
        //condition for defining the state of this class in the instance of a custom configuration by the user
      ) {
        this.#stateData.applyDefaultValues = configObj.applyDefaultValues;
      } else if (
        configObj.type !== "custom" &&
        Object.keys(formTemplates).includes(configObj.type)
        //condition for defining the state of this class in the instance of a template configuration by the user
      ) {
        if (configObj.applyDefaultValues) {
          //if the user put a custom value for this property in the config on top of choosing a template, prioritize the custom value over whatever the template designates
          this.#stateData.applyDefaultValues = configObj.applyDefaultValues;
        } else {
          this.#stateData.applyDefaultValues =
            formTemplates[configObj.type].applyDefaultValues;
        }

        this.#stateData.applyTemplate = true;
        this.#stateData.templateName = configObj.type;
      }

      this.uniqueIdentifier = configObj.uniqueIdentifier;

      //these properties are given a value each representing the final value used for configuring the behavior of the other classes
      //within the module, which the output of these methods will be influenced by the state of this class in order to generate
      //their outputs
      this.formAttributes = this.#dataMergingMethods.formAttributes(
        configObj.formAttributes
      );
      this.formControlElements = this.#dataMergingMethods.formControlElements(
        configObj.formControlElements
      );
      this.formControlAttributes =
        this.#dataMergingMethods.formControlAttributes(
          configObj.formControlAttributes
        );
      this.formControlText = this.#dataMergingMethods.formControlText(
        configObj.formControlText
      );
      this.functionalityRules = this.#dataMergingMethods.functionalityRules(
        configObj.functionalityRules
      );
      this.thirdPartyApiRules = this.#dataMergingMethods.thirdPartyApiRules(
        configObj.thirdPartyApiRules
      );
    }

    #stateData = {
      applyDefaultValues: true,
      applyTemplate: false,
      templateName: null,
      defaultValues: defaultValues,
    };

    #dataMergingMethods = {
      formControlElements: function (formControlElements) {
        const dataSetArr = [];

        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.formControlElements);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formTemplates[this.#stateData.templateName].formControlElements
          );
        }
        if (formControlElements) {
          dataSetArr.push(formControlElements);
        }

        if (dataSetArr.length > 1) {
          const finalConfig = Array.from(new Set([].concat(...dataSetArr)));
          return finalConfig;
        } else if (dataSetArr.length === 1) {
          return dataSetArr[0];
        }
      },
      formAttributes: function (formAttributes) {
        const dataSetArr = [];
        let finalConfig;

        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.formAttributes);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formTemplates[this.#stateData.templateName].formAttributes
          );
        }
        if (formAttributes) {
          dataSetArr.push(formControlElements);
        }

        for (let i = 0; i < dataSetArr.length; i++) {
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let attribute in dataSetArr[i]) {
              finalConfig[attribute] = dataSetArr[i][attribute];
            }
          }
        }

        return finalConfig;
      },
      formControlAttributes: function (formControlAttributes) {
        const dataSetArr = [];
        let finalConfig;
        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.formControlAttributes);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formTemplates[this.#stateData.templateName].formControlAttributes
          );
        }
        if (formControlAttributes) {
          dataSetArr.push(formControlAttributes);
        }

        for (let i = 0; i < dataSetArr.length; i++) {
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let formControlElement in dataSetArr[i]) {
              if (!finalConfig[formControlElement]) {
                finalConfig[formControlElement] =
                  dataSetArr[i][formControlElement];

                continue;
              }

              for (let attribute in dataSetArr[i][formControlElement]) {
                finalConfig[formControlElement][attribute] =
                  dataSetArr[i][formControlElement][attribute];
              }
            }
          }
        }

        return finalConfig;
      },
      formControlText: function (formControlText) {
        const dataSetArr = [];
        let finalConfig;

        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.formControlText);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(formTemplates[this.#stateData.templateName]);
        }
        //checks if the supplied user config property even exists or is undefined
        if (formControlText) {
          dataSetArr.push(formControlText);
        }

        for (let i = 0; i < dataSetArr.length; i++) {
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let formControlElement in dataSetArr[i]) {
              if (!finalConfig[formControlElement]) {
                finalConfig[formControlElement] =
                  dataSetArr[i][formControlElement];

                continue;
              }

              //if the target form control element exists within finalConfig, iterate over all of the properties
              for (let textProperty in dataSetArr[i][formControlElement]) {
                if (
                  textProperty === "errorBoxText" &&
                  finalConfig[formControlElement][textProperty]
                ) {
                  for (let error in dataSetArr[i][
                    formControlElement[textProperty]
                  ]) {
                    finalConfig[formControlElement][textProperty][error] =
                      dataSetArr[i][formControlElement][textProperty][error];
                  }
                } else {
                  finalConfig[formControlElement][textProperty] =
                    dataSetArr[i][formControlElement][textProperty];
                }
              }
            }
          }
        }

        return finalConfig;
      },
      functionalityRules: function (functionalityRules) {
        const dataSetArr = [];
        let finalConfig;
        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.functionalityRules);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formTemplates[this.#stateData.templateName].functionalityRules
          );
        }
        if (functionalityRules) {
          dataSetArr.push(functionalityRules);
        }

        for (let i = 0; i < dataSetArr.length; i++) {
          if (i === 0) {
            finalConfig = dataSetArr[0];
          } else {
            for (let rule in dataSetArr[i]) {
              finalConfig[rule] = dataSetArr[i][rule];
            }
          }
        }

        return finalConfig;
      },
      thirdPartyApiRules: function (thirdPartyApiRules) {
        const dataSetArr = [];
        let finalConfig;
        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.thirdPartyApiRules);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formTemplates[this.#stateData.templateName].thirdPartyApiRules
          );
        }
        if (thirdPartyApiRules) {
          dataSetArr.push(thirdPartyApiRules);
        }

        for (let i = 0; i < dataSetArr.length; i++) {
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let rule in dataSetArr[i]) {
              finalConfig[rule] = dataSetArr[i][rule];
            }
          }
        }

        return finalConfig;
      },
    };
  }

  //each method has to return a string about the error, not throw a new error
  const validationMethods = {
    uniqueIdentifier: function (configObj) {
      //checks for existence of the uniqueIdentifier property, and whether its value is a string that doesn't contain any special characters or spaces, aside from dashes and underscores
      if ("uniqueIdentifier" in configObj) {
        const cleanedIdentifier = configObj.uniqueIdentifier.replace(
          /[\s~`!@#$%^&*()\=+[{\]}\\|;:'",<.>/?]/g,
          ""
        );

        //if the property isn't a string, or the cleaned version isn't the same as the uncleaned version, this means invalid characters were used
        if (
          typeof configObj.uniqueIdentifier !== "string" ||
          configObj.uniqueIdentifier !== cleanedIdentifier
        ) {
          return `CONFIG VALIDATION ERROR: uniqueIdentifier property either isn't a string or a valid string(cannot contain spaces or special characters besides a dash and or underscore), Stack Trace: ${error.stack}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: uniqueIdentifier property doesn't exist, this property is required as the information attached is required for the module to function and create a new form instance, Stack Trace: ${error.stack}`;
      }

      return null;
    },
    applyDefaultValues: function (configObj) {
      //checks for the existence of this property, optional, will be set to true in most cases by default or through a template
      if ("applyDefaultValues" in configObj) {
        //checks if the value of this property is a boolean
        if (typeof configObj.applyDefaultValues !== "boolean") {
          return `CONFIG VALIDATION ERROR: applyDefaultValues property should have a boolean value, but it does not, received ${configObj.applyDefaultValues}, Stack Trace: ${error.stack}`;
        }
      }
      return null;
    },
    type: function (configObj) {
      if ("type" in configObj) {
        //checks for existence of the type property, this property is mandatory to include in the config
        if (typeof configObj.type === "string") {
          //checks if the value of this property is a string
          const existingFormTemplates = Object.keys(formTemplates);

          if (
            configObj.type !== "custom" &&
            !existingFormTemplates.includes(configObj.type)
          ) {
            //checks if the type property is either equal to the 'custom' string or another string which helps determine the final configuration data set
            return `CONFIG VALIDATION ERROR: type property isn't set to an existing form template or the 'custom' type, here is a list of available form templates ${existingFormTemplates}, Stack Trace: ${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: type property isn't a string, received ${configObj.type}, Stack Trace: ${error.stack}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: type property doesn't exist, Stack Trace: ${error.stack}`;
      }

      return null;
    },
    formAttributes: function (configObj) {
      //checks for existence of the property, this property is mandatory
      if ("formAttributes" in configObj) {
        //checks if the property value equals that of an object
        if (typeof configObj.formAttributes === "object") {
          const formAttributes = Object.keys(configObj.formAttributes);

          //checks to see if there are any form attributes being defined within said object
          if (formAttributes.length > 0) {
            //checks to see if either of these mandatory properties are missing
            const formAttributesRef = Object.keys(
              validationRefs.formAttributes
            );

            if (
              !formAttributes.includes("formAction") ||
              !formAttributes.includes("formMethod")
            ) {
              return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but some required properties that should exist within this object are missing, the properties 'formAction' and 'formMethod' should be referenced and have a defined value attached to them in order for the module to create a new class instance, Stack Trace: ${error.stack}`;
            } else {
              //iterates over all of the properties, in this case the formAction and formMethod properties must exist at the very least, but also scans for optional properties
              for (let attribute in configObj.formAttributes) {
                //checks if the target attribute is even a valid attribute
                if (!formAttributesRef.includes(attribute)) {
                  return `CONFIG VALIDATION ERROR: unrecognized form attribute within the formAttributes property object, received ${attribute}, Stack Trace: ${error.stack}`;
                }

                if (
                  typeof configObj.formAttributes[attribute] ===
                  validationRefs.formAttributes[attribute]
                  //for the condition that the attribute value is constrained to a data type but not a fixed list of inputs, if it meets this condition, it passes
                ) {
                  continue;
                } else if (
                  Array.isArray(validationRefs.formAttributes[attribute])
                  //for the condition that the attribute is supposed to be one of a set of inputs, which these inputs are stored within an array within the refs
                ) {
                  //if the value set for the corresponding attribute is not present in the array of allowed values for the corresponding attribute
                  if (
                    !validationRefs.formAttributes[attribute].includes(
                      configObj.formAttributes[attribute]
                    )
                  ) {
                    return `CONFIG VALIDATION ERROR: value for a specific attribute is not valid, received ${configObj.formAttributes[attribute]} for ${attribute}, here is a list of valid attributes to target '${validationRefs.formAttributes[attribute]}, Stack Trace: ${error.stack}'`;
                  }
                } else {
                  //fails the previous checks
                  return `CONFIG VALIDATION ERROR: value for the ${attribute} attribute is not a valid data type, here is the data type to be expected ${validationRefs.formAttributes[attribute]}, Stack Trace: ${error.stack}`;
                }
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but this object doesn't contain any form attributes within it, Stack Trace: ${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: required property formAttributes was declared, but the value associated with it is not the right data type, needs to be an object, Stack Trace: ${error.stack}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: formAttributes property must always be used because the information within it is required for the module to function and create a new form instance, \n${error.stack}`;
      }

      return null;
    },
    formControlAttributes: function (configObj) {
      if ("formControlAttributes" in configObj) {
        //if the property exists, isn't mandatory
        //property must equal and object if it does though
        if (typeof configObj.formControlAttributes === "object") {
          const formControlElements = Object.keys(
            configObj.formControlAttributes
          );
          //check for the existence of keys that represent specific form control elements
          if (formControlElements.length > 0) {
            formControlElements.forEach((element) => {
              //checks if current element isn't a valid form control element to target
              if (!validationRefs.formControlElements.includes(element)) {
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlAttributes property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}', Stack Trace: ${error.stack}`;
              }
              //checks if the value of the target form control element is a valid data type, that being an object
              if (
                typeof configObj.formControlAttributes[element] === "object"
              ) {
                //iterates over all of the existing properties within the specific targeted form control element, and validates the values
                //of each of these properties
                for (let property in configObj.formControlAttributes[element]) {
                  if (
                    typeof configObj.formControlAttributes[element][
                      property
                    ] === validationRefs.formControlAttributes[property]
                  ) {
                    continue;
                    //continue the loop if this condition is met, the specific property passed the validation
                  } else if (
                    validationRefs.formControlAttributes[property] === "regexp"
                    //if the specific property should have a regular expression as its value, the value is tested to see if it becomes a valid regexp
                  ) {
                    try {
                      new RegExp(
                        configObj.formControlAttributes[element][property]
                      );
                    } catch {
                      return `CONFIG VALIDATION ERROR: target property is supposed to be a valid regular expression, received ${configObj.formControlAttributes[element][property]} for ${property}, within ${element} of the property formControlAttributes, Stack Trace: ${error.stack}`;
                    }
                  } else if (
                    Array.isArray(
                      validationRefs.formControlAttributes[property]
                    )
                  ) {
                    //check for a match within the corresponding attribute value reference array on the specific property
                    if (
                      !validationRefs.formControlAttributes[property].includes(
                        configObj.formControlAttributes[element][property]
                      )
                    ) {
                      return `CONFIG VALIDATION ERROR: value of a specific attribute is not a valid selection within formControlAttributes and ${element}, received ${configObj.formControlAttributes[element][property]}, here are a list of available corresponding property values, Stack Trace: ${error.stack}`;
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a target attribute value either does not meet the requirements for either the data type or equal a valid possible value, received ${configObj.formControlAttributes[element][property]}, valid formats and or possible inputs for this attribute are ${validationRefs.formControlAttributes[property]}, Stack Trace: ${error.stack}`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlAttributes was declared, and a correct form control element was targeted, but the value of said form control element property isn't an object, received ${element} and ${configObj.formControlAttributes[element]} as its value, Stack Trace: ${error.stack}`;
              }
            });
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlAttributes property was declared, but isn't a correct data type, must be an object, Stack Trace: ${error.stack}`;
        }
      }

      return null;
    },
    formControlElements: function (configObj) {
      //checks if formControlElements property exists, optional property
      if ("formControlElements" in configObj) {
        //checks if the property value is equal to an array
        if (Array.isArray(configObj.formControlElements)) {
          //checks if said array contains any elements within it
          if (configObj.formControlElements.length > 0) {
            //checks the validity of each element in the array, making sure each element is an actual form control element
            configObj.formControlElements.forEach((element) => {
              if (!validationRefs.formControlElements.includes(element)) {
                return `CONFIG VALIDATION ERROR: unrecognized form control element, received ${element} within the formControlElements property array, here are the available form control elements to use ${formControlElements}, Stack Trace: ${error.stack}`;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: formControlElements was declared, and is an array, but doesn't contain any form control elements, Stack Trace: ${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlElements was declared, but isn't a correct data type, must be an array, Stack Trace: ${error.stack}`;
        }
      }

      return null;
    },
    formControlText: function (configObj) {
      //checks for the existence of the property
      if ("formControlText" in configObj) {
        //checks if the value of the property is an object
        if (typeof configObj.formControlText === "object") {
          const formControlElements = Object.keys(configObj.formControlText);
          //checks if the resulting object contains any keys, hence the form control elements being targeted
          if (formControlElements.length > 0) {
            //checks every target form control element to see if they are all valid
            formControlElements.forEach((element) => {
              if (!validationRefs.formControlElements.includes(element)) {
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlText property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}', Stack Trace: ${error.stack}`;
              }

              const textProperties = Object.keys(
                configObj.formControlText[element]
              );

              //checks for if there are existing text properties within this targeted form control element instance
              if (textProperties.length > 0) {
                const formControlTextProperties = Object.keys(
                  validationRefs.formControlText
                );

                //iterates over the existing text properties and checks if they are valid, as well as validate their values
                for (let textProperty in configObj.formControlText[element]) {
                  if (!formControlTextProperties.includes(textProperty)) {
                    return `CONFIG VALIDATION ERROR: unrecognized text property within ${element} of formControlText, here is a list of valid text properties to use '${Object.keys(
                      validationRefs.formControlText
                    )}', Stack Trace: ${error.stack}`;
                  }
                  if (
                    typeof configObj.formControlText[element][textProperty] ===
                      "string" &&
                    textProperty !== "validationFailure"
                    //checks if the text property value is a string and making sure it's not the validationFailure property if so
                  ) {
                    continue;
                  } else if (
                    typeof configObj.formControlText[element][textProperty] ===
                      "object" &&
                    textProperty === "validationFailure"
                    //checks if the text property valy is an object and making sure the property is called validationFailure
                  ) {
                    const validationFailureTextPropertiesRef = Object.keys(
                      validationRefs.formControlText.validationFailure
                    );

                    for (let validationFailureTextProperty in configObj
                      .formControlText[element][textProperty]) {
                      if (
                        !validationFailureTextPropertiesRef.includes(
                          validationFailureTextProperty
                          //checks if the target validationFailureText property is a valid property to target
                        )
                      ) {
                        return `CONFIG VALIDATION ERROR: validation failure property unrecognized, received ${validationFailureTextProperty} within ${element}, Stack Trace: ${error.stack}`;
                      }
                      if (
                        typeof configObj.formControlText[element][textProperty][
                          validationFailureTextProperty
                        ] !== "string"
                        //checks if the value of the target valildationFailureText property is a valid data type, that being a string
                      ) {
                        return `CONFIG VALIDATION ERROR: value of a validation failure text property is not the correct, received ${configObj.formControlText[element][textProperty][validationFailureTextProperty]} for ${validationFailureTextProperty} in ${element} of formControlText, Stack Trace: ${error.stack}`;
                      }
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a text property value is not the correct data type, received ${configObj.formControlText[element][textProperty]} for ${textProperty} within formControlText, needs to be a string for all properties except the validationFailure property, Stack Trace: ${error.stack}`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlText was declared, is an object, and contains target form control element(s), but ${element} equals an empty object, here is a list of text properties to use within this object ${Object.keys(
                  validationRefs.formControlText
                )}, Stack Trace: ${error.stack}`;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: the property formControlText was used and equals an object, but the object contains no properties within it, the properties should reference specific form control elements, and their values should be objects filled with the corresponding attributes desired, Stack Trace: ${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the property formControlText was used but isn't a valid data type, must be an object, Stack Trace: ${error.stack}`;
        }
      }

      return null;
    },

    functionalityRules: function (configObj) {
      //checks for the existence of the property, which is optional
      if ("functionalityRules" in configObj) {
        //checks if the data type of the value of this property is an object
        if (typeof configObj.functionalityRules === "object") {
          const functionalityRules = Object.keys(configObj.functionalityRules);

          if (functionalityRules.length > 0) {
            //iterates over all of the rules being targeted within the functionalityRules object
            const functionalityRulesRef = Object.keys(
              validationRefs.functionalityRules
            );

            for (let rule in configObj.functionalityRules) {
              if (!functionalityRulesRef.includes(rule)) {
                //checks whether the rule is a valid rule to target
                return `CONFIG VALIDATION ERROR: unrecognized targeted rule, received ${rule}, here is a list of valid rules to target "${functionalityRulesRef}", Stack Trace: ${error.stack}`;
              } else if (
                typeof configObj.functionalityRules[rule] ===
                validationRefs.functionalityRules[rule]
              ) {
                //checks if the value of the target rule is valid or not, should be a boolean value
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule within functionalityRules is not a valid data type, received ${configObj.functionalityRules[rule]}, should be a boolean, Stack Trace: ${error.stack}`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, and its value is an object, but the object doesn't contain any functionality rules, here is a list of functionality rules to target '${Object.keys(
              validationRefs.functionalityRules
            )}', Stack Trace: ${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, but its value is not an object, this object should only contain valid functionality rules as properties and their allowed associated values, Stack Trace: ${error.stack}`;
        }
      }
      return null;
    },
    thirdPartyApiRules: function (configObj) {
      //checks for the existence of the property, optional
      if ("thirdPartyApiRules" in configObj) {
        //checks if the value of the property is an object
        if (typeof configObj.thirdPartyApiRules === "object") {
          const thirdPartyApiRules = Object.keys(configObj.thirdPartyApiRules);

          //checks if the object contains any properties that represent rules for specific apis
          if (thirdPartyApiRules.length > 0) {
            //iterates over the existing properties
            const thirdPartyApiRulesRef = Object.keys(
              validationRefs.thirdPartyApiRules
            );

            for (let rule in configObj.thirdPartyApiRules) {
              //if the target rule is an invalid rule to target
              if (!thirdPartyApiRulesRef.includes(rule)) {
                return `CONFIG VALIDATION ERROR: unrecognized rule detected, received ${rule} within thirdPartyApiRules, here is a list of valid rules to target, ${thirdPartyApiRulesRef}, Stack Trace: ${error.stack}`;
              }

              if (
                typeof configObj.thirdPartyApiRules[rule] ===
                validationRefs.thirdPartyApiRules[rule]
              ) {
                //checks to see if the valid rule has a value in the correct data type, which it should be a boolean
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule ${rule} within thirdPartyApiRules has an incorrect data type, should be a boolean, Stack Trace: ${error.stack}`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: thirdPartyApiRules was declared, and its value is an object, but the object does not contain any rules, here are a list of rules you can target ${thirdPartyApiRulesRef}, Stack Trace: ${error.stack}`;
          }
        } else {
          return `ERROR: thirdPartyApiRules was declared, but the value of the property is not an object, Stack Trace: ${error.stack}`;
        }
      }

      return null;
    },
  };

  const validationRefs = {
    formControlElements: [
      "email",
      "confirmEmail",
      "address",
      "stateOrProvince",
      "country",
      "postalCode",
      "password",
      "confirmPassword",
      "dateOfBirth",
      "phoneNumber",
      "creditCardType",
      "creditCardNumber",
      "creditCardExpDate",
      "creditCardSecurityNumber",
      "subjectLineOne",
      "subjectLineTwo",
      "textBoxOne",
      "textBoxTwo",
      "fileUpload",
    ],
    formControlAttributes: {
      name: "string",
      value: "string",
      required: null,
      disabled: null,
      readonly: null,
      placeholder: "string",
      maxlength: "number",
      minlength: "number",
      pattern: "regexp",
      min: "number",
      max: "number",
      step: "number",
      multiple: "boolean",
      autofocus: "boolean",
      autocomplete: ["on", "off"],
      autocorrect: ["on", "off"],
      autocapitalize: ["none", "sentences", "words", "characters"],
      autofill: ["on", "off"],
      spellcheck: "boolean",
      size: "number",
      tabindex: "number",
      type: ["text", "email", "password", "number", "date"],
      list: "string",
      form: "string",
      accept: [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".pdf",
        ".doc",
        ".docx",
        ".txt",
        ".rtf",
        ".xls",
        ".xlsx",
        ".csv",
        ".ppt",
        ".pptx",
        ".zip",
        ".rar",
        ".tar",
        ".gz",
      ],
      id: "string",
      for: "string",
      title: "string",
      dataList: "boolean",
    },
    formAttributes: {
      action: "string",
      method: "string",
      target: ["_blank", "_self", "_parent", "_top"],
      enctype: [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
      ],
      "aria-label": "string",
      "aria-labelledby": "string",
      "aria-describedby": "string",
      novalidate: null,
    },
    formControlText: {
      label: "string",
      instructions: "string",
      validationFailure: {
        patternMismatch: "string",
        tooLong: "string",
        tooShort: "string",
        rangeOverflow: "string",
        rangeUnderflow: "string",
        typeMismatch: "string",
        valueMissing: "string",
      },
    },
    functionalityRules: {
      validateInputs: "boolean",
      useConstraintAPI: "boolean",
      listenOnInput: "boolean",
      listenOnSubmit: "boolean",
    },
    thirdPartyApiRules: {
      useZeroBounce: "boolean",
      useGeoNames: "boolean",
      useSmartyStreets: "boolean",
      useStripe: "boolean",
      useNumVerify: "boolean",
    },
  };

  function validateConfig(config) {
    const allErrors = [];

    //very first validation check, whether the argument is an object or not
    if (typeof config !== "object") {
      allErrors.push(
        `CONFIG VALIDATION ERROR: supplied config argument is not an object, received ${typeof config}, Stack Trace: ${
          error.stack
        }`
      );
    }
    //will iterate over every existing validation method, supply the config
    //to it, and then catch every returned string and push it into the all errors array
    Object.keys(validationMethods).forEach((method) => {
      const validationResult = validationMethods[method](config);
      if (typeof validationResult === "string") {
        allErrors.push(validationString);
      }
    });

    //returns the array regardless if there is any errors or not within it
    return allErrors;
  }

  //check if the target data is in the correct format and a usable value

  function newClassInstance(config) {
    //received the array that may have a single error as a string per element
    const allErrorStrings = validateConfig(config);

    //if there are no elements, that means there aren't any errors, thus the config can be used without causing issue in the actual app
    if (allErrorStrings.length === 0) {
      return new Main_UserInfoForm(config);
    } else {
      //if there are errors, map the array, converting every element from just a string into an actual error instance
      //supplied with the individual string
      const allErrorInstances = allErrorStrings.map((errorString) => {
        return new Error(errorString);
      });
      //throw the entire array full of individual error instances so that the user can see multiple errors
      //at a time instead of a single error at a time
      throw allErrorInstances;
    }
  }

  return { newClassInstance, addPreset };
}

// configObj = {
//    uniqueIdentifier: "string(no special characters besides - or _)",   (always required) (must be a string) (must match something that you would put within a class, because it's going to be used as a class tag)
//    type: "string",   (always required) (must be a string) (must match either 'custom' for a custom setup or one of the various presets)
//    formAttributes: {
//        action: "string",   (always required) (must be a string)
//        method: "string",   (always required) (must be a string, and from the list of valid inputs)
//        target: "string",   (optional) (must be a string, and from the list of valid inputs)
//        enctype: "string", (optional) (must be a string, and from the list of valid inputs)
//        "aria-label": "string", (optional) (must be a string)
//        "aria-labelledby": "string",  (optional) (must be a string)
//        "aria-describedby": "string", (optional) (must be a string)
//    }
//    formControlElements = ["string","string",...],  (if type set to custom this property is required) (not necessary if type property isn't custom) (defines the form control elements to include) (each element must be a string and unique, also order counts but not critical) (can be stacked on top of a form template to include extra forms)
//    applyDefaultValues: boolean,
//    formControlAttributes: {
//        specificFormControl1: {
//        name: "string",
//        value: "string",
//        required: null,         (inline property, doesn't need a value)
//        disabled: null,         (inline property, doesn't need a value)
//        readonly: null,             (inline property, doesn't need a value)
//        placeholder: "string",
//        maxlength: "number",
//        minlength: "number",
//        pattern: "regexp",
//        min: "number",
//        max: "number",
//        step: "number",
//        multiple: "boolean",
//        autofocus: "boolean",
//        autocomplete: ["on", "off"],  (choose one)
//        autocorrect: ["on", "off"],  (choose one)
//        autocapitalize: ["none", "sentences", "words", "characters"], (choose one of these)
//        spellcheck: "boolean",
//        size: "number",
//        tabindex: "number",
//        formnovalidate: null,          (inline property, doesn't need a value)
//        dataList: "boolean"
//        },                                          (used to define specific inline attributes on specific elements, this is for defining say the name for a specific form control input etc)
//        specificFormControl2: {...properties},      (optional, if not used then default values will be used in place, but an error will throw if you disable default value use and fail to define attribute values)
//        ...,                                        (can use a mixture of default properties and custom properties if you wanted to this way, custom properties have a higher hierarchy and will be applied over default ones)
//    },
//    formControlText: {
//        specificFormControl1: {
//             label: "string",
//             instructions: "string",
//             validationFailure: {
//             patternMismatch: "string",
//             tooLong: "string",
//             tooShort: "string",
//             rangeOverflow: "string",
//             rangeUnderflow: "string",
//             typeMismatch: "string",
//             valueMissing: "string",
//             },
//        },                                          (used to define specific text attributes on specific elements, this is for defining say the text for a specific form control label, and all of its individual error box values)
//        specificFormControl2: {...properties},      (optional, if not used then default values will be used in place, but an error will throw if you disable default value use and fail to define attribute values)
//        ...,                                        (can use a mixture of default properties and custom properties if you wanted to this way, custom properties have a higher hierarchy and will be applied over default ones)
//    },
//    functionalityRules: {
//      validateInputs: boolean,
//      useConstraintAPI: boolean,               (filled in properties help to define some user form functionality, such as input event listening, or submit event listening, using the constraint API etc.)
//      listenOnInput: boolean,
//      listenOnSubmit: boolean,
//    },
//    thirdPartyApiRules: {
//      useZeroBounce: boolean,
//      useGeoNames: boolean,
//      useSmartyStreets: boolean,
//      useStripe: boolean,
//      useNumVerify: boolean,
//    },
//}
//
// configuration value application hierarcy from bottom to top application, the top most application will be the most concurrent value application.
// bottom: Default values(if enabled) mid: preset form template values(if used) top: all custom properties defined by the config file
// This way you can mix-match default values, preset form template data, and custom data in order to meet your needs in a more concise manner.
