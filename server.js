require('dotenv').config()

// express
const express = require('express')
const app = express()

// middlewares
const errorHandler = require('./middleware/error')

// additionals
const colors = require('colors')

// Connecting to Database
const connetDB = require('./db')
connetDB()

app.use(express.json())

// require Routes
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

// use Routes
app.use('/api/bootcamps', bootcamps)
app.use('/api/courses', courses)

// errorHandler 
app.use(errorHandler)

// starting server
const server = app.listen(process.env.PORT, console.log("Server Live".blue))

// Unhandled Promises
process.on("unhandledRejection", err => {
    console.log(`Promise rejection error: ${err.message}`.red)
    server.close(() => process.exit(1))
})