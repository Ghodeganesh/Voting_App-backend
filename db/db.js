const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection;

db.on("error", () => {
    console.log("Somthing Went Wrong")
})
db.once("open", () => {
    console.log("DB Connected Succesfully!!!")
})