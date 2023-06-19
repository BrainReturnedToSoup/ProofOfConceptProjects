import { config } from "webpack";

export function UserInfoFormModule() {
  const formPresets = {
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
    constructor(configObj) {
      this.#processConfigObj(configObj);
      this.assembledForm = this.#initializeFormCreation();
    }
    //constructor acts as the entry point at which to apply the various configurations to the constructor instance

    //data sets that the constructor will base all of its construction of fragments off of in this instance
    //determines the form controls used, their specific attributes, their specific text, and whether to include
    //elements relevant to the constraint API if this instance uses such
    #config = {
      fragmentTextData: {}, //keys should be the corresponding form control element name that matches the method for the constructor
      formControlElements: [], //elements should be the corresponding form control element name that matches the method for the constructor
      formControlAttributes: {}, //keys should be the corresponding form control element name that matches the method for the constructor
      useConstraintAPI: true,
      uniqueIdentifier: "NOT-SET",
      formAction: "#",
      formMethod: "get",
    };

    //main method to begin applying the configuration to this class instance
    #processConfigObj(configObj) {
      this.#applyConfig.constraintAPI(configObj);
      this.#applyConfig.uniqueIdentifier(configObj);
      this.#applyConfig.formAction(configObj);
      this.#applyConfig.formMethod(configObj);

      this.#processConfigHierarchy.formControlElements(configObj);
      this.#processConfigHierarchy.formText(configObj);
      this.#processConfigHierarchy.formElementsAttributes(configObj);
      //methods above all responsible for processing and or applying the various data sets to each individual property within the #config object
      //the processing methods offload to a method that applies the data sets, so all properties will be targeted for applying
      //config data at some point
    }

    //abstracted the processing into their own methods even if some of the code repeats, but
    //this is to make it easier to fine tune processing in the future as well as help with debugging the module
    #processConfigHierarchy = {
      formControlElements: (configObj) => {
        let useTemplate = false,
          useDefault = true,
          selectedTemplateFormControlElements,
          defaultFormControlElements =
            defaultValues_FormFragmentConstructor.formControlElements,
          appliedConfigsArr = [];

        //checks to see whether to apply default values or not
        if (
          configObj.applyDefaultValues &&
          configObj.applyDefaultValues.FormFragmentConstructor &&
          configObj.applyDefaultValues.FormFragmentConstructor === false
        ) {
          useDefault = false;
        }

        //looks for corresponding template matching the type property if its not equal to "custom"
        //if found applies the corresponding data to a variable and
        //sets the useTemplate variable boolean equal to true;
        if (configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            selectedTemplateFormControlElements =
              formPresets[configObj.type].formControlElements;
            useTemplate = true;
          } else {
            throw new Error(
              `ERROR: template does not exist, received ${
                configObj.type
              }, available templates are "${Object.keys(formPresets)}"`
            );
          }
        }

        //pushes default value first if applicable
        if (useDefault) {
          appliedConfigsArr.push(defaultFormControlElements);
        }

        //pushes template value next if applicable
        if (useTemplate) {
          appliedConfigsArr.push(selectedTemplateFormControlElements);
        }

        //always pushes the config value last
        if (configObj.formControlElements) {
          appliedConfigsArr.push(configObj.formControlElements);
        }

        //all used config data specifically for text fields will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        if (appliedConfigsArr.length > 0) {
          this.#applyConfigHierarchy.formControlElements(appliedConfigsArr);
        } else {
          throw new Error(
            `ERROR: appliedConfigArr lacks configuration data sets for form control elements`
          );
        }
      },
      formText: (configObj) => {
        let useTemplate = false,
          useDefault = true,
          selectedTemplateTextValues,
          defaultTextValues =
            defaultValues_FormFragmentConstructor.fragmentTextData,
          appliedConfigsArr = [];

        //checks to see if the applyDefaultValues property is being used, whether this class instance was mentioned, and whether the class instance was set to not use a default value
        //shouldn't throw an error otherwise since this is an optional property to use
        if (
          configObj.applyDefaultValues &&
          configObj.applyDefaultValues.FormFragmentConstructor &&
          configObj.applyDefaultValues.FormFragmentConstructor === false
        ) {
          useDefault = false;
        }

        //if the type property doesn't equal 'custom' it assumes its a preset, and will check for the preset
        //apply the corresponding data to the variable selectedTemplateTextValues
        //and then set the useTemplate variable boolean equal to true
        //needs to be able to throw an error since this is a required property
        if (configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            selectedTemplateTextValues =
              formPresets[configObj.type].fragmentTextData;
            useTemplate = true;
          } else {
            throw new Error(
              `ERROR: template does not exist, received ${
                configObj.type
              }, available templates are "${Object.keys(formPresets)}"`
            );
          }
        }

        if (useDefault) {
          appliedConfigsArr.push(defaultTextValues);
        }

        if (useTemplate) {
          appliedConfigsArr.push(selectedTemplateTextValues);
        }

        if (configObj.formControlText) {
          appliedConfigsArr.push(configObj.formControlText);
        }
        //all used config data specifically for text fields will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        if (appliedConfigsArr.length > 0) {
          this.#applyConfigHierarchy.formText(appliedConfigsArr);
        } else {
          throw new Error(
            `ERROR: appliedConfigArr lacks configuration data sets for form text`
          );
        }
      },
      formElementsAttributes: (configObj) => {
        let useTemplate = false,
          useDefault = true,
          selectedTemplateFormControlElementAttributes,
          defaultFormControlElementAttributes =
            defaultValues_FormFragmentConstructor.fragmentAttributes,
          appliedConfigsArr = [];

        //checks to see if the applyDefaultValues property is being used, whether this class instance was mentioned, and whether the class instance was set to not use a default value
        //shouldn't throw an error otherwise since this is an optional property to use
        if (
          configObj.applyDefaultValues &&
          configObj.applyDefaultValues.FormFragmentConstructor &&
          configObj.applyDefaultValues.FormFragmentConstructor === false
        ) {
          useDefault = false;
        } else if (
          configObj.applyDefaultValues &&
          configObj.applyDefaultValues.FormFragmentConstructor &&
          configObj.applyDefaultValues.FormFragmentConstructor === true
        ) {
          useDefault = true;
        }

        //if the type property doesn't equal 'custom' it assumes its a preset, and will check for the preset
        //needs to be able to throw an error since this is a required property
        if (configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            selectedTemplateFormControlElementAttributes =
              formPresets[configObj.type].formControlElements;
          } else {
            throw new Error(
              `ERROR: template does not exist, received ${
                configObj.type
              }, available templates are "${Object.keys(formPresets)}"`
            );
          }
        }

        if (useDefault) {
          appliedConfigsArr.push(defaultFormControlElementAttributes);
        }

        if (useTemplate) {
          appliedConfigsArr.push(selectedTemplateFormControlElementAttributes);
        }

        if (configObj.formControlAttributes) {
          appliedConfigsArr.push(configObj.formControlAttributes);
        }

        //all used config data specifically for form control elements will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        if (appliedConfigsArr.length > 0) {
          this.#applyConfigHierarchy.formElementsAttributes(appliedConfigsArr);
        } else {
          throw new Error(
            `ERROR: appliedConfigArr lacks configuration data sets for form element attributes`
          );
        }
      },
    };

    //used to take the present data and apply it to the various class state data structures,
    //these methods may either accept an array demonstrating the hierary, or simply reference a specific property in
    //the config file
    #applyConfig = {
      formControlElements: (appliedConfigsArr) => {
        //arg should be an array in which its elements are
        //arrays that each contain a list of the form control elements being used

        //purpose of this code block is to set the formControlElements config to equal the first element, and
        //then check the other elements and add any form control elements that weren't already listed from the first
        //element. This should be a method of only side effects as it edits and applies this data to the final config
        if (Array.isArray(appliedConfigsArr)) {
          for (let i = 0; i < appliedConfigsArr.length; i++) {
            if (i === 0) {
              this.#config.formControlElements = appliedConfigsArr[i];
            } else {
              appliedConfigsArr[i].forEach((formControlElement) => {
                if (
                  !this.#config.formControlElements.includes(formControlElement)
                ) {
                  this.#config.formControlElements.push(formControlElement);
                }
              });
            }
          }
        } else {
          throw new Error(
            `ERROR: appliedConfigsArr argument within formControlElements method isn't an array, received ${appliedConfigsArr}`
          );
        }
      },
      formText: (appliedConfigsArr) => {
        //arg should be an array in which its elements are objects, in which each object holds the same structure but
        //may have different values to the properties within them
        if (Array.isArray(appliedConfigsArr)) {
          this.#config.fragmentTextData = appliedConfigsArr[0];

          //sets the fragmentTextData property equal to the first element, then checks for any other elements and all
          //of their properties using some pretty nested loops, but it shouldn't be an issue as the scope of the
          //iteration should never exceed a max of 15 iterations in any given level, also the inner most scope
          //is simply applying a value to a variable, so the level of complexity is pretty low in this context

          for (let i = 1; i < appliedConfigsArr.length; i++) {
            if (!appliedConfigsArr[i]) break; //will break immediately if a current config data element doesn't exist
            for (let formControlElement in appliedConfigsArr[i]) {
              if (this.#config.fragmentTextData[formControlElement]) {
                for (let property in appliedConfigsArr[i][formControlElement]) {
                  if (property === "errorBoxText") {
                    for (let errorProperty in appliedConfigsArr[i][
                      formControlElement
                    ][property]) {
                      //iterate over the properties in the errorBoxText property which is within the formControl element property
                      if (
                        this.#config.fragmentTextData[formControlElement][
                          property
                        ][errorProperty]
                      ) {
                        this.#config.fragmentTextData[formControlElement][
                          property
                        ][errorProperty] =
                          appliedConfigsArr[i][formControlElement][property][
                            errorProperty
                          ];
                      }
                    }
                  } else {
                    //applies various form text propertie values from the second data set to the equivalent property in the config object
                    if (
                      this.#config.fragmentTextData[formControlElement][
                        property
                      ]
                    ) {
                      this.#config.fragmentTextData[formControlElement][
                        property
                      ] = appliedConfigsArr[i][formControlElement][property];
                    }
                  }
                }
              }
            }
          }
        } else {
          throw new Error(
            `ERROR: appliedConfigsArr argument within formText method isn't an array, received ${appliedConfigsArr}`
          );
        }
      },
      formElementsAttributes: (appliedConfigsArr) => {
        //arg should be an array in which its elements are objects, in which each object holds the same structure but
        //may have different values to the properties within them
        if (Array.isArray(appliedConfigsArr)) {
          this.#config.formControlAttributes = appliedConfigsArr[0];

          //applies the attribute values for each and every selected form control element
          //in the hierarchy pattern
          for (let i = 1; i < appliedConfigsArr.length; i++) {
            if (!appliedConfigsArr[i]) break;
            for (let formControlElement in appliedConfigsArr[i]) {
              if (this.#config.formControlAttributes[formControlElement]) {
                for (let attribute in appliedConfigsArr[i][
                  formControlElement
                ]) {
                  if (
                    this.#config.formControlAttributes[formControlElement][
                      attribute
                    ]
                  ) {
                    this.#config.formControlAttributes[formControlElement][
                      attribute
                    ] = appliedConfigsArr[i][formControlElement][attribute];
                  }
                }
              }
            }
          }
        } else {
          throw new Error(
            `ERROR: appliedConfigsArr argument within formElementsAttributes method isn't an array, received ${appliedConfigsArr}`
          );
        }
      },
      constraintAPI: (configObj) => {
        if (
          configObj.functionalityRules &&
          configObj.functionalityRules.useConstraintAPI
        ) {
          this.#config.useConstraintAPIcontraintAPI =
            configObj.functionalityRules.useConstraintAPI;
        } else if (configObj.type && configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            this.#config.useConstraintAPI =
              formPresets[configObj.type].functionalityRules.useConstraintAPI;
          } else {
            throw new Error(
              `ERROR: template does not exist, received ${
                configObj.type
              }, available templates are "${Object.keys(formPresets)}"`
            );
          }
        }
      },
      uniqueIdentifier: (configObj) => {
        if (
          configObj.uniqueIdentifier &&
          typeof configObj.uniqueIdentifier === "string"
        ) {
          this.#config.uniqueIdentifier = configObj.uniqueIdentifier;
        } else {
          throw new Error(
            `ERROR: configuration object lacks a unique identifier or it's in a invalid data format, received ${configObj.uniqueIdentifier}, cannot create form`
          );
        }
      },
      formAction: (configObj) => {
        if (configObj.formAction && typeof configObj.formAction === "string") {
          this.#config.formAction = configObj.formAction;
        } else {
          throw new Error(
            `ERROR: configuration object lacks a form action or it's in a invalid data format, received ${configObj.formAction}, cannot create form`
          );
        }
      },
      formMethod: (configObj) => {
        if (configObj.formMethod && typeof configObj.formMethod === "string") {
          this.#config.formMethod = configObj.formMethod;
        } else {
          throw new Error(
            `ERROR: configuration object lacks a form method or it's in a invalid data format, received ${configObj.formMethod}, cannot create form`
          );
        }
      },
    };

    //#config = {
    //  fragmentTextData: {}, //keys should be the corresponding form control element name that matches the method for the constructor
    //  formControlElements: [], //elements should be the corresponding form control element name that matches the method for the constructor
    //  formControlAttributes: {}, //keys should be the corresponding form control element name that matches the method for the constructor
    //  useConstraintAPI: true,
    //  uniqueIdentifier: "NOT-SET",
    //  formAction: "#",
    //  formMethod: "get",
    //};

    #initializeFormCreation() {
      const formElement = this.#buildformElement();
      for (let formConrolElement of this.#config.formControlElements) {
      }
    }

    #buildformElement() {
      const formElement = document.createElement("form");

      formElement.setAttribute("action", this.#config.formAction);
      formElement.setAttribute("method", this.#config.formMethod);
      this.#addUniqueIdentifier(formElement);

      return formElement;
    }

    #addUniqueIdentifier(element) {
      if (
        !Array.from(element.classList).includes(this.#config.uniqueIdentifier)
      ) {
        element.classList.add(this.#config.uniqueIdentifier);
      }
    }

    //<div class="Form-Control-Container">
    //  <labe></label>
    //  *<input></input>
    //  *<div class="Form-Control-Instructions"></div>
    //  *<div class="Form-Control-Error-Text-Container">
    //
    //   </div>
    //</div>

    //methods for creating the corresponding form control element with all of the necessary properties applied to such
    //these will create entire fragments, and then return the fragments

    #formControlTemplateBuilders = {
      mainShell: (formControlElement) => {
        //<div class="Form-Control-Container-formControlElement uniqueIdentifier"></div>
        const formControlContainer = document.createElement("div");

        formControlContainer.classList.add(
          `Form-Control-Container-${formControlElement}`
        );

        this.#addUniqueIdentifier(formControlContainer);

        return formControlContainer;
      },
      label: (formControlElement) => {
        //<label class="Form-Control-Label-formControlElement uniqueIdentifier" for="Form-Control-formControlElement_uniqueIdentifier">labelText</label>
        if (
          this.#config.fragmentTextData[formControlElement].labelText &&
          typeof this.#config.fragmentTextData[formControlElement].labelText ===
            "string" &&
          this.#config.fragmentTextData[formControlElement].labelText ===
            this.#config.fragmentTextData[formControlElement].labelText.replace(
              / /g,
              ""
            )
          //checks for the corresponding property, whether its a string, and whether its an empty string or not
          //These need to exist in order to create a label, otherwise there is no point to creating the label
        ) {
          const formControlLabel = document.createElement("label");

          formControlLabel.classList.add(
            `Form-Control-Label-${formControlElement}`
          );

          this.#addUniqueIdentifier(formControlLabel);

          formControlLabel.setAttribute(
            "for",
            `Form-Control-${formControlElement}_${
              this.#config.uniqueIdentifier
            }`
          );

          formControlLabel.innerText =
            this.#config.fragmentTextData[formControlElement].labelText;

          return formControlLabel;
        }
      },
      Instructions: (formControlElement) => {
        //<div class="Form-Control-Instructions-formControlElement uniqueIdentifier">instructionsText</div>
        if (
          this.#config.useConstraintAPI &&
          this.#config.fragmentTextData[formControlElement].instructionsText &&
          typeof this.#config.fragmentTextData[formControlElement]
            .instructionsText === "string" &&
          this.#config.fragmentTextData[formControlElement].instructionsText ===
            this.#config.fragmentTextData[
              formControlElement
            ].instructionsText.replace(/ /g, "")
          //checks to see if the constraint API is going to be used on this form, whether the instructions property exists, whether its a string, and whether its not an empty string
        ) {
          const formControlInstructions = document.createElement("div");

          formControlInstructions.classList.add(
            `Form-Control-Instructions-${formControlElement}`
          );

          this.#addUniqueIdentifier(formControlInstructions);

          formControlInstructions.innerText =
            this.#config.fragmentTextData[formControlElement].instructionsText;

          return formControlInstructions;
        }
      },
      ErrorText: (formControlElement) => {
        if (
          this.#config.useConstraintAPI &&
          this.#config.fragmentTextData[formControlElement].errorBoxText &&
          typeof this.#config.fragmentTextData[formControlElement]
            .errorBoxText === "object" &&
          Object.keys(
            this.#config.fragmentTextData[formControlElement].errorBoxText
          ).length > 0
          //checks for use of the constraint api, whether the errorBoxText property exists, checks if said property is equal to an object, and whether the object contains any properties
        ) {
          //will check the error types within the errorBoxText object and see if the various properties are valid in order to create the container
          //along with the valid error text elements, append them to the container, and then return the entire fragment
          let errorTextFrag;
          makeContainer = false;
          for (let errorType in this.#config.fragmentTextData[
            formControlElement
          ].errorBoxText) {
            if (this.#typesOfErrors.includes(errorType)) {
              if (!makeContainer) {
                //if a property is valid, initialized the container first
                const errorTextContainer = document.createElement("div");
                errorTextContainer.classList.add(
                  `Form-Control-Error-Text-Container-${formControlElement}`
                );
                this.#addUniqueIdentifier(errorTextContainer);
                errorTextFrag = errorTextContainer;
                makeContainer = !makeContainer;
              }

              const errorTextElement = document.createElement("div");
              errorTextElement.classList.add(
                `Form-Control-Error-Text-${formControlElement}`
              );
              this.#addUniqueIdentifier(errorTextElement);
              errorTextElement.innerText =
                this.#config.fragmentTextData[formControlElement].errorBoxText[
                  errorType
                ];
              if (makeContainer && errorTextFrag !== undefined) {
                errorTextFrag.append(errorTextElement);
              }
            }
          }
          if (makeContainer && errorTextFrag !== undefined) {
            return errorTextFrag;
          }
        }
      },
    };

    #typesOfErrors = [
      "valueMissing",
      "typeMismatch",
      "patternMismatch",
      "tooShort",
      "tooLong",
      "rangeUnderflow",
      "rangeOverflow",
      "stepMismatch",
      "badInput",
    ];

    //will be for creating the entire form control, will reference the generic template builders, but will
    //append the correct form control input element themselves, they will return an entire form control fragment ready to be
    //appended to the form element
    #formControlGutsBuilders = {
      email: function (props) {},

      confirmEmail: function (props) {},

      address: function (props) {},

      stateOrProvince: function (props) {},

      country: function (props) {},

      postalCode: function (props) {},

      password: function (props) {},

      confirmPassword: function (props) {},

      dateOfBirth: function (props) {},

      phoneNumber: function (props) {},

      creditCardType: function (props) {},

      creditCardNumber: function (props) {},

      creditCardExpDate: function (props) {},

      creditCardSecurityNumber: function (props) {},

      subjectLineOne: function (props) {},

      subjectLineTwo: function (props) {},

      textBoxOne: function (props) {},

      textBoxTwo: function (props) {},
    };
  }

  class DynamicOptionsManager {
    //a mixture between the form fragment constructor and the main functionality manager as it will
    //create and render specific input elements such as options for data lists dynamically, this will be used
    //in instances such as rendering in options based on the data set being dynamic, such as countries, or card payment
    //types, as well as render in options based on already selected options, such as relevant states to the selected country.
    //This class will use various geocoding API's in order to facilitate this dynamic rendering
  }

  class AutoFillFields {
    //will be used to autofill fields if the user allows such, this includes allowing access to ones location,
    //or allowing browser apis to autofill common form fields etc
  }

  class ElementCacheManager {
    #refsCache = {};
    //will be used to manage all element references created in the form instance, this way it makes it easier to target specific elements based
    //on the situation automatically, also it prevents multiple queries of the same elements.
    //Thinking about adding an API that allows this class to emit all of it's references to a global DOM refs cache.
  }

  class FunctionalityManager {
    //will append all necessary functionality to the created HTML form fragment, including the validation
    //and actual submission logic if necessary
  }

  class Main_UserInfoForm {
    //will incorporate all of the other class intances, as this class will act as the main hub that encompasses all of the functionality of
    //the form and handle certain state data attached to such
    init(parentElement) {}
  }

  const DefaultValues = {
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

  class CreateFinalConfig {
    constructor(configObj) {
      if (configObj.applyDefaultValues) {
        this.#stateData.applyDefaultValues = configObj.applyDefaultValues;
      } else if (
        configObj.type !== "custom" &&
        Object.keys(formPresets).includes(configObj.type)
      ) {
        this.#stateData.applyDefaultValues =
          formPresets[configObj.type].applyDefaultValues;
        this.#stateData.applyTemplate = true;
      }
    }

    #stateData = {
      applyDefaultValues: true,
      applyTemplate: false,
    };
  }

  function validateConfig(config) {
    const allErrors = [];

    if (typeof config !== "object") {
      allErrors.push(
        `ERROR: supplied config argument is not an object, received ${typeof config}`
      );
    }

    const { uniqueIdentifier, type, formControlElements, rules } =
        validationMethods,
      errorsUI = uniqueIdentifier(config),
      errorsType = type(config),
      errorsFCE = formControlElements(config),
      errorsRules = rules(config);

    [errorsUI, errorsType, errorsFCE, errorsRules].forEach((errors) => {
      return errors.forEach((error) => {
        return allErrors.push(error);
      });
    });

    return allErrors;
  }

  //check if the target data is in the correct format and a usable value
  const validationMethods = {
    uniqueIdentifier: function (configObj) {},
    type: function (configObj) {},
    formAttributes: function (configObj) {},
    formControlElements: function (configObj) {},
    formControlText: function (configObj) {},
    functionalityRules: function (configObj) {},
    thirdPartyApiRules: function (configObj) {},
  };

  function newClassInstance(config) {
    const allErrorStrings = validateConfig(config);
    if (allErrorStrings.length < 0) {
      return new Main_UserInfoForm(config);
    } else {
      const allErrorInstances = allErrorStrings.map((errorString) => {
        return new Error(errorString);
      });
      throw allErrorInstances;
    }
  }

  return { newClassInstance, addPreset };
}

