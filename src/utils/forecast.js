const fetch = require('node-fetch');

const forecast = (lat, long, callback) => {
  const url=`http://api.weatherstack.com/current?access_key=${process.env.FORECAST_TOKEN}&query=${lat},${long}`;

  fetch(url, {
    method: 'get',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  })
  .then(res => res.json())
  .then(function ({error, current}) {
    if(error) {
      callback('Unable to find location', undefined);
    } else {
      const degree = current.temperature;
      const chanceRain = (current.precip || 0) * 100;
      const description = current.weather_descriptions[0];
      callback(undefined, `${description} It is currently ${degree} degrees out. There is a ${chanceRain}% of rain`);
    }
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}

module.exports = forecast;