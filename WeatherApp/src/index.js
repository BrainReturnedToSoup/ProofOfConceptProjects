import { WeatherApp } from "./modules/Level-3/Weather";

(() => {
  const weatherApp = new WeatherApp();

  weatherApp.append(document.body);
})();
