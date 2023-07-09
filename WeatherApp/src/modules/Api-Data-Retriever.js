class WeatherApi {
  //will be for initializing the supplied key to the stored end point string
  constructor(key) {}

  //stores the api key supplied to the constructor
  #configData = {
    apiKey: null,
  };

  //holds key value pairs for existing data retrievals that exist on a constant interval
  #storedRetrievalIntervals = {};

  //holds the string templates needed to construct the entire https request link
  //split into two parts because the target city needs to be supplied as a parameter,
  //which it will be sandwiched between these two templates in order to make a complete url
  #endPointStringTemplate = {
    firstHalf: `https://api.weatherapi.com/v1/weather?q=`,
    secondHalf: `&key=${this.#configData.apiKey}`,
  };

  //will contain methods for either retrieving data only once or on a specific interval when needed
  #retrievalMethods = {
    fixedInterval: (city, interval) => {
      if (city in this.#storedRetrievalIntervals === false) {
        const { firstHalf, secondHalf } = this.#endPointStringTemplate,
          assembledLink = firstHalf + city + secondHalf;

        let existingPromise = false;

        //sets an interval to fetch from the api at a fixed rate that was supplied
        this.#storedRetrievalIntervals[city] = setInterval(() => {
          if (!existingPromise) {
            //defines that a new promise for fetching the api data has been made, so the interval doesn't make more
            //calls than necessary
            existingPromise = true;

            //creates a new fetch promise that when resolved will toggle the existing promise to false,
            //this way only one fetch promise can be actually made at one time, as opposed to stacking
            //promises indefinitely, which can really stack the api calls
            fetch(assembledLink)
              .then((resp) => {
                return resp.json();
              })
              .then((data) => {
                existingPromise = false;
                return data;
              })
              .catch((error) => {
                console.error(error, error.stack);
              });
          }
        }, interval);
      } else {
        throw new Error(
          `Supplied city to retrieve weather data from at an interval is already present as a declared interval, received ${city}`
        ); // for when a specific interval already exists, you can declare the interval twice
      }
    },
    singleRequest: async (city) => {
      //creates a fetch link corresponding to the city targeted
      const { firstHalf, secondHalf } = this.#endPointStringTemplate,
        assembledLink = firstHalf + city + secondHalf;

      //gets the response from the api using the link made
      //then treats it as a json response
      try {
        const response = await fetch(assembledLink),
          dataObj = await response.json();

        return dataObj;
      } catch (error) {
        console.error(error, error.stack);
      }
    },
  };

  //entry point method used by the various retrieveWeatherData methods in order to pick which #retrievalMethods
  //method to use based on the supplied args
  #retrieveData(config) {}

  //will stop an existing functionality to retrieve data on a specific interval
  stopExistingRetrievalInterval(instanceKey) {}

  //holds different methods to retrieve data based on the basic parameter
  retrieveWeatherData = {
    city: (city, rule, interval) => {},
  };
}

export class ApiDataRetriever {
  //acts as an entrypoint in order to retrieve data from a specific api end point
  //This class will act as a controller class, at which it will simply create a new
  //instance of the helper class that corresponds to the api that you want to retrieve data from
  constructor(selectedApi, key) {}

  //will hold key value pairs to valid apis to target, where the key will be the name of the api, and
  //the value will be a reference to the helper class instance that represents the api essentially
  #validApis = {
    WeatherAPI: WeatherApi,
  };

  //will return a helper class instance that represents the api that you want to retrieve data from,
  //of course if said api is a valid api instance to reference.
  //The helper instance will already be configured with the key that you used, and will have a unique
  //set of apis that pertain to its own use case
  returnApiInstance() {}
}
