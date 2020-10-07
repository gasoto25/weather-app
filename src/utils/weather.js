const request = require("postman-request");

const weather = (lat, long, callback) => {
    const url =
        `http://api.weatherstack.com/current?access_key=${process.env.WEATHERAPIKEY}&query=${long},${lat}&units=f`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback(`Unable to connect to weather service! \n ${error}`, undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const temp = body.current.temperature;
            const feelsTemp = body.current.feelslike;
            const forecast = body.current.weather_descriptions[0];
            callback(undefined, { temp, feelsTemp, forecast });
        }
    });
}



module.exports = weather; 