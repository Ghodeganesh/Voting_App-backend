const person = require('../models/person.module')
const { genToken } = require("../authMiddleware")

const createPerson = async (req, res) => {
  const personInfo = req.body;

  try {
    const data = await person.create(personInfo)

    const payload = {
      name: data.name,
      email: data.email,
      id: data.id
    }
    const token = genToken(payload)
    res.status(201).send({ response: data, token: token })

  } catch (error) {
    console.log("Error While Creating Person :", error)
    res.status(400).json("Error While Creating Person ")
  }
}

const listPersons = async (req, res) => {
  try {
    const user = await person.find()
    if (!user) {
      return res.status(404).json({ message: "Person Not Exist" })
    }
    res.status(200).send(user)
  } catch (error) {
    return res.status(404).send("Error:", error)
  }
}
const loginUsers = async (req, res) => {

  const data = req.body
  const adharcardNum = data.adharCardNumber
  const password = data.password
  try {

    const user = await person.findOne({ adharCardNumber: adharcardNum })
    if (!user) {
      return res.status(404).json({ message: "Person Not Found" })
    }
    if (!user || !(await user.compass(password))) {
      return res.status(500).send("Invalid Password")
    }

    const payload = {
      id: user.id
    }
    const token = genToken(payload)
    res.status(201).json({ message: "Token Generated", token: token })
  } catch (err) {
    console.error("Error:", err)
    res.status(500).send("internal Server Error")
  }
}


const profileHandler = async (req, res) => {
  try {
    const userdata = req.person
    const userId = userdata.id;
    const user = await person.findById(userId)
    res.status(200).send(user)
  } catch (error) {
    console.error("Internal Error : ", error)
    res.status(400).send("Error")
  }
}

const changePassword = async (req, res) => {
  try {
    const personId = req.person;

    const { oldPassword, newPassword } = req.body;
    console.log("oldPass: ", oldPassword)
    console.log("newPass: ", newPassword)
    console.log("personId: ", personId)

    const user = await person.findById(personId.id)
    console.log("user is:", user)
    if (!(await user.compass(oldPassword))) {
      return res.status(500).send("Invalid oldPassword")
    }

    user.password = newPassword
    console.log(user.password)

    res.status(200).json({
      success: true,
      message: "Password Updated Succesfully"

    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error While Changing Password",
      err
    })
  }
}
module.exports = {
  createPerson,
  listPersons,
  loginUsers,
  profileHandler,
  changePassword
}