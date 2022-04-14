const axios = require('axios')

require('dotenv').config()

const API_KEY = process.env.WEATHER_API_KEY

const callApi = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt`)
        .then(response => {
            
            const data = response.data

            let temp = data.main.temp
            let min_temp = data.main.temp_min
            let max_temp = data.main.temp_max

            convert_temperature(temp, min_temp, max_temp)

            let city_name = data.name
            let weather = change_background_icon(data.weather[0].main)
            let weather_description = data.weather[0].description
            let windspeed = (data.wind.speed * 3.6).toFixed(1)
            let cloudiness = data.clouds.all
            let sunrise_date = convert_date(data.sys.sunrise)
            let sunset_date = convert_date(data.sys.sunset)
            let data_humidity = data.main.humidity

            let hour_now = new Date()
            hour_now = hour_now.getHours() + ":" + hour_now.getMinutes()

            discover_country_name(data.sys.country)
                .then(response => {
                    city_weather_name.textContent = city_name + "(" + response + ")" + " - " + weather
                })

            description_weather.textContent = weather_description
            wind.textContent = windspeed + " km/h"
            clouds.textContent = cloudiness + "%"
            humidity.textContent = data_humidity + "%"
            sunrise.textContent = sunrise_date
            sunset.textContent = sunset_date
            hour.textContent = hour_now
        })
        .catch(e => {
            console.log(e.message)
        })

}

module.exports = callApi