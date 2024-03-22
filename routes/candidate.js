const express = require("express")
const router = express.Router()
const { createCandidate, listCandidates, deleteCandidate } = require('../controllers/candidates')
const { authMiddleware } = require("../authMiddleware")



router.post("/signup", authMiddleware, createCandidate)
router.get("/list", listCandidates)
router.delete('/:candidateId',authMiddleware, deleteCandidate)



module.exports = router