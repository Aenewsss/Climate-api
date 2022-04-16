const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

const callApi = require('./src/javascript/api')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', 'src/view')

app.get('/', async (req, res) => {

    let response = await callApi('estados unidos')

    let { temperature, minTemperature, maxTemperature, weather,
        weatherDescription, wind, cloudiness, humidity, sunrise,
        sunset, hour, countryName, icon, cityName } = response

    res.render('index', {
        temperature, minTemperature,
        maxTemperature, weather,
        weatherDescription, wind,
        cloudiness, humidity, sunrise,
        sunset, hour, countryName, icon, cityName
    })
})

app.post('/', async (req, res) => {
    let { city } = req.body


    let response = await callApi(city)

    let { temperature, minTemperature, maxTemperature, weather,
        weatherDescription, wind, cloudiness, humidity, sunrise,
        sunset, hour, countryName, icon, cityName } = response

    res.render('index', {
        temperature, minTemperature,
        maxTemperature, weather,
        weatherDescription, wind,
        cloudiness, humidity, sunrise,
        sunset, hour, countryName, icon, cityName
    })
})

app.listen(PORT, () => console.log(`Server is at http://localhost:${PORT}`))