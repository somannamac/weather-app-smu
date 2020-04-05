const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('./Utils/geoCode');
const forecast = require('./Utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Somanna Machamada'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Somanna Machamada'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    }
 
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast({latitude, longitude}, (forecastError, {forecast}) => {
        if (forecastError) {
          return res.send({ error: forecastError });
        }
        res.send({
          address: req.query.address,
          location,
          forecast
        });
      });
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'For help contact 8884531122',
        name: 'Somanna Machamada'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Somanna Machamada',
        errorMsg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Somanna Machamada',
        errorMsg: 'Page not found'
    })
});

app.listen(3000, () => {
    console.log('Server is up and running in port 3000');
});