const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const envPath = path.join(__dirname, './.env');
require('dotenv').config({ path: envPath });
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directories 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        link: '/',
        text: 'Use this site to get the weather!',
        name: 'George Soto',
        randomFact: 'The scientific term for brain freeze is “sphenopalatine ganglioneuralgia"'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        link: '/about',
        name: 'George Soto',
        randomFact: 'In 2006, a Coca-Cola employee offered to sell Coca-Cola secrets to Pepsi. Pepsi responded by notifying Coca-Cola.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        link: '/help',
        helpMessage: 'Sorry, the info you are looking for is out on break!',
        name: 'George Soto',
        randomFact: 'If you cut down a cactus in Arizona, you’ll be penalized up to 25 years in jail. It is similar to cutting down a protected tree species.'
    })
})


app.get('/weather', (req, res) => {
    !req.query.address ? res.send({ error: 'you must provide an address' }) :
        geocode(req.query.address, (error, { lat, long, location } = {}) => {
            error ? res.send({ error }) : weather(lat, long, (error, { temp, feelsTemp, forecast } = {}) => {
                error ? res.send({ error }) : res.send({ temp, feelsTemp, forecast, location });
            })
        })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article Not Found!',
        name: 'George Soto',
        randomFact: 'The largest known prime number has 17,425,170 digits. The new prime number is 2 multiplied by itself 57,885,161 times, minus 1.'
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: "Whoops we couldn't find the page you are looking for!",
        name: 'George Soto',
        randomFact: 'If you cut down a cactus in Arizona, you’ll be penalized up to 25 years in jail. It is similar to cutting down a protected tree species.'
    })
});

app.listen(3000, () => {
    console.log('app is listening on port 3000');
});