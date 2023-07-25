import { ElementRefManager } from "./modules/Level-0/Element-Ref-Manager";
import { WeatherLocationSearchBar } from "./modules/Level-2/Weather-Location-Search-Bar";

const searchBar = new WeatherLocationSearchBar("test", "null");

searchBar.append(document.body);

searchBar.subscribeToSearchBarInput("test", (input) => {
  console.log("inputValue", input);
});
searchBar.subscribeToApiData("test", (data) => {
  console.log("apiData", data);
});
