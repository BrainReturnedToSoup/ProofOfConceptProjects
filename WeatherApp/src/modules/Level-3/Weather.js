//general dependencies
import { ElementRefManager } from "../Level-0/Element-Ref-Manager.js";
import { WeatherApi } from "../Level-0/Api-Interfaces.js";
import { CurrentLocationQuery } from "../Level-1/Current-Location-Query.js";

//specific implementation for this app specifically
import { WeatherLocationSearchBar } from "../Level-2/Weather-Location-Search-Bar.js";
import { WeatherAppConstructor } from "../Level-2/Weather-App-Constructor.js";

//orchestrates all of these sub classes together in order to form the entire weather app
//will inject dependencies where they are needed etc. Will provide a way to customize
//some features with the weather app
export class WeatherApp {
  constructor() {}

  //-------------------ARGUMENT-VALIDATION-----------------//
  append(parentElement) {}
}

//config = {
//  numberOfDaysForecast: [3, 7],
//  currentWeatherStats: boolean,
//  currentTempStats: boolean,
//  forecastTimeframe: [daily, hourly, both],
//  date: boolean,
//  tempUnit: [F, C, both],
//  locationSearchBar: boolean,
//  useCurrentLocation: boolean,
//  weatherApiSource: [''],
//  apiKey: string,
//  }

//for current location query class
const mediatorMethod = (lon, lat, apiInstance) => {
  const locationString = `${lat},${lon}`, //create the coords string in a way that works with the api interface for a location
    responsePromise = apiInstance.getCurrentWeather(locationString); //get the weather using said coords string as the location string

  return responsePromise;
};
