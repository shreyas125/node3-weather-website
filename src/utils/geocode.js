const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hyNzciLCJhIjoiY2tieW9kcXp5MTF0cjJ4bXgyMnZjNnoxZSJ9.ZH_9Pc0XAzIaXzljoscE1g'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect!', undefined)
        } else if (body.features.length === 0) {
            callback('Location is invalid', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place_name: body.features[0].place_name
            })
        }

    })


}
module.exports = geocode