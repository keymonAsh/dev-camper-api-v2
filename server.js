require('dotenv').config()

const express = require('express')
const app = express()
const colors = require('colors')

// Connecting to Database
const connetDB = require('./db')
connetDB()

app.use(express.json())

// require Routes
const bootcamps = require('./routes/bootcamps')

// use Routes
app.use('/api/bootcamps', bootcamps)

const server = app.listen(process.env.PORT, console.log("Server Live".blue))

// Unhandled Promises
process.on("unhandledRejection", err => {
    console.log(`Promise rejection error: ${err.message}`.red)
    server.close(() => process.exit(1))
})