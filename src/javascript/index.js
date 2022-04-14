const WEATHER_API_KEY = '58ed21b9a57b536f61d0dcb1cdc9d4b6'

let city_weather_name = document.getElementById('city-weather')
let description_weather = document.getElementById('weather-description')
let temperature = document.getElementById('temperature')
let minimium_temperature = document.getElementById('min-temperature')
let maximum_temperature = document.getElementById('max-temperature')
let select = document.getElementById('select-city')
let search_button = document.getElementById('search-button')
let wind = document.getElementById('wind') 
let clouds = document.getElementById('cloudiness')
let sunrise = document.getElementById('sunrise')
let sunset = document.getElementById('sunset')
let main_image = document.getElementById('climate-image')
let humidity = document.getElementById('humidity')
let hour = document.getElementById('hour')

search_button.addEventListener('click', () => {
    search_city(select.value)
})

select.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') search_button.click()
})

window.addEventListener("load", () => {
    let longitude
    let latitude

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            latitude = position.coords.latitude
            longitude = position.coords.longitude

            const URL_LAT_LON = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=pt`

            call_api(URL_LAT_LON)
        })
    } else {
        search_city(select.value)
    }
})

function call_api(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {
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
        humidity.textContent = data_humidity +"%"
        sunrise.textContent = sunrise_date
        sunset.textContent = sunset_date
        hour.textContent = hour_now
    })
    .catch(e => {
        console.log(e)
    })
}

function search_city(city){
    const URL_NAME = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&lang=pt`
    call_api(URL_NAME)
}

async function discover_country_name(code){
    let country_name = ''
    const COUNTRY_API = `https://restcountries.com/v3.1/alpha/${code}`

    let response = await fetch(COUNTRY_API)
    let data = await response.json()
    country_name += data[0].name.common
    return country_name
}

function change_background_icon(climate){
    switch(climate){
        case "Clear":
            main_image.setAttribute('src', './icons/icons8-sol-250 (1).png')
            return "Limpo"
        case "Clouds":
            main_image.setAttribute('src', './icons/icons8-nuvem-100.png')
            return "Nublado"
        case "Rain":
            main_image.setAttribute('src', './icons/icons8-raining-64.png')
            return "Chovendo"
        case "default":
            main_image.setAttribute('src', './icons/icons8-sol-250 (1).png')
            return "Limpo"
    }
}

function convert_date(unix_timestamp){
    let hours = new Date(unix_timestamp * 1000).getHours().toString()
    let minutes = new Date(unix_timestamp * 1000).getMinutes().toString()

    let string = ''

    if(hours.length == 1) hours = '0' + hours
    if(minutes.length == 1) minutes = '0' + minutes

    string = hours + ":" + minutes
    return string
}

function convert_temperature(temp, min, max, unit = "celsius") {
    switch (unit) {
        case "celsius":
            temp = (temp - 273.15).toFixed(1)
            min = (min - 273.15).toFixed(1)
            max = (max - 273.15).toFixed(1)
            insert_temperature(temp, min, max)
            break

        case "kelvin":
            insert_temperature(temp, min, max, " K")
            break

        case "fahrenheit":
            temp = ((temp - 273.15) * (9 / 5) + 32).toFixed(1)
            min = ((min - 273.15) * (9 / 5) + 32).toFixed(1)
            max = ((max - 273.15) * (9 / 5) + 32).toFixed(1)
            insert_temperature(temp, min, max, " °F")
            break

        case "default":
            temp = (temp - 273.15).toFixed(1)
            min = (min - 273.15).toFixed(1)
            max = (max - 273.15).toFixed(1)
            insert_temperature(temp, min, max)
            break
    }
}

function insert_temperature(temp, min, max, unit=" °C") {
    temperature.textContent = temp + unit
    minimium_temperature.textContent = min + unit
    maximum_temperature.textContent = max + unit
}
