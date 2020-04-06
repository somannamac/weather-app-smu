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
            const {summary, temperatureMax, temperatureMin, humidity} = body.daily.data[0];
            callback(undefined, {
                forecast: [summary, `It is currently ${temperature}°C out.`, `There is a ${precipProbability}% chance of rain.`, `Today's maximum temperature will be ${temperatureMax}°C and the minimum will be ${temperatureMin}°C.`, `The humidity is ${Math.floor(humidity*100)}%.`]
            });
        }
    })
};

module.exports = forecast;