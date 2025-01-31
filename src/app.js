const express = require('express')
const app = express()
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

// Middleware
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

// Database
require('./databases/init.mongodb')
const { checkOverLoad } = require('./helpers/count-connection')
checkOverLoad()

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})
// Error handlers


// test code

module.exports = app  