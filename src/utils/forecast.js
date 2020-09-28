const got = require('got')
const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d6bb657ab98939452914d70265334f11&query=' + latitude + ',' + longitude
  // console.log(url)
  got(url, { responseType: 'json' }).then(response => {
    if (response.body.error) {
      callback(response.body.error.info, undefined)

    } else {
      // console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' and it feels like ' + response.body.current.feelslike)

      callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' and it feels like ' + response.body.current.feelslike + '. The humidity is ' + response.body.current.humidity)
    }

  }).catch(error => {
    callback('Unable to get the weather', undefined)
  })



}

module.exports = forecast