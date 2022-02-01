// import express package(commonJS syntax)
const express = require('express')
const morgan = require('morgan')


require('dotenv').config()
const db = require('./database/mongoose')
const indexRouter = require('./routes/shorten')

// instantiate the express app
const app = express()

const PORT = process.env.PORT || 5000

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);

// Listen for incoming requests
app.listen(PORT, async () => {
    console.log(`server started, listening PORT ${PORT}`)
    await db()
})