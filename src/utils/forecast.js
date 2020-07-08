const request = require('request')
const weather_api = (lat, long, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=5a85682a6a2066fdcffe31f9d35ab8bd&units=metric'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather-service', undefined)

        } else if (body.cod === '400') {
            callback('Invalid location coordinates!!', undefined)


        } else {
            let celcius = body.main.temp
            celcius = celcius.toFixed(2)
            let cloud = body.clouds.all
            let wea = body.weather[0].description
            let string = 'iT is' + " " + celcius + ' degree C and cloud cover is ' + cloud + ' % and it is ' + wea + ".The maximum temperature is " + body.main.temp_max + " degrees C  and the minimum temperature is " + body.main.temp_min + " degree C"
            callback(undefined, string)
        }
    })

}
module.exports = weather_api