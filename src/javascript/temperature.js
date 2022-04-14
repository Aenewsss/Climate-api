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

module.exports = {
    convert_temperature,
    insert_temperature
}