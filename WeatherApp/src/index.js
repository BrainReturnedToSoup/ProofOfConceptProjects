const displayData = async () => {
  const weatherDataRes = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=1b02a8d7c80a47a992443529230607&q=London&aqi=no"
    ),
    weatherDataObj = await weatherDataRes.json();

  console.log(weatherDataObj);
};

displayData();