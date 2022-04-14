const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.WEATHER_API_KEY

const convert_temperature = require('./temperature')
const change_background_icon = require('./change_icon')
const convert_date = require('./convert_date')
const discover_country_name = require('./country_name')

const callApi = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt`)
        .then(response => {
            
            const data = response.data

            let temp = convert_temperature(data.main.temp)
            let min_temp = convert_temperature(data.main.temp_min)
            let max_temp = convert_temperature(data.main.temp_max)

            let city_name = data.name
            let weather = change_background_icon(data.weather[0].main)
            let weather_description = data.weather[0].description
            let wind = (data.wind.speed * 3.6).toFixed(1) + " km/h"
            let cloudiness = data.clouds.all + "%"
            let sunrise = convert_date(data.sys.sunrise)
            let sunset = convert_date(data.sys.sunset)
            let humidity = data.main.humidity + "%"

            let hour_now = new Date()
            hour_now = hour_now.getHours() + ":" + hour_now.getMinutes()

            discover_country_name(data.sys.country)
                .then(response => {
                    city_weather_name.textContent = city_name + "(" + response + ")" + " - " + weather
                })

            return {
                temp, min_temp, max_temp,
                weather, weather_description, wind, 
                humidity, cloudiness, sunrise, sunset,
            }
        })
        .catch(e => {
            console.log(e.message)
        })

}

module.exports = callApi