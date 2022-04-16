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

    if (cached) return cached

    let apiResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt`)

    const data = apiResponse.data

    let temperature = convert_temperature(data.main.temp)
    let minTemperature = convert_temperature(data.main.temp_min)
    let maxTemperature = convert_temperature(data.main.temp_max)

    let cityName = data.name

    let responseFunction = change_background_icon(data.weather[0].main)

    let icon = responseFunction[0]
    let weather = responseFunction[1]

    let weatherDescription = data.weather[0].description
    let wind = (data.wind.speed * 3.6).toFixed(1) + " km/h"
    let cloudiness = data.clouds.all + "%"
    let sunrise = convert_date(data.sys.sunrise)
    let sunset = convert_date(data.sys.sunset)
    let humidity = data.main.humidity + "%"

    let hour = new Date()
    hour = hour.getHours() + ":" + hour.getMinutes()

    let countryName = await discover_country_name(data.sys.country)

    return {
        temperature, minTemperature, maxTemperature, cityName, icon,
        weather, weatherDescription, wind,
        humidity, cloudiness, sunrise, sunset, countryName, hour
    }

}

module.exports = callApi