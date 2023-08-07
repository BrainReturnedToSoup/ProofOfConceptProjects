export class GeneralInfoDataFilter {
  //----------ARGUMENT-VALIDATION----------//

  #argValidationData = {
    filterData: {
      data: {
        type: "object",
      },
    },
  };

  #validate = {
    type: (suppliedArg, argName, methodOrigin, correctType) => {
      if (typeof suppliedArg !== correctType) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed type validation,
                 received '${suppliedArg}' which has a type of '${typeof suppliedArg}',
                  needs to have the type '${correctType}'`
        );
      }
    },
    instanceof: (suppliedArg, argName, methodOrigin, correctInstance) => {
      if (!(suppliedArg instanceof correctInstance)) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed instance validation,
                 received '${suppliedArg}' which is not an instance of '${correctInstance}'`
        );
      }
    },
  };

  #argValidator(methodName, argsObj) {
    if (this.#argValidationData.hasOwnProperty(methodName)) {
      const methodValidationData = this.#argValidationData[methodName];

      for (let arg in argsObj) {
        const argValue = argsObj[arg];

        //check if a supplied arg is a valid arg to supply
        if (!methodValidationData.hasOwnProperty(arg)) {
          throw new ReferenceError(
            `Unrecognized argument for a specific method, received '${arg}' with a value of '${argsObj[arg]}'`
          );
        }

        //go down the list of properties to check for on the specific arg
        for (let property in methodValidationData[arg]) {
          const correctValue = methodValidationData[arg][property]; //retrieve the data that will be used as a reference for validating the arg

          this.#validate[property](argValue, arg, methodName, correctValue); //validate the arg based on the property being checked currently
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to validate the supplied arguments for a specific method, validation data
               corresponding to this method does not exist, received '${methodName}' as the method being validated`
      );
    }
  }

  //-------------DATA-FILTERING------------//

  #createFilteredDataSet(data) {
    const locationData = data.location,
      filteredDataSet = {
        name: locationData.name,
        country: locationData.country,
      };

    return filteredDataSet;
  }

  //------------------APIs-----------------//

  //will take the data and the unit rules to commence a filtering process
  filterData(data) {
    try {
      this.#argValidator(`filterData`, { data }); //validate args

      const filteredDataSet = this.#createFilteredDataSet(data); //get a filtered data set using the supplied data

      return filteredDataSet; //returned said data set
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class CurrentWeatherDataFilter {
  //-----------ARGUMENT-VALIDATION---------//

  #argValidationData = {
    filterData: {
      data: {
        type: "object",
      },
      unitRules: {
        type: "object",
      },
    },
  };

  #validate = {
    type: (suppliedArg, argName, methodOrigin, correctType) => {
      if (typeof suppliedArg !== correctType) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed type validation,
                 received '${suppliedArg}' which has a type of '${typeof suppliedArg}',
                  needs to have the type '${correctType}'`
        );
      }
    },
    instanceof: (suppliedArg, argName, methodOrigin, correctInstance) => {
      if (!(suppliedArg instanceof correctInstance)) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed instance validation,
                 received '${suppliedArg}' which is not an instance of '${correctInstance}'`
        );
      }
    },
  };

  #argValidator(methodName, argsObj) {
    if (this.#argValidationData.hasOwnProperty(methodName)) {
      const methodValidationData = this.#argValidationData[methodName];

      for (let arg in argsObj) {
        const argValue = argsObj[arg];

        //check if a supplied arg is a valid arg to supply
        if (!methodValidationData.hasOwnProperty(arg)) {
          throw new ReferenceError(
            `Unrecognized argument for a specific method, received '${arg}' with a value of '${argsObj[arg]}'`
          );
        }

        //go down the list of properties to check for on the specific arg
        for (let property in methodValidationData[arg]) {
          const correctValue = methodValidationData[arg][property]; //retrieve the data that will be used as a reference for validating the arg

          this.#validate[property](argValue, arg, methodName, correctValue); //validate the arg based on the property being checked currently
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to validate the supplied arguments for a specific method, validation data
               corresponding to this method does not exist, received '${methodName}' as the method being validated`
      );
    }
  }

  //---------STATE-AND-CONFIG-DATA---------//

  #unitRules = null;

  //------------APPLY-UNIT-RULES-----------//

  #applyUnitRules(unitRules) {
    this.#unitRules = unitRules;
  }

  //-------------DATA-FILTERING------------//

  #createFilteredDataSet(data) {
    const { temp, windSpeed, precip, feelsLike, visibility } =
        this.#dataFilteringMethods,
      currentWeatherData = data.current;

    //create a new data set with filtered data
    const filteredDataSet = {
      conditionText: currentWeatherData.condition.text,
      temp: temp(currentWeatherData),
      feelsLike: feelsLike(currentWeatherData),
      precip: precip(currentWeatherData),
      humidity: `${currentWeatherData.humidity}%`,
      visibility: visibility(currentWeatherData),
      windSpeed: windSpeed(currentWeatherData),
      windDir: `${currentWeatherData.wind_dir}`,
      windDegree: `${currentWeatherData.wind_degree}deg`,
    };

    return filteredDataSet;
  }

  #dataFilteringMethods = {
    temp: (data) => {
      const { temperature } = this.#unitRules;

      if (temperature === "metric") {
        return `${data.temp_c} C`;
      } else if (temperature === "customary") {
        return `${data.temp_f} F`;
      }
    },
    windSpeed: (data) => {
      const { distance } = this.#unitRules;

      if (distance === "metric") {
        return `${data.wind_kph} kph`;
      } else if (distance === "customary") {
        return `${data.wind_mph} mph`;
      }
    },
    precip: (data) => {
      const { measurement } = this.#unitRules;

      if (measurement === "metric") {
        return `${data.precip_mm} mm`;
      } else if (measurement === "customary") {
        return `${data.precip_in} in`;
      }
    },
    feelsLike: (data) => {
      const { temperature } = this.#unitRules;

      if (temperature === "metric") {
        return `${data.feelslike_c} C`;
      } else if (temperature === "customary") {
        return `${data.feelslike_f} F`;
      }
    },
    visibility: (data) => {
      const { distance } = this.#unitRules;

      if (distance === "metric") {
        return `${data.vis_km} km`;
      } else if (distance === "customary") {
        return `${data.vis_miles} mi`;
      }
    },
  };

  //------------------APIs-----------------//

  filterData(data, unitRules) {
    try {
      this.#argValidator("filterData", { data, unitRules }); //validate args

      this.#applyUnitRules(unitRules); //apply the unit filtering rules to the state

      const filteredDataSet = this.#createFilteredDataSet(data); //make a filtered data set

      return filteredDataSet;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

export class ForecastDataFilter {
  //-----------ARGUMENT-VALIDATION---------//
  #argValidationData = {
    filterData: {
      data: {
        type: "object",
      },
      unitRules: {
        type: "object",
      },
    },
  };

  #validate = {
    type: (suppliedArg, argName, methodOrigin, correctType) => {
      if (typeof suppliedArg !== correctType) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed type validation,
                 received '${suppliedArg}' which has a type of '${typeof suppliedArg}',
                  needs to have the type '${correctType}'`
        );
      }
    },
    instanceof: (suppliedArg, argName, methodOrigin, correctInstance) => {
      if (!(suppliedArg instanceof correctInstance)) {
        throw new Error(
          `Argument '${argName}' for method '${methodOrigin}' failed instance validation,
                 received '${suppliedArg}' which is not an instance of '${correctInstance}'`
        );
      }
    },
  };

  #argValidator(methodName, argsObj) {
    if (this.#argValidationData.hasOwnProperty(methodName)) {
      const methodValidationData = this.#argValidationData[methodName];

      for (let arg in argsObj) {
        const argValue = argsObj[arg];

        //check if a supplied arg is a valid arg to supply
        if (!methodValidationData.hasOwnProperty(arg)) {
          throw new ReferenceError(
            `Unrecognized argument for a specific method, received '${arg}' with a value of '${argsObj[arg]}'`
          );
        }

        //go down the list of properties to check for on the specific arg
        for (let property in methodValidationData[arg]) {
          const correctValue = methodValidationData[arg][property]; //retrieve the data that will be used as a reference for validating the arg

          this.#validate[property](argValue, arg, methodName, correctValue); //validate the arg based on the property being checked currently
        }
      }
    } else {
      throw new ReferenceError(
        `Failed to validate the supplied arguments for a specific method, validation data
               corresponding to this method does not exist, received '${methodName}' as the method being validated`
      );
    }
  }

  //----------STATE-AND-CONFIG-DATA--------//

  #unitRules = null;

  //------------APPLY-UNIT-RULES-----------//

  #applyUnitRules(unitRules) {
    this.#unitRules = unitRules;
  }

  //-------------DATA-FILTERING------------//

  #createFilteredDataSet(data) {
    const forecastDataArr = data.forecast.forecastday,
      filteredForecastDataArr = [];

    for (let forecastDay of forecastDataArr) {
      const filteredDay = this.#filterByDay(forecastDay);

      filteredForecastDataArr.push(filteredDay);
    }

    return filteredForecastDataArr;
  }

  #filterByDay(singleDayData) {
    const dayDataObj = singleDayData.day,
      dayDate = singleDayData.date; //define the received data sets

    const { maxTemp, minTemp, totalPrecip } = this.#dataFilteringMethods; //reference the filtering methods

    const filteredDayData = {
      date: dayDate,
      conditionText: dayDataObj.condition.text,
      conditionImage: dayDataObj.condition.icon,
      maxTemp: maxTemp(dayDataObj),
      minTemp: minTemp(dayDataObj),
      totalPrecip: totalPrecip(dayDataObj),
    };

    return filteredDayData;
  }

  #dataFilteringMethods = {
    maxTemp: (dayDataObj) => {
      const { temperature } = this.#unitRules;
      let maxTempValue;

      if (temperature === "metric") {
        maxTempValue = `${dayDataObj.maxtemp_c} C`;
      } else if (temperature === "customary") {
        maxTempValue = `${dayDataObj.maxtemp_f} F`;
      }

      return maxTempValue;
    },
    minTemp: (dayDataObj) => {
      const { temperature } = this.#unitRules;
      let minTempValue;

      if (temperature === "metric") {
        minTempValue = `${dayDataObj.mintemp_c} C`;
      } else if (temperature === "customary") {
        minTempValue = `${dayDataObj.mintemp_f} F`;
      }

      return minTempValue;
    },
    totalPrecip: (dayDataObj) => {
      const { measurement } = this.#unitRules;
      let totalPrecip;

      if (measurement === "metric") {
        totalPrecip = `${dayDataObj.totalprecip_mm} mm`;
      } else if (measurement === "customary") {
        totalPrecip = `${dayDataObj.totalprecip_in} in`;
      }

      return totalPrecip;
    },
  };

  //------------------APIs-----------------//

  filterData(data, unitRules) {
    try {
      this.#argValidator("filterData", { data, unitRules }); //validate args

      this.#applyUnitRules(unitRules); //apply the unit filtering rules to the state

      const filteredDataSet = this.#createFilteredDataSet(data); //make a filtered data set

      return filteredDataSet;
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}
