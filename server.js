require('dotenv').config()

const express = require('express')
const app = express()

// require Routes
const bootcamps = require('./routes/bootcamps')

// use Routes
app.use('/api/bootcamps', bootcamps)

app.listen(process.env.PORT, console.log("Server Live"))