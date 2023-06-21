import { config } from "webpack";

export function UserInfoFormModule() {
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
    //  <label></label>
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

      fileUpload: function (props) {},
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
      //returns an object representing the final configuration that the other classes will use to determine their behavior
      //will only contain data that is necessary, and data that has been processed by the data merging hierarchy
      if (configObj.applyDefaultValues) {
        this.#stateData.applyDefaultValues = configObj.applyDefaultValues;
      } else if (
        configObj.type !== "custom" &&
        Object.keys(formPresets).includes(configObj.type)
      ) {
        this.#stateData.applyDefaultValues =
          formPresets[configObj.type].applyDefaultValues;
        this.#stateData.applyTemplate = true;
        this.#stateData.templateName = configObj.type;
      }

      this.uniqueIdentifier = configObj.uniqueIdentifier;
      this.formAction = configObj.formAction;
      this.formMethod = configObj.formMethod;

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
      defaultValues: DefaultValues,
    };

    #dataMergingMethods = {
      formControlElements: function (formControlElements) {
        const dataSetArr = [];

        if (this.#stateData.applyDefaultValues) {
          dataSetArr.push(this.#stateData.defaultValues.formControlElements);
        }
        if (this.#stateData.applyTemplate) {
          dataSetArr.push(
            formPresets[this.#stateData.templateName].formControlElements
          );
        }
        dataSetArr.push(formControlElements);

        //merges all present data sets within dataSetArr into one large array, and creates a set in order to remove duplicates
        //the set then converted into an array, and the array is returned
        if (dataSetArr.length > 1) {
          const finalConfig = Array.from(new Set([].concat(...dataSetArr)));
          return finalConfig;
        } else if (dataSetArr.length === 1) {
          return dataSetArr[0];
        }
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
        dataSetArr.push(formControlAttributes);

        //will set finalConfig equal to the first element in the data set, and then iterate through the other
        //data sets and update the individual properties that either aren't present from a lower hierarchy in the finalConfig accordingly
        //The nesting is needed in order to iterate over the dataSetArr, iterate over the existing formControlElements within
        //any of the data sets, and then iterate over the individual attributes within a specific form control element
        for (let i = 0; i < dataSetArr.length; i++) {
          if (!dataSetArr[i]) break;
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let formControlElement in dataSetArr[i]) {
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
        dataSetArr.push(formControlText);

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        //The nesting is needed in order to iterate over the dataSetArr, then iterate over the existing
        //formControlElements, then iterate over the text properties within the corresponding form control element
        //and then iterate over the properties within the error text property if currently targeted
        for (let i = 0; i < dataSetArr.length; i++) {
          if (!dataSetArr[i]) break;
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            for (let formControlElement in dataSetArr[i]) {
              for (let textProperty in dataSetArr[i][formControlElement]) {
                if (textProperty === "errorBoxText") {
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
        dataSetArr.push(functionalityRules);

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        for (let i = 0; i < dataSetArr.length; i++) {
          if (!dataSetArr[i]) break;
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
        dataSetArr.push(thirdPartyApiRules);

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        for (let i = 0; i < dataSetArr.length; i++) {
          if (!dataSetArr[i]) break;
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
      if (configObj.uniqueIdentifier) {
        const cleanedIdentifier = configObj.uniqueIdentifier.replace(
          /[\s~`!@#$%^&*()\=+[{\]}\\|;:'",<.>/?]/g,
          ""
        );

        //if the property isn't a string, or the cleaned version isn't the same as the uncleaned version, this means invalid characters were used
        if (
          typeof configObj.uniqueIdentifier !== "string" ||
          configObj.uniqueIdentifier !== cleanedIdentifier
        ) {
          return `CONFIG VALIDATION ERROR: uniqueIdentifier property either isn't a string or a valid string(cannot contain spaces or special characters besides a dash and or underscore)`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: uniqueIdentifier property doesn't exist, this property is required as the information attached is required for the module to function and create a new form instance`;
      }

      return null;
    },
    applyDefaultValues: function (configObj) {
      //checks for the existence of this property, optional, will be set to true in most cases by default or through a template
      if (configObj.applyDefaultValues) {
        //checks if the value of this property is a boolean
        if (typeof configObj.applyDefaultValues !== "boolean") {
          return `CONFIG VALIDATION ERROR: applyDefaultValues property should have a boolean value, but it does not, received ${configObj.applyDefaultValues}`;
        }
      }
      return null;
    },
    type: function (configObj) {
      if (configObj.type) {
        //checks for existence of the type property, this property is mandatory to include in the config
        if (typeof configObj.type === "string") {
          //checks if the value of this property is a string
          const existingFormTemplates = Object.keys(formTemplates);

          if (
            configObj.type !== "custom" &&
            !existingFormTemplates.includes(configObj.type)
          ) {
            //checks if the type property is either equal to the 'custom' string or another string which helps determine the final configuration data set
            return `CONFIG VALIDATION ERROR: type property isn't set to an existing form template or the 'custom' type, here is a list of available form templates ${existingFormTemplates}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: type property isn't a string, received ${configObj.type}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: type property doesn't exist`;
      }

      return null;
    },
    formAttributes: function (configObj) {
      //checks for existence of the property, this property is mandatory
      if (configObj.formAttributes) {
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
              return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but some required properties that should exist within this object are missing, the properties 'formAction' and 'formMethod' should be referenced and have a defined value attached to them in order for the module to create a new class instance`;
            } else {
              //iterates over all of the properties, in this case the formAction and formMethod properties must exist at the very least, but also scans for optional properties
              for (let attribute in configObj.formAttributes) {
                //checks if the target attribute is even a valid attribute
                if (!formAttributesRef.includes(attribute)) {
                  return `CONFIG VALIDATION ERROR: unrecognized form attribute within the formAttributes property object, received ${attribute}, `;
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
                    return `CONFIG VALIDATION ERROR: value for a specific attribute is not valid, received ${configObj.formAttributes[attribute]} for ${attribute}, here is a list of valid attributes to target '${validationRefs.formAttributes[attribute]}'`;
                  }
                } else {
                  //fails the previous checks
                  return `CONFIG VALIDATION ERROR: value for the ${attribute} attribute is not a valid data type, here is the data type to be expected ${validationRefs.formAttributes[attribute]}`;
                }
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but this object doesn't contain any form attributes within it`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: required property formAttributes was declared, but the value associated with it is not the right data type, needs to be an object`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: formAttributes property must always be used because the information within it is required for the module to function and create a new form instance`;
      }

      return null;
    },
    formControlAttributes: function (configObj) {
      if (configObj.formControlAttributes) {
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
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlAttributes property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}'`;
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
                      return `CONFIG VALIDATION ERROR: target property is supposed to be a valid regular expression, received ${configObj.formControlAttributes[element][property]} for ${property}, within ${element} of the property formControlAttributes`;
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
                      return `CONFIG VALIDATION ERROR: value of a specific attribute is not a valid selection within formControlAttributes and ${element}, received ${configObj.formControlAttributes[element][property]}, here are a list of available corresponding property values`;
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a target attribute value either does not meet the requirements for either the data type or equal a valid possible value, received ${configObj.formControlAttributes[element][property]}, valid formats and or possible inputs for this attribute are ${validationRefs.formControlAttributes[property]}`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlAttributes was declared, and a correct form control element was targeted, but the value of said form control element property isn't an object, received ${element} and ${configObj.formControlAttributes[element]} as its value`;
              }
            });
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlAttributes property was declared, but isn't a correct data type, must be an object`;
        }
      }

      return null;
    },
    formControlElements: function (configObj) {
      //checks if formControlElements property exists, optional property
      if (configObj.formControlElements) {
        //checks if the property value is equal to an array
        if (Array.isArray(configObj.formControlElements)) {
          //checks if said array contains any elements within it
          if (configObj.formControlElements.length > 0) {
            //checks the validity of each element in the array, making sure each element is an actual form control element
            configObj.formControlElements.forEach((element) => {
              if (!validationRefs.formControlElements.includes(element)) {
                return `CONFIG VALIDATION ERROR: unrecognized form control element, received ${element} within the formControlElements property array, here are the available form control elements to use ${formControlElements}`;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: formControlElements was declared, and is an array, but doesn't contain any form control elements`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlElements was declared, but isn't a correct data type, must be an array`;
        }
      }

      return null;
    },
    formControlText: function (configObj) {
      //checks for the existence of the property
      if (configObj.formControlText) {
        //checks if the value of the property is an object
        if (typeof configObj.formControlText === "object") {
          const formControlElements = Object.keys(configObj.formControlText);
          //checks if the resulting object contains any keys, hence the form control elements being targeted
          if (formControlElements.length > 0) {
            //checks every target form control element to see if they are all valid
            formControlElements.forEach((element) => {
              if (!validationRefs.formControlElements.includes(element)) {
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlText property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}'`;
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
                    )}'`;
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
                        return `CONFIG VALIDATION ERROR: validation failure property unrecognized, received ${validationFailureTextProperty} within ${element}`;
                      }
                      if (
                        typeof configObj.formControlText[element][textProperty][
                          validationFailureTextProperty
                        ] !== "string"
                        //checks if the value of the target valildationFailureText property is a valid data type, that being a string
                      ) {
                        return `CONFIG VALIDATION ERROR: value of a validation failure text property is not the correct, received ${configObj.formControlText[element][textProperty][validationFailureTextProperty]} for ${validationFailureTextProperty} in ${element} of formControlText`;
                      }
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a text property value is not the correct data type, received ${configObj.formControlText[element][textProperty]} for ${textProperty} within formControlText, needs to be a string for all properties except the validationFailure property`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlText was declared, is an object, and contains target form control element(s), but ${element} equals an empty object, here is a list of text properties to use within this object ${Object.keys(
                  validationRefs.formControlText
                )}  `;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: the property formControlText was used and equals an object, but the object contains no properties within it, the properties should reference specific form control elements, and their values should be objects filled with the corresponding attributes desired`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the property formControlText was used but isn't a valid data type, must be an object`;
        }
      }

      return null;
    },

    functionalityRules: function (configObj) {
      //checks for the existence of the property, which is optional
      if (configObj.functionalityRules) {
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
                return `CONFIG VALIDATION ERROR: unrecognized targeted rule, received ${rule}, here is a list of valid rules to target "${functionalityRulesRef}"`;
              } else if (
                typeof configObj.functionalityRules[rule] ===
                validationRefs.functionalityRules[rule]
              ) {
                //checks if the value of the target rule is valid or not, should be a boolean value
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule within functionalityRules is not a valid data type, received ${configObj.functionalityRules[rule]}, should be a boolean`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, and its value is an object, but the object doesn't contain any functionality rules, here is a list of functionality rules to target '${Object.keys(
              validationRefs.functionalityRules
            )}'`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, but its value is not an object, this object should only contain valid functionality rules as properties and their allowed associated values`;
        }
      }
      return null;
    },
    thirdPartyApiRules: function (configObj) {
      //checks for the existence of the property, optional
      if (configObj.thirdPartyApiRules) {
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
                return `CONFIG VALIDATION ERROR: unrecognized rule detected, received ${rule} within thirdPartyApiRules, here is a list of valid rules to target, ${thirdPartyApiRulesRef}`;
              }

              if (
                typeof configObj.thirdPartyApiRules[rule] ===
                validationRefs.thirdPartyApiRules[rule]
              ) {
                //checks to see if the valid rule has a value in the correct data type, which it should be a boolean
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule ${rule} within thirdPartyApiRules has an incorrect data type, should be a boolean`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: thirdPartyApiRules was declared, and its value is an object, but the object does not contain any rules, here are a list of rules you can target ${thirdPartyApiRulesRef}`;
          }
        } else {
          return `ERROR: thirdPartyApiRules was declared, but the value of the property is not an object`;
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
      spellcheck: "boolean",
      size: "number",
      tabindex: "number",
      formnovalidate: null,
    },
    formAttributes: {
      formAction: "string",
      formMethod: "string",
      formTarget: ["_blank", "_self", "_parent", "_top"],
      formenctype: [
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
      ],
      "aria-label": "string",
      "aria-labelledby": "string",
      "aria-describedby": "string",
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
        `CONFIG VALIDATION ERROR: supplied config argument is not an object, received ${typeof config}`
      );
    }

    //will iterate over every existing validation method, supply the config
    //to it, and then catch every returned string and push it into the all errors array
    Object.keys(validationMethods).forEach((method) => {
      const validationString = validationMethods[method](config);
      if (typeof validationString === "string") {
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
//    uniqueIdentifier: "",   (always required) (must be a string) (must match something that you would put within a class, because it's going to be used as a class tag)
//    type: "",   (always required) (must be a string) (must match either 'custom' for a custom setup or one of the various presets)
//    formAttributes: {
//        formAction: "",   (always required) (must be a string)
//        formMethod: "",   (always required) (must be a string, and from the list of valid inputs)
//        formTarget: "",   (optional) (must be a string, and from the list of valid inputs)
//        formenctype: "", (optional) (must be a string, and from the list of valid inputs)
//        "aria-label": "", (optional) (must be a string)
//        "aria-labelledby": "",  (optional) (must be a string)
//        "aria-describedby": "", (optional) (must be a string)
//    }
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
//    },
//    thirdPartyApiRules: {
//      useZeroBounce: true,
//      useGeoNames: true,
//      useSmartyStreets: true,
//      useStripe: true,
//      useNumVerify: true,
//    },
//}
//
// configuration value application hierarcy from bottom to top application, the top most application will be the most concurrent value application.
// bottom: Default values(if enabled) mid: preset form template values(if used) top: all custom properties defined by the config file
// This way you can mix-match default values, preset form template data, and custom data in order to meet your needs in a more concise manner.
