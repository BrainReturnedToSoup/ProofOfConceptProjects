import { WeatherApp } from "./modules/Level-3/Weather";

(() => {
  const weatherApp = new WeatherApp();

  weatherApp.append(document.body); //append the app fragment
  
  weatherApp.useUserLocation(); //request the user location for weather data 
})();
