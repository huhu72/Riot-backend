const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

//Rate Limiting
const limiter = rateLimit({
    windowMs: 2*1000,
    max: 20
})

app.use(limiter)
app.set('trust proxy, 1')

app.use('/summoner', require('./routes/riot'))
//Enable cors
app.use(cors())

app.listen(PORT, () => console.log('workin'))