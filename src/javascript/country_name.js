const axios = require('axios')

async function discover_country_name(code) {
    let country_name = ''
    await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(response => {
            let data = response.data
            country_name += data[0].name.common
        })
        .catch(e => console.log(e.message))
    
    return country_name
}

module.exports = discover_country_name