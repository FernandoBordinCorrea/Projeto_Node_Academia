const jwt = require('jsonwebtoken')
const getToken = require('./get_token')
const checkToken = (req,res,next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({message: 'Acesso negado'})
    }

    const token = getToken(req)

    if(!token) {
        return res.status(401).json({message: 'Acesso negado'})
    }

    try {
        const verfied = jwt.verify(token, 'nossosecredo')
        req.user = verfied
        next()
        
    } catch (error) {
        return res.status(400).json({message: 'Tokken invalido!'})
    }
}

module.exports = checkToken 