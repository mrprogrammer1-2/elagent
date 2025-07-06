const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const validator = require('validator')

const createUser = async (req, res) => {
    const { name, email, password } = req.body


    try {

        if (!name || !password || !email) {
            return res.status(400).json({ message: 'All filed are required' })
        }
        if (!validator.isEmail(email)) return res.status(400).json({ message: 'Invalid email' })

        const existUser = await User.findOne({ email }).exec()

        if (existUser) return res.status(400).json({ message: 'Email already registered' })

        if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters' })

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {
            name,
            email,
            password: hashedPassword
        }

        const user = await User.create(newUser)
        if (user) {
            return res.status(200).json({ message: "User created successfully" })
        } else {
            return res.status(401).json({ message: "Invalid user date received" })
        }


    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const updateUser = async (req, res) => {

}


module.exports = {
    createUser,
    updateUser
}