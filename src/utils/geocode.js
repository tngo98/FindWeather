import axios from "axios";

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidG5nbzk4IiwiYSI6ImNrajRxdGZjcDEzM3kycXBkeXZya2NmOXYifQ.A-fv5i6x31eAT_-0Q3AHDA&limit=1";

  axios
    .get(url)
    .then((response) => {
      if (response.data.features.length === 0) {
        callback("Unable to find location. Try another search.", undefined);
      } else {
        callback(undefined, {
          longitude: response.data.features[0].center[0],
          latitude: response.data.features[0].center[1],
          location: response.data.features[0].place_name,
        });
      }
    })
    .catch((error) => {
      if (error) {
        callback("Unable to connect to location services!", undefined);
      }
    });
};

export { geocode };
