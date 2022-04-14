const axios = require('axios')
const cache = require('../redis/cache')

require('dotenv').config()

const API_KEY = process.env.WEATHER_API_KEY

const convert_temperature = require('./temperature')
const change_background_icon = require('./change_icon')
const convert_date = require('./convert_date')
const discover_country_name = require('./country_name')

async function callApi(city) {

    const cached = await cache.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt`)

    if(cached) return cached

    let temperature, minTemperature, maxTemperature, 
    cityName, icon, weather, weatherDescription, wind, 
    cloudiness, sunrise, sunset, humidity, hour, countryName
    
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt`)
        .then(async function (response) {

            const data = response.data

            temperature = convert_temperature(data.main.temp)
            minTemperature = convert_temperature(data.main.temp_min)
            maxTemperature = convert_temperature(data.main.temp_max)

            cityName = data.name

            let responseFunction = change_background_icon(data.weather[0].main)

            icon = responseFunction[0]
            weather = responseFunction[1]

            weatherDescription = data.weather[0].description
            wind = (data.wind.speed * 3.6).toFixed(1) + " km/h"
            cloudiness = data.clouds.all + "%"
            sunrise = convert_date(data.sys.sunrise)
            sunset = convert_date(data.sys.sunset)
            humidity = data.main.humidity + "%"

            hour = new Date()
            hour = hour.getHours() + ":" + hour.getMinutes()

            await discover_country_name(data.sys.country)
                .then(response => countryName = response)
                .catch(e => console.log(e))

        })
        .catch(e => {
            console.log(e.message)
        })

    return {
        temperature, minTemperature, maxTemperature, cityName, icon,
        weather, weatherDescription, wind,
        humidity, cloudiness, sunrise, sunset, countryName, hour
    }

}

module.exports = callApi