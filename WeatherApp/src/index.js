import { WeatherApp } from "./modules/Level-3/Weather";

import "./stylesheets/Reset.css";
import "./stylesheets/Main.css";

import "./stylesheets/General_Info.css";
import "./stylesheets/Current_Weather.css";
import "./stylesheets/UI.css";
import "./stylesheets/Forecast.css";

(() => {
  const weatherApp = new WeatherApp();

  weatherApp.append(document.body); //append the app fragment

  weatherApp.useUserLocation(); //request the user location for weather data
})();
