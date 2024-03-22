const person = require('../models/person.module')
const candid = require('../models/candidate.model')

const checkAdmin = async (userId) => {
    const user = await person.findById(userId)
    if (user.role === 'admin') {
        return true;
    }
    else {
        return false;
    }
}
const createCandidate = async (req, res) => {

    try {
        if (!await checkAdmin(req.person.id)) {
            console.log(req.person.id)
            return res.status(400).json({ message: "Sorry Person Should Be Admin" })
        }
        const candidate = req.body;
        console.log(candidate)
        const data = await candid.create(candidate)

        res.status(201).send({ response: data })
        console.log(data)

    } catch (error) {

        res.status(400).json({
            message: "Error While Creating candidates "
        })
    }
}
const listCandidates = async (req, res) => {
    try {
        const allCandidates = await candid.find({})
        res.status(200).json(allCandidates)

    } catch (error) {
        res.status(400).json({
            message: "Error While fe candidates "
        })
    }
}
const deleteCandidate = async (req, res) => {
    try {
        if (!await checkAdmin(req.person.id)) {
            return res.status(400).json({ message: "Sorry Person Should Be Admin" })
        }
        const candidateId = req.params.id;

        const user = await candid.deleteOne(candidateId)
        res.status(200).json({ message: "Candidate Deleted" })

    } catch (error) {
        res.status(400).json({
            message: "Error While Deleting Candidate"
        })
    }
}

module.exports = {
    createCandidate,
    listCandidates,
    deleteCandidate
}