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
  const list = await person.find()
  res.send(list)
}

module.exports = {
  createPerson,
  listPersons
}