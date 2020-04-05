const request = require("request");

const geoCode = (location, callback) => {
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic29tYW5uYW11IiwiYSI6ImNrOGUwejdobTA1M2UzZW8wa254YXMwa3MifQ.xsjSVJSJ9hVLk71QxSXdJA&limit=1`;

  request({ url: geoCodeUrl, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to location services.");
    } else if (body.error || body.features.length === 0) {
      callback("Given location is not valid.");
    } else {
      const data = body.features[0];
      callback(undefined, {
        longitude: data.center[0],
        latitude: data.center[1],
        location: data.place_name
      });
    }
  });
};

module.exports = geoCode;
