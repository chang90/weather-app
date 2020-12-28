const fetch = require('node-fetch');

const geocode = (address, callback)=> {
  console.log(process.env.GEOCODE_TOKEN)
  urlGeo = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.GEOCODE_TOKEN}`
  fetch(urlGeo, {
    method: 'get',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  })
  .then(res => res.json())
  .then(function ({error, features}) {
    if (error || !features || features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        lat: features[0].center[1], 
        lon: features[0].center[0],
        location: features[0].place_name
      });
    }
  })
  .catch(function (error) {
    console.log('Request failed', error);
    callback(error, undefined);
  });
}

module.exports = geocode;

