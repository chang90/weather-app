const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'name'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'name'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help',
    name: 'name',
    message: 'this is a help msg'
  })
})

app.get('/weather', (req, res) => {
  const {
    address
  } = req.query;
  if (!address) {
    return res.send({
      error: 'no address'
    })
  }

  geocode(address, (error, {
    lat,
    lon,
    location
  } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    console.log(`Lat: ${lat}, Long: ${lon}`);
    forecast(lat, lon, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      
      res.send({
        forecastData,
        location,
        address
      })
    })
  })


})

app.get('/products', (req, res) => {
  const {
    search,
    rating
  } = req.query;
  console.log(search, rating)
  if (!search) {
    return res.send({
      error: 'no search term'
    })
  }
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'help',
    name: 'name',
    pageTitle: 'Help article'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'name',
    pageTitle: 'Page'
  })
})

app.listen(3000, () => {
  console.log('Sever is up')
})