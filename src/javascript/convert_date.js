function convert_date(unix_timestamp){
    let hours = new Date(unix_timestamp * 1000).getHours().toString()
    let minutes = new Date(unix_timestamp * 1000).getMinutes().toString()

    let string = ''

    if(hours.length == 1) hours = '0' + hours
    if(minutes.length == 1) minutes = '0' + minutes

    string = hours + ":" + minutes
    return string
}

module.exports = convert_date