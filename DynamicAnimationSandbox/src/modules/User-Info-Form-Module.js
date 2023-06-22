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
    constructor(configObj) {
      this.#applyConfigToState(configObj);
      this.assembledForm = this.#buildCompleteForm(); //returns entire form fragment with all of the necessary form control elements within it
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

    #applyConfigToState(configObj) {
      //applies all of the relevant properties within the config to the state cache
      for (let property in this.#config) {
        if (configObj[property]) {
          this.#config[property] = configObj[property];
        } else {
          throw new Error(
            `FATAL ERROR: within scope of '#applyConfigToState' of class instance '${this.constructor.name}' : essential property missing from the final configuration object supplied, lacks ${property}, cannot create form fragment, check the default and or template configuration data if applicable, \n${error.stack}`
          );
        }
      }
    }

    #buildCompleteForm() {
      //build the actual form element, this will always be the same for any form creation instance
      const formElement = this.#buildFormElement();

      //create all of the corresponding form elements that are listed in the formControlElements array
      if (Array.isArray(this.#config.formControlElements)) {
        for (let formControlElement of this.#config.formControlElements) {
          const createdFormControlFrag =
            this.#formControlElementBuilders[formControlElement](); //invokes the corresponding method based on the current form control element
          formElement.append(createdFormControlFrag);
        }
      } else {
        throw new Error(
          `FATAL ERROR: within scope of '#initializeFormCreation' of class instance 'FormFragmentConstructor' : essential property 'this.#config.formControlElement' is not the correct data type, should be an array full of strings containing individual form control element references, check the default and or template configuration data if applicable, \n${error.stack}`
        );
      }
    }

    #buildFormElement() {
      const formElement = document.createElement("form"),
        { action, method } = this.#config.formAttributes;

      if (action) {
        formElement.setAttribute("action", action);
      } else {
        throw new Error(``);
      }

      if (method) {
        formElement.setAttribute("method", method);
      } else {
        throw new Error(``);
      }

      this.#addUniqueIdentifier(formElement);

      return formElement;
    }

    #addUniqueIdentifier(element) {
      if (element.nodeType === Node.ELEMENT_NODE) {
      } else if (element.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      } else {
        throw new Error(
          `FATAL ERROR: within '#addUniqueIdentifier' of class instance Frag`
        );
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

    #formControlElementComponents = {
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

    //will be for creating the entire form control, will reference the generic template builders, but will
    //append the correct form control input element themselves, they will return an entire form control fragment ready to be
    //appended to the form element
    #formControlElementBuilders = {
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
    constructor(configObj) {
      this.#stateData.configObj = new CreateFinalConfig(configObj); //creates final config
      this.#stateData.formFragment = new FormFragmentConstructor(
        this.#stateData.configObj
      ).init(); //creates an entire form using the settings in the stored config
      this.#stateData.elementCache = new ElementCacheManager(
        this.#stateData.configObj,
        this.#stateData.formFragment
      ); //maps out all of the element references within the form created
      this.#stateData.functionalityManager = new FunctionalityManager(
        this.#stateData.configObj,
        this.#stateData.elementCache
      ); //applies functionality using the element references stored within the cache
      this.#stateData.autoFillFields = new AutoFillFields(
        this.#stateData.configObj,
        this.#stateData.functionalityManager
      ); //applies a specific functionality to autofill fields using event listeners from the functionality manager
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
      parentElement.append(this.#stateData.formFragment);
    }
  }

  class CreateFinalConfig {
    constructor(configObj) {
      //returns an object representing the final configuration that the other classes will use to determine their behavior
      //will only contain data that is necessary, and data that has been processed by the data merging hierarchy
      if (
        configObj.applyDefaultValues &&
        configObj.applyDefaultValues === false
        //condition for defining the state of this class in the instance of a custom configuration by the user
      ) {
        this.#stateData.applyDefaultValues = false;
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
        //checks if the supplied user config property even exists or is undefined
        if (formControlElements) {
          dataSetArr.push(formControlElements);
        }

        //merges all present data sets within dataSetArr into one large array, and creates a set in order to remove duplicates
        //the set then converted into an array, and the array is returned
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
        //checks if the supplied user config property even exists or is undefined
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
        //checks if the supplied user config property even exists or is undefined
        if (formControlAttributes) {
          dataSetArr.push(formControlAttributes);
        }

        //will set finalConfig equal to the first element in the data set, and then iterate through the other
        //data sets and update the individual properties that either aren't present from a lower hierarchy in the finalConfig accordingly
        //The nesting is needed in order to iterate over the dataSetArr, iterate over the existing formControlElements within
        //any of the data sets, and then iterate over the individual attributes within a specific form control element
        for (let i = 0; i < dataSetArr.length; i++) {
          //if starting the loop, set finalConfig equal to the first target config element
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            //iterate over all of the targeted form control elements
            for (let formControlElement in dataSetArr[i]) {
              //if the form control element being referenced from the target config element is not being referenced in the finalConfig,
              //simply apply the entire form control rule to the finalConfig, and then continue to the next iteration of the loop immediately
              if (!finalConfig[formControlElement]) {
                finalConfig[formControlElement] =
                  dataSetArr[i][formControlElement];
                continue;
              }

              //if the form control element is being referenced in both config data sets, iterate
              //through the attributes of the target config element form control element, and apply the existing values of existing properties
              //from such to the finalConfig
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

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        //The nesting is needed in order to iterate over the dataSetArr, then iterate over the existing
        //formControlElements, then iterate over the text properties within the corresponding form control element
        //and then iterate over the properties within the error text property if currently targeted

        for (let i = 0; i < dataSetArr.length; i++) {
          //if first starting the loop, set the first element equal to the final config variable
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            //if not at the start of the loop, iterate through the properties of the current target config element
            for (let formControlElement in dataSetArr[i]) {
              //if the target form control element is not referenced at all within the finalConfig, apply the
              //property in its entirety to the finalConfig from the currently targeted config element,
              //if this happens, continue to the next form control element immediately
              if (!finalConfig[formControlElement]) {
                finalConfig[formControlElement] =
                  dataSetArr[i][formControlElement];
                continue;
              }

              //if the target form control element exists within finalConfig, iterate over all of the properties
              for (let textProperty in dataSetArr[i][formControlElement]) {
                //special condition if the text property is errorBoxText, its value should be an object thus needs to be iterated over
                //also checking for the existence of this property within final config at the same time
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
                  //if the property is a regular property that isn't equal to an object nor is it errorBoxText
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
        //checks if the supplied user config property even exists or is undefined
        if (functionalityRules) {
          dataSetArr.push(functionalityRules);
        }

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        for (let i = 0; i < dataSetArr.length; i++) {
          //if first starting the loop, set finalConfig equal to the first element
          if (i === 0) {
            finalConfig = dataSetArr[0];
          } else {
            //if not, iterate through the target config element and set the corresponding properties on the finalConfig equal to those found on the target config element
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
        //checks if the supplied user config property even exists or is undefined
        if (thirdPartyApiRules) {
          dataSetArr.push(thirdPartyApiRules);
        }

        //sets the first element of the dataSetArr as the finalConfig, then iterates over every individual property
        //and either adds missing properties or makes updates to existing ones.
        for (let i = 0; i < dataSetArr.length; i++) {
          //if starting the loop, set finalConfig equal to the first element
          if (i === 0) {
            finalConfig = dataSetArr[i];
          } else {
            //iterate through the rules that exist within the target config element and apply the data to the corresponding rules within finalConfig
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
          return `CONFIG VALIDATION ERROR: uniqueIdentifier property either isn't a string or a valid string(cannot contain spaces or special characters besides a dash and or underscore), \n${error.stack}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: uniqueIdentifier property doesn't exist, this property is required as the information attached is required for the module to function and create a new form instance, \n${error.stack}`;
      }

      return null;
    },
    applyDefaultValues: function (configObj) {
      //checks for the existence of this property, optional, will be set to true in most cases by default or through a template
      if (configObj.applyDefaultValues) {
        //checks if the value of this property is a boolean
        if (typeof configObj.applyDefaultValues !== "boolean") {
          return `CONFIG VALIDATION ERROR: applyDefaultValues property should have a boolean value, but it does not, received ${configObj.applyDefaultValues}, \n${error.stack}`;
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
            return `CONFIG VALIDATION ERROR: type property isn't set to an existing form template or the 'custom' type, here is a list of available form templates ${existingFormTemplates}, \n${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: type property isn't a string, received ${configObj.type}, \n${error.stack}`;
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
              return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but some required properties that should exist within this object are missing, the properties 'formAction' and 'formMethod' should be referenced and have a defined value attached to them in order for the module to create a new class instance, \n${error.stack}`;
            } else {
              //iterates over all of the properties, in this case the formAction and formMethod properties must exist at the very least, but also scans for optional properties
              for (let attribute in configObj.formAttributes) {
                //checks if the target attribute is even a valid attribute
                if (!formAttributesRef.includes(attribute)) {
                  return `CONFIG VALIDATION ERROR: unrecognized form attribute within the formAttributes property object, received ${attribute}, \n${error.stack} `;
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
                    return `CONFIG VALIDATION ERROR: value for a specific attribute is not valid, received ${configObj.formAttributes[attribute]} for ${attribute}, here is a list of valid attributes to target '${validationRefs.formAttributes[attribute]}, \n${error.stack}'`;
                  }
                } else {
                  //fails the previous checks
                  return `CONFIG VALIDATION ERROR: value for the ${attribute} attribute is not a valid data type, here is the data type to be expected ${validationRefs.formAttributes[attribute]}, \n${error.stack}`;
                }
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the formAttributes property was declared, and the value of this property is an object, but this object doesn't contain any form attributes within it, \n${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: required property formAttributes was declared, but the value associated with it is not the right data type, needs to be an object, \n${error.stack}`;
        }
      } else {
        return `CONFIG VALIDATION ERROR: formAttributes property must always be used because the information within it is required for the module to function and create a new form instance, \n${error.stack}`;
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
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlAttributes property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}', \n${error.stack}`;
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
                      return `CONFIG VALIDATION ERROR: target property is supposed to be a valid regular expression, received ${configObj.formControlAttributes[element][property]} for ${property}, within ${element} of the property formControlAttributes, \n${error.stack}`;
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
                      return `CONFIG VALIDATION ERROR: value of a specific attribute is not a valid selection within formControlAttributes and ${element}, received ${configObj.formControlAttributes[element][property]}, here are a list of available corresponding property values, \n${error.stack}`;
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a target attribute value either does not meet the requirements for either the data type or equal a valid possible value, received ${configObj.formControlAttributes[element][property]}, valid formats and or possible inputs for this attribute are ${validationRefs.formControlAttributes[property]}, \n${error.stack}`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlAttributes was declared, and a correct form control element was targeted, but the value of said form control element property isn't an object, received ${element} and ${configObj.formControlAttributes[element]} as its value, \n${error.stack}`;
              }
            });
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlAttributes property was declared, but isn't a correct data type, must be an object, \n${error.stack}`;
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
                return `CONFIG VALIDATION ERROR: unrecognized form control element, received ${element} within the formControlElements property array, here are the available form control elements to use ${formControlElements}, \n${error.stack}`;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: formControlElements was declared, and is an array, but doesn't contain any form control elements, \n${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: formControlElements was declared, but isn't a correct data type, must be an array, \n${error.stack}`;
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
                return `CONFIG VALIDATION ERROR: unrecognized form control element within the formControlText property, received ${element}, here is a list of valid form control elements to use '${validationRefs.formControlElements}', \n${error.stack}`;
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
                    )}', \n${error.stack}`;
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
                        return `CONFIG VALIDATION ERROR: validation failure property unrecognized, received ${validationFailureTextProperty} within ${element}, \n${error.stack}`;
                      }
                      if (
                        typeof configObj.formControlText[element][textProperty][
                          validationFailureTextProperty
                        ] !== "string"
                        //checks if the value of the target valildationFailureText property is a valid data type, that being a string
                      ) {
                        return `CONFIG VALIDATION ERROR: value of a validation failure text property is not the correct, received ${configObj.formControlText[element][textProperty][validationFailureTextProperty]} for ${validationFailureTextProperty} in ${element} of formControlText, \n${error.stack}`;
                      }
                    }
                  } else {
                    return `CONFIG VALIDATION ERROR: a text property value is not the correct data type, received ${configObj.formControlText[element][textProperty]} for ${textProperty} within formControlText, needs to be a string for all properties except the validationFailure property, \n${error.stack}`;
                  }
                }
              } else {
                return `CONFIG VALIDATION ERROR: formControlText was declared, is an object, and contains target form control element(s), but ${element} equals an empty object, here is a list of text properties to use within this object ${Object.keys(
                  validationRefs.formControlText
                )}, \n${error.stack}`;
              }
            });
          } else {
            return `CONFIG VALIDATION ERROR: the property formControlText was used and equals an object, but the object contains no properties within it, the properties should reference specific form control elements, and their values should be objects filled with the corresponding attributes desired, \n${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the property formControlText was used but isn't a valid data type, must be an object, \n${error.stack}`;
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
                return `CONFIG VALIDATION ERROR: unrecognized targeted rule, received ${rule}, here is a list of valid rules to target "${functionalityRulesRef}", \n${error.stack}`;
              } else if (
                typeof configObj.functionalityRules[rule] ===
                validationRefs.functionalityRules[rule]
              ) {
                //checks if the value of the target rule is valid or not, should be a boolean value
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule within functionalityRules is not a valid data type, received ${configObj.functionalityRules[rule]}, should be a boolean, \n${error.stack}`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, and its value is an object, but the object doesn't contain any functionality rules, here is a list of functionality rules to target '${Object.keys(
              validationRefs.functionalityRules
            )}', \n${error.stack}`;
          }
        } else {
          return `CONFIG VALIDATION ERROR: the functionalityRules property was declared, but its value is not an object, this object should only contain valid functionality rules as properties and their allowed associated values, \n${error.stack}`;
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
                return `CONFIG VALIDATION ERROR: unrecognized rule detected, received ${rule} within thirdPartyApiRules, here is a list of valid rules to target, ${thirdPartyApiRulesRef}, \n${error.stack}`;
              }

              if (
                typeof configObj.thirdPartyApiRules[rule] ===
                validationRefs.thirdPartyApiRules[rule]
              ) {
                //checks to see if the valid rule has a value in the correct data type, which it should be a boolean
                continue;
              } else {
                return `CONFIG VALIDATION ERROR: value of a specific rule ${rule} within thirdPartyApiRules has an incorrect data type, should be a boolean, \n${error.stack}`;
              }
            }
          } else {
            return `CONFIG VALIDATION ERROR: thirdPartyApiRules was declared, and its value is an object, but the object does not contain any rules, here are a list of rules you can target ${thirdPartyApiRulesRef}, \n${error.stack}`;
          }
        } else {
          return `ERROR: thirdPartyApiRules was declared, but the value of the property is not an object, \n${error.stack}`;
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
        `CONFIG VALIDATION ERROR: supplied config argument is not an object, received ${typeof config}, \n${
          error.stack
        }`
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
//        formnovalidate: null,               (inline property, doesn't need a value)
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
