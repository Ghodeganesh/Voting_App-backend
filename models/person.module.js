const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const personSchema = new mongoose.Schema({
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


personSchema.pre("save", async function (next) {

    const person = this;
    if (!person.isModified('password')) return next()

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(person.password, salt)

        person.password = hashPassword
        next

    } catch (err) {
        return next(err)
    }
})

personSchema.methods.compass = async function (candidatPass) {
    try {
        const match = await bcrypt.compare(candidatPass, this.password)
        return match

    } catch (err) {
        throw err
    }


}




const person = mongoose.model("person", personSchema)
module.exports = person

