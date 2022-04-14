function convert_temperature(temp, unit = "celsius") {
    switch (unit) {
        case "celsius":
            temp = (temp - 273.15).toFixed(1)
            temp = insert_temperature(temp)
            return temp

        case "kelvin":
            temp = insert_temperature(temp, " K")
            return temp

        case "fahrenheit":
            temp = ((temp - 273.15) * (9 / 5) + 32).toFixed(1)
            temp = insert_temperature(temp, " °F")
            return temp

        case "default":
            temp = (temp - 273.15).toFixed(1)
            temp = insert_temperature(temp)
            return temp
    }
}

function insert_temperature(temp, unit=" °C") {
    temperature = temp + unit
    return temperature
}

module.exports = convert_temperature