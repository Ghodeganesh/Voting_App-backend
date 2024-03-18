const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(400).send("Token Not Found")
    }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "unauthorized" })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRETE_KEY)
        req.person = decoded
        next()
    } catch (error) {
        res.status(404).json({ message: "invalid Token" })
    }
}

const genToken = (userdata) => {
    const token = jwt.sign(userdata, process.env.SECRETE_KEY)
    return token
}

module.exports = {
    authMiddleware,
    genToken
}