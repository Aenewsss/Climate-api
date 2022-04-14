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

module.exports = change_background_icon