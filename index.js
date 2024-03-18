const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const db = require("./db/db")















app.listen(process.env.PORT, () => {
    console.log("Server Started On ", process.env.PORT)
})
