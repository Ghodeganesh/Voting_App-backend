const mongoose = require("mongoose")


const personSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        require: true,
    },
    adharCardNumber: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["voter", "admin"],
        default: "voter"
    },
    isvoted: {
        type: Boolean,
        default: false
    }

})

const person = mongoose.model("person", personSchema)
module.exports = person

