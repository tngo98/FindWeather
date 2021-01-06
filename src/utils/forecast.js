import axios from "axios";

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=38d025df86978de10b50ad70a9dfabc7&query=" +
    latitude +
    "," +
    longitude;

  axios
    .get(url)
    .then((response) => {
      if (response.data.error) {
        callback("Unable to find location.", undefined);
      } else {
        callback(undefined, {
          description: response.data.current.weather_descriptions[0],
          temperature: response.data.current.temperature + "°C",
          feelslike: response.data.current.feelslike + "°C",
          icon: response.data.current.weather_icons[0],
        });
      }
    })
    .catch((error) => {
      if (error) {
        callback("Unable to connect to weather services!", undefined);
      }
    });
};

export { forecast };

// response.data.current.weather_descriptions[0] +
// ". It is " +
// response.data.current.temperature +
// " degrees out but it feels like " +
// response.data.current.feelslike +
// " degrees."
