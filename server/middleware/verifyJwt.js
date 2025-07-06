const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    // console.log(authHeader)

    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' })

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token verification failed' })
            }

            const user = await User.findById(decoded.UserInfo.id).exec()
            if (!user) return res.status(401).json({ message: 'User not found' })


            req.user = user
            req.id = decoded.UserInfo.id

            next()
        }
    )
}

module.exports = verifyJwt