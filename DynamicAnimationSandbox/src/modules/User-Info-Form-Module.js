export function UserInfoFormModule() {
  const defaultValues_FormFragmentConstructor = {
    fragmentTextData: {
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
    fragmentAttributes: {},
    formControlsUsed: ["email"],
  };

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
    }
    //constructor acts as the entry point at which to apply the various configurations to the constructor instance

    //data sets that the constructor will base all of its construction of fragments off of in this instance
    //determines the form controls used, their specific attributes, their specific text, and whether to include
    //elements relevant to the constraint API if this instance uses such
    #config = {
      fragmentTextData: {}, //keys should be the corresponding form control element name that matches the method for the constructor
      formControlsUsed: [], //elements should be the corresponding form control element name that matches the method for the constructor
      fragmentAttributes: {}, //keys should be the corresponding form control element name that matches the method for the constructor
      useContraintAPI: true,
      uniqueIdentifier: "NOT-SET",
      formAction: "#",
      formMethod: "get",
    };

    #processConfigObj(configObj) {
      this.#processConfigHierarchy.formControlElements(configObj);
      this.#processConfigHierarchy.formText(configObj);
      this.#processConfigHierarchy.formElementsAttributes(configObj);
      this.#applyConfig.constraintAPI(configObj);
    }

    //abstracted the processing into their own methods even if some of the code repeats, but
    //this is to make it easier to fine tune processing in the future as well as help with debugging the module
    #processConfigHierarchy = {
      formControlElements: (configObj) => {
        let useTemplate = false,
          useDefault = true,
          selectedTemplateFormControlElements,
          defaultFormControlElements =
            defaultValues_FormFragmentConstructor.formControlsUsed,
          appliedConfigsArr = [];

        if (
          configObj.applyDefaultValues &&
          configObj.applyDefaultValues.FormFragmentConstructor &&
          configObj.applyDefaultValues.FormFragmentConstructor === false
        ) {
          useDefault = false;
        }

        if (configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            this.#formControlsUsed =
              formPresets[configObj.type].formControlsUsed;
          } else {
            throw new Error(
              `ERROR: template does not exist, received ${
                configObj.type
              }, available templates are "${Object.keys(formPresets)}"`
            );
          }
        }
        if (useDefault) {
          appliedConfigsArr.push(defaultFormControlElements);
        }

        if (useTemplate) {
          appliedConfigsArr.push(selectedTemplateFormControlElements);
        }

        appliedConfigsArr.push(configObj.formControlElements);

        //all used config data specifically for text fields will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        this.#applyConfigHierarchy.formControlElements(appliedConfigsArr);
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
            selectedTemplateTextValues =
              formPresets[configObj.type].fragmentTextData;
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

        appliedConfigsArr.push(configObj.formControlText);

        //all used config data specifically for text fields will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        this.#applyConfigHierarchy.formText(appliedConfigsArr);
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

        appliedConfigsArr.push(configObj.defaultFormControlElementAttributes);

        //all used config data specifically for form control elements will be pushed into the appliedConfigsArr in order
        //from bottom to top, the last element will be the most current data set applied,
        //which this array can feature any combination of default, template, and custom values
        this.#applyConfigHierarchy.formElementsAttributes(appliedConfigsArr);
      },
    };

    //used to take the present data and apply it to the various class state data structures,
    //these methods may either accept an array demonstrating the hierary, or simply reference a specific property in
    //the config file
    #applyConfig = {
      formControlElements: function (appliedConfigsArr) {},
      formText: function (appliedConfigsArr) {},
      formElementsAttributes: function (appliedConfigsArr) {},
      constraintAPI: (configObj) => {
        if (
          configObj.functionalityRules &&
          configObj.functionalityRules.useConstraintAPI
        ) {
          this.#useContraintAPI = configObj.functionalityRules.useConstraintAPI;
        } else if (configObj.type && configObj.type !== "custom") {
          if (formPresets[configObj.type]) {
            this.#config.useContraintAPI =
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
    };

    //this is the entrypoint at which the final configuration has been initialized and
    //the form corresponding to the configuration starts its creation
    #useFinalConfig() {}

    //takes the array of the various form control elements included as per the configuration, and starts the creation
    //of the templates
    #buildForm(elementsArr) {}

    //creates the actual form element wrapper fragment, needs rules to define the various properties and such
    #constructBaseTemplate(formWrapperRules) {}

    //methods for creating the corresponding form control element with all of the necessary properties applied to such
    //these will create entire fragments, and then return the fragments
    #formControlConstructors = {
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

  class MainFunctionalityManager {
    //will append all necessary functionality to the created HTML form fragment, including the validation
    //and actual submission logic if necessary
  }

  class Main_UserInfoForm {
    //will incorporate all of the other class intances, as this class will act as the main hub that encompasses all of the functionality of
    //the form and handle certain state data attached to such
    init(parentElement) {}
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
//    applyDefaultValues: {
//        formFragmentContructor: true,
//        DynamicOptionsManager: true,
//        AutoFillFields: true,                   (determines if the various classes will pull from a default value preset, this is separate from the various form templates, this is the true default values of various characteristics, modules will pull from a default value set by default)
//        ElementCacheManager: true,
//        MainFunctionalityManager: true,
//        Main_UserInfoForm: true,
//    },
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
