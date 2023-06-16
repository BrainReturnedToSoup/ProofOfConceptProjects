export function UserInfoFormModule() {
  const defaultValues_FormTemplateBuilder = {
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

  const uniqueInstances = [];

  class FormTemplateBuilder {
    constructor(configObj) {}
    
    #classBehavior = {
      useDefaultValues: true,
    };
    #fragmentData = {};

    #DOMtemplates = {
      mainContainer: `
        <form action="${this.#fragmentData.formAction}" method="${
        this.#fragmentData.formMethod
      }" class="${this.#fragmentData.uniqueIdentifier}">
        </form>
        `,
      formControlTemplate: `

      `,
      submissionButton: `
        `,
    };
  }

  class DynamicOptionsManager {}

  class ElementCacheManager {
    #refsCache = {};
  }

  class MainFunctionalityManager {}

  class UserInfoForm {
    //will incorporate all of the other class intances, as this class will act as the main hub that encompasses all of the functionality of
    //the form and handle certain state data attached to such
    init(parentElement) {}
  }

  function checkForUniqueInstance(uniqueIdentifier) {
    if (
      uniqueIdentifier.replace(/\s/g, "") === uniqueIdentifier &&
      uniqueIdentifier.split("").length > 0
      //checks to see if the supplied string isn't just a bunch of spaces, a completely empty string, or contains any number of spaces since this identifier is appended to every form element class
    ) {
      if (uniqueInstances.includes(uniqueIdentifier)) {
        //if the string passes this check, it can then be looked for in the uniqueInstances array to see if this identifier is already being used on a different form instance.
        //if if does, throw an error
        throw new Error(
          `ERROR: supplied unique identifier has already been used for a form class instance`
        );
      }
    } else {
      //error thrown if the string supplied fails the space check
      throw new Error(
        `ERROR: supplied string for the unique identifier is not useable as a class tag, received ${uniqueIdentifier}`
      );
    }
  }

  function validateConfig(configObj) {
    //the start of the sanitization process, which checks for the most crucial formats first, because regardless of the
    //context of invocation, these properties are mandatory for the module to work correctly
    if (
      typeof configObj === "object" &&
      configObj.type &&
      typeof configObj.type === "string" &&
      configObj.type !== "custom"
      //if the configObj is in fact an object, checks for the type object, and if it exists whether it's a string itself, and checking if the string isn't equal to 'custom'
    ) {
      return instancePresets(configObj);
    } else if (
      typeof configObj === "object" &&
      configObj.type &&
      typeof configObj.type === "string" &&
      configObj.type === "custom"
      //if the configObj is in fact an object, checks for the type object, and if it exists whether it's a string itself, and checking if the string is equal to 'custom'
    ) {
      return customConfigSanitizer(configObj);
    } else if (typeof configObj !== "object") {
      //error for if the value of configObj isn't even an object
      throw new Error(
        `ERROR: supplied config is not an object, received ${configObj}`
      );
    } else if (!configObj.type || typeof configObj.type !== "string") {
      //error for whether the type property exists on the configObj or if the value of this property isn't a string
      throw new Error(
        `ERROR: the type property on the config object is either not a valid format or undefined, received ${configObj.type}`
      );
    }
  }

  function customConfigSanitizer(configObj) {
    if (
      configObj.uniqueIdentifier &&
      typeof configObj.uniqueIdentifier === "string"
      //checks for the existence of the uniqueIdentifier property and whether it's a string
    ) {
      checkForUniqueInstance(configObj.uniqueIdentifier);

      //fallthrough switch statement used to check for existing configuration properties and to validate the ones that do exist, these are less crucial properties
      //used to determine the form instance behavior, but won't break the functionality if these properties aren't included in the config object
      switch (true) {
        case property1 in configObj:

        case property1 in configObj:
      }
    } else {
      throw new Error(
        //error for whether the uniqueIdentifier property doesn't exist on the configObj or if the type of said property isn't valid
        `ERROR: the uniqueIdentifier property on the config object is either an incorrect format, or does not exist, received ${configObj.uniqueIdentifier} for a custom config property`
      );
    }
  }

  function instancePresets(configObj) {
    if (
      configObj.uniqueIdentifier &&
      typeof configObj.uniqueIdentifier === "string"
      //checks for the existence of the uniqueIdentifier property and whether it's a string
    ) {
      checkForUniqueInstance(configObj.uniqueIdentifier);
      const { type } = configObj;
      //the type property should be equal to the desired preset if not set to custom
      if (instancePresetsList[type]) {
        //if the type property is equal to an existing preset, return the config object for the corresponding preset
        return instancePresetsList[type];
      } else {
        //if the type property is not equal to any existing preset, throw and error
        throw new Error(
          `ERROR: type property not equal to an existing preset, received ${type}`
        );
      }
    } else {
      throw new Error(
        //error for whether the uniqueIdentifier property doesn't exist on the configObj or if the type of said property isn't valid
        `ERROR: the uniqueIdentifier property on the config object is either an incorrect format, or does not exist, received ${configObj.uniqueIdentifier} for an instance preset config property `
      );
    }
  }

  function newClassInstance(config) {
    validateConfig(config);
    //function used to check if the supplied config argument is valid so that the class constructor can use it without issues,
    //if the supplied config argument fails the validation, then an error is thrown corresponding to what it failed
    //if no errors are thrown through this process the argument is good to be used in the class instance

    return new UserInfoForm(config);
  }

  return { newClassInstance };
}
