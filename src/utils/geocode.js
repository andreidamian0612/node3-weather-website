got = require('got')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGFtYTciLCJhIjoiY2tmZHdsZTF2MXR4cDJxbXFmcTcwM2U2YSJ9.nLnvdLTkTqiBlBkG77XLsA'
  got(url, { responseType: 'json' }).then(response => {
    if (response.body.features.length === 0) {
      // console.log('the length is 0')
      callback('Unable to find location')
    } else {
      // console.log('the length is not 0')
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })

    }


  }).catch(error => {
    console.log(error)
    callback('Unable to connect to location services')
  })

}




module.exports = geocode