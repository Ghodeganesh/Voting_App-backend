const express = require("express")
const router = express.Router()
const { createPerson,listPersons,loginUsers} = require('../controllers/person')


router.post("/signup", createPerson)
router.get("/list", listPersons)
router.post('/login',loginUsers)


module.exports=router