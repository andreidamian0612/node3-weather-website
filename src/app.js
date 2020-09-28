const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
publicDirectoryPath = path.join(__dirname, '../public')
viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'My Weather Application',
        name: 'Dama'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Dama'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help page',
        description: 'Here is the help page',
        name: 'Dama'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: ' You must provide an address'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        // console.log('Geocode was  OK, starting forecast')

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


    // geocode(cityName, (error, {latitude, longitude, location}) => {
    //     if (error) {
    //       return console.log(error)
    //     }
    
    //     forecast(latitude,longitude, (error, forecastData) => {
    //       if (error) {
    //         return console.log(error)
    //       }
    
    //       console.log(location)
    //       console.log(forecastData)
    //     })
    
    //   })



})


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: ' You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dama',
        errorMessage: 'Help article is not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dama',
        errorMessage: 'My 404 error message'
    })
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
})