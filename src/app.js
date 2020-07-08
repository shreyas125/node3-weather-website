const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const public_directory_path = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, "../templates/partials")

// setup handlebars engines and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

// setup static directory to serve
app.use(express.static(public_directory_path))


app.get('', (req, res) => {
    res.render("index", {
        title: 'weather',
        name: 'Shreyas Bhide',
        footer: 'Created in 2020 @Shreyas Bhide'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Shreyas Bhide',
        footer: 'Created in 2020 @Shreyas Bhide'
    })
})

app.get('/help', (req, res) => {
    res.render('Help', {
        msg: 'This is a help page',
        title: 'help',
        name: 'Shreyas Bhide',
        footer: 'Created in 2020 @Shreyas Bhide'


    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide valid address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({

                forecast: forecastdata,
                location: place_name,
                address: req.query.address

            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })

    }
    console.log(req.query)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Shreyas Bhide',
        errormessage: 'Help article not found'

    })

})
app.get('*', (req, res) => {
    res.render('404', {
        errormessage: 'Page not found',
        title: '404',
        name: 'Shreyas Bhide'
    })


})

app.listen(port, () => {
    console.log('Server is up and running on port' + port)

})