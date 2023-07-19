import { WeatherLocationSearchBar } from "./modules/Level-2/Weather-Location-Search-Bar.js";

const searchBar = new WeatherLocationSearchBar("Search");

searchBar.subscribe("balls", (data) => {
  console.log(data, "it works");
});

searchBar.append(document.body);
