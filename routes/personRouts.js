const express = require("express")
const router = express.Router()
const { createPerson, listPersons, loginUsers, profileHandler, changePassword } = require('../controllers/person')
const { authMiddleware } = require("../authMiddleware")


router.post("/signup", createPerson)
router.get("/list", listPersons)
router.post('/login', authMiddleware, loginUsers)
router.get("/profile", authMiddleware, profileHandler)
router.post("/profile/password", authMiddleware, changePassword)


module.exports = router