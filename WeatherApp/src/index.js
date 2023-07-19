import { WeatherLocationSearchBar } from "./modules/Level-2/Weather-Location-Search-Bar.js";

const searchBar = new WeatherLocationSearchBar(
  "Search",
  "58d62657e3c444ae9a725813231907"
);

searchBar.subscribe("balls", (data) => {
  console.log(data, "it works");
});

searchBar.append(document.body);
