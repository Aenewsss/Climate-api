async function discover_country_name(code){
    let country_name = ''
    const COUNTRY_API = `https://restcountries.com/v3.1/alpha/${code}`

    let response = await fetch(COUNTRY_API)
    let data = await response.json()
    country_name += data[0].name.common
    return country_name
}

module.exports = discover_country_name