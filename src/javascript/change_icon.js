function change_background_icon(climate){
    switch(climate){
        case "Clear":
            return [
                "icons/sun.png",
                "Limpo"
                ]
        case "Clouds":
            return [
                "icons/cloud.png",
                "Nublado"
                ]
        case "Rain":
            return [
                "icons/raining.png",
                "Chovendo"
                ]
        case "default":
            return [
                "icons/sun.png",
                "Limpo"
                ]
    }
}

module.exports = change_background_icon