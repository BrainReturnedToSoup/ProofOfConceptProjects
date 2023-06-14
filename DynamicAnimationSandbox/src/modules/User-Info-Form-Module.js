export function UserInfoFormModule() {
  const uniqueInstances = [];

  const instancePresetsList = {
    newAccountBasic: {},
    newAccountFull: {},
    paymentBasic: {},
    paymentFull: {},
    login: {},
    passwordReset: {},
    subscriptionBasic: {},
    contactBasic: {},
  };

  class FragmentBuilder {
    #fragmentData = {
      formAction: "#",
      formMethod: "get",
      uniqueIdentifier: "",
      emailLabelText: "Email",
      emailErrorBoxText: { syntax: "Input not a valid email address" },
      confirmEmailLabelText: "Confirm Email",
    };

    #templates = {
      mainContainer: `
        <form action="${this.#fragmentData.formAction}" method="${
        this.#fragmentData.formMethod
      }" class="${this.#fragmentData.uniqueIdentifier}">
        </form>
        `,
      secondaryContainer: `
        <div class="Form-Control-Container ${
          this.#fragmentData.uniqueIdentifier
        }"></div>
        `,
      email: `
        <div class="Email-Form-Control-Container ${
          this.#fragmentData.uniqueIdentifier
        }">
            <label for="Email-Form-Control_${
              this.#fragmentData.uniqueIdentifier
            }">${this.#fragmentData.emailLabelText}</label>
            
            <input class="Email-Form-Control ${
              this.#fragmentData.uniqueIdentifier
            }" id="Email-Form-Control_${this.#fragmentData.uniqueIdentifier}"
            name="Email-Form-Control_${
              this.#fragmentData.uniqueIdentifier
            }_Var">

            <div class="Email-Form-Control-Error ${
              this.#fragmentData.uniqueIdentifier
            }></div>
        </div>
        `,
      confirmEmail: `

        `,
      address: `

        `,
      state: `

        `,
      country: `

        `,
      zipCode: `

        `,
      password: `

        `,
      confirmPassword: `

        `,
      dateOfBirth: `
        
        `,
      phoneNumber: `
        
        `,
      subjectLine: `

        `,
      textBox: `

        `,
      submissionButton: `
        `,
    };
  }

  class ElementCacheManager {
    #refsCache = {};
  }

  class FunctionalityManager {}

  class UserInfoForm {
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

  function processedConfig(configObj) {
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
    const finalConfig = processedConfig(config);
    //should return an object that holds the object that will be sent off and interpreted by the class constructors

    if (typeof finalConfig === "object") {
      return new UserInfoForm(finalConfig);
    } else {
      //error just in case for what ever reason that the value of the finalConfig variable isn't an object
      throw new Error(
        `ERROR: cannot create new user info form instance, final configuration variable not an object, received ${finalConfig}`
      );
    }
  }

  return { newClassInstance };
}

//
