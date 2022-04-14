const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

const cache = require('./src/redis/cache')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

app.set('view engine', 'ejs')
app.set('views', 'src/view')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    res.send(req.body.cityName)
})

app.listen(PORT, () => console.log(`Server is at http://localhost:${PORT}`))