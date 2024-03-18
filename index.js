const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const db = require("./db/db")
const bodyParser = require("body-parser")
// const router=require('./routes')
const person = require("./models/person.module")

app.use(bodyParser.json())



const personrouts = require('./routes/personRouts')
app.use('/', personrouts)

app.get('/', (req, res) => {
    res.send("Welcome To Voting Application ")
})




app.listen(process.env.PORT, () => {
    console.log("Server Started On ", process.env.PORT)
})
