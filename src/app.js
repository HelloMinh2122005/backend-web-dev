require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

// Middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// Database
require('./databases/init.mongodb')
const { checkOverLoad } = require('./helpers/count-connection')
checkOverLoad()

// Routes
app.use('/', require('./routes/index'))

// Error handlers


// test code

module.exports = app  