// configObj = {
//    uniqueIdentifier: "",   (always required) (must be a string) (must match something that you would put within a class, because it's going to be used as a class tag)
//    type: "",   (always required) (must be a string) (must match either 'custom' for a custom setup or one of the various presets)
//    formAction: "", (always required, determines the form instance, action attribute)
//    formMethod: "", (always required, determines the form instance, method attribute)
//    formControlElements = [],  (if type set to custom this property is required) (not necessary if type property isn't custom) (defines the form control elements to include) (each element must be a string and unique, also order counts but not critical) (can be stacked on top of a form template to include extra forms)
//    applyDefaultValues: true,
//    formControlAttributes: {
//        specificFormControl1: {...properties},     (used to define specific inline attributes on specific elements, this is for defining say the name for a specific form control input etc)
//        specificFormControl2: {...properties},      (optional, if not used then default values will be used in place, but an error will throw if you disable default value use and fail to define attribute values)
//        ...,                                        (can use a mixture of default properties and custom properties if you wanted to this way, custom properties have a higher hierarchy and will be applied over default ones)
//    }
//    formControlText: {
//        specificFormControl1: {...properties},     (used to define specific text attributes on specific elements, this is for defining say the text for a specific form control label, and all of its individual error box values)
//        specificFormControl2: {...properties},      (optional, if not used then default values will be used in place, but an error will throw if you disable default value use and fail to define attribute values)
//        ...,                                        (can use a mixture of default properties and custom properties if you wanted to this way, custom properties have a higher hierarchy and will be applied over default ones)
//    },
//    functionalityRules: {
//      validateInputs: true,
//      useConstraintAPI: true,               (filled in properties help to define some user form functionality, such as input event listening, or submit event listening, using the constraint API etc.)
//      listenOnInput: true,
//      listenOnSubmit: true,
//      regexpInputPatterns: {
//        specificFormControl1: pattern,     (used to define specific form control input patterns for input validation)
//        specificFormControl2: pattern,      (optional, if not used then default values will be used in place, but an error will throw if you disable default value use and fail to define attribute values)
//        ...,
//      },
//    },
//    thirdPartyApiRules: {
//
//    },
//}
//
// configuration value application hierarcy from bottom to top application, the top most application will be the most concurrent value application.
// bottom: Default values(if enabled) mid: preset form template values(if used) top: all custom properties defined by the config file
// This way you can mix-match default values, preset form template data, and custom data in order to meet your needs in a more concise manner.
