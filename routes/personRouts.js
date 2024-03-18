const express = require("express")
const router = express.Router()
const { createPerson,listPersons } = require('../controllers/person')


router.post("/signup", createPerson)
router.get("/list", listPersons)


module.exports=router