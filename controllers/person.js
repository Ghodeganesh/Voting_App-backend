const person = require('../models/person.module')
const { genToken } = require("../authMiddleware")

const createPerson = async (req, res) => {
  const personInfo = req.body;

  try {
    const data = await person.create(personInfo)
    const payload = {
      name: data.name,
      email: data.email
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

  const { name, password } = req.body;
  const user = await person.findOne({ name: name })
  if (!user) {
    return res.status(404).json({ message: "Person Not Found" })

  }
  // const password = user.password === pa
}
module.exports = {
  createPerson,
  listPersons,
  loginUsers
}