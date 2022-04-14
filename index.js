const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

const cache = require('./src/redis/cache')
const callApi = require('./src/javascript/api')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', 'src/view')

app.get('/', (req, res) => {

    callApi('estados unidos')

    res.render('index', {
        temperature, minTemperature,
        maxTemperature, cityWeather,
        weatherDescription, wind,
        cloudiness, humidity, sunrise,
        sunset, hour,
    })

    // res.render('index', {
    //     temperature, maxTemperature, 
    //     minTemperature, cityWeather, 
    //     weatherDescription, wind, 
    //     cloudiness, humidity, 
    //     sunrise, sunset, hour
    // })
})

app.post('/', (req, res) => {
    res.send(req.body.cityName)
})

app.listen(PORT, () => console.log(`Server is at http://localhost:${PORT}`))