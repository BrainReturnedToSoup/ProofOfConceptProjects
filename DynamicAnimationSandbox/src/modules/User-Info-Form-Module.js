export function UserInfoFormModule() {
  const defaultValues_Main_UserInfoForm = {};
  const defaultValues_DynamicOptionsManager = {};
  const defaultValues_AutoFillFields = {};
  const defaultValues_MainFunctionalityManager = {};
  const defaultValues_FormFragmentConstructor = {
    uniqueIdentifier: "NOT-SET",

    formAction: "#",
    formMethod: "get",

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
      labelText: "Card Expiration Date",
      instructionsText: "",
      errorBoxText: {
        patternMismatch: "Value entered is not a valid expiration date",
        tooLong: "Value entered exceeds the maximum character count",
        tooShort: "Value entered fails to meet minimum character count",
        valueMissing: "Please enter a valid expiration date",
      },
    },

    creditCardSecurityNumber: {
      labelText: "Security Number",
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

    #classBehavior = {
      useDefaultValues: true,
      customConfig: false,
    };

    #fragmentData = {};

    #processConfigObj(configObj) {}

    #applyConfigHierarchy(configObj) {}

    #buildForm(elementsArr) {}

    #constructBaseTemplate(formWrapperRules) {}

    #constructAllFormControls(formControlRules) {}

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

    #formElementConstructors = {
      div: function (props) {},
      label: function (props) {},
      input: function (props) {},
      dataList: function (props) {},
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
    fragmentRules: function (configObj) {},
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
//    fragmentAttributes: {
//        specificFormControl1: {...properties},     (used to define specific attributes on specific elements)
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
