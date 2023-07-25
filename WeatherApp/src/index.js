import { WeatherAppConstructor } from "./modules/Level-2/Weather-App-Constructor";
import { ElementRefManager } from "./modules/Level-0/Element-Ref-Manager";

const refManagerInstance = new ElementRefManager(),
  weatherAppPageInstance = new WeatherAppConstructor(refManagerInstance),
  pageFrag = weatherAppPageInstance.returnWeatherAppFragment();

document.body.append(pageFrag);

console.log(refManagerInstance.size());
