import { WeatherLocationSearchBar } from "./modules/Level-1/Weather-Location-Search-Bar.js";

const searchBar = new WeatherLocationSearchBar("balls");

searchBar.subscribe("balls", (data) => {
  console.log(data, "it works");
});

searchBar.append(document.body);
