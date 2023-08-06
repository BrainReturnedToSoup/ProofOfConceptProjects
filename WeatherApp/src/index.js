import { WeatherApp } from "./modules/Level-3/Weather";
import { CurrentLocationWeather } from "./modules/Level-2/Weather-Current-Location";

// (() => {
//   const weatherApp = new WeatherApp();

//   weatherApp.append(document.body);
// })();

const CLW = new CurrentLocationWeather(`d9563f6e601e4aa199a205713232607`);

CLW.subscribeToApiData("test", (data) => {console.log(data)})

CLW.requestCurrentLocation();
