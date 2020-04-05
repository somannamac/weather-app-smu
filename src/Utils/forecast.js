const request = require('request');

const forecast = (data, callback) => {
    const forecastUrl = `https://api.darksky.net/forecast/4e5583d8cf1981dfb6dc4fb6c6123cba/${data.latitude},${data.longitude}?units=si`

    request({url: forecastUrl, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services');
        } else if(body.error){
            callback('unable to find weather info for the given location');
        } else{
            const {temperature, precipProbability} = body.currently;
            callback(undefined, {
                forecast: `${body.daily.data[0].summary} It is currently ${body.currently.temperature}°C out. There is a ${body.currently.precipProbability}% chance of rain.`
            });
        }
    })
};

module.exports = forecast;