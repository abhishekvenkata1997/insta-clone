require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/authRoutes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//Routes
app.use('/api',authRouter)

const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',() => {
    console.log("Connected to the database");
});

mongoose.connection.on('error', err => {
    console.log('Mongo DB Error in connection: '+err);
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("Server is running in port:"+port);
})