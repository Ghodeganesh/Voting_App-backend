const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
personSchema.pre("save", async (req, res) => {
    const person = this
    const salt = await bcrypt.getSalt(10)
    const hashPassword = bcrypt.hashSync(person.password, salt)

    this.password = hashPassword

    console.log(password)
})

const person = mongoose.model("person", personSchema)
module.exports = person

