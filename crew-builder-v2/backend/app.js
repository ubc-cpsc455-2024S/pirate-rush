require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const indexRouter = require('./routes')
const membersRouter = require('./routes/membersRoute')
const playersRouter = require('./routes/playersRoute')
const bossRouter = require('./routes/bossRoute')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('dist'))

app.use('/', indexRouter)
app.use('/api/players', membersRouter)
app.use('/api/players', playersRouter)
app.use('/api/players', bossRouter)

module.exports = app
