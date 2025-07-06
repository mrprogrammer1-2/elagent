const validator = require('validator')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email, !password) return res.status(400).json({ message: "Email and Password are required" })

        if (!validator.isEmail(email)) return res.status(400).json({ message: "Please, Enter a vaild email" })

        const user = await User.findOne({ email }).exec()

        if (!user) return res.status(403).json({ message: "User not found" })

        const match = await bcrypt.compare(password, user.password)

        if (!match) return res.status(400).json({ message: 'Wrong password' })

        const accessToken = jwt.sign(
            {
                'UserInfo': {
                    'name': user.name,
                    'id': user._id
                }
            },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign(
            {
                'name': user.name,
            },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: '7d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({ accessToken, user: { name: user.name, id: user._id, cart: user.cart, isAdmin: user.isAdmin } })


    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ message: 'Forbidden' })

                const user = await User.findOne({ name: decoded.name })

                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized' })
                }

                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'name': user.name,
                            'id': user._id
                        }
                    },
                    process.env.ACCESS_TOKEN_KEY,
                    { expiresIn: '15m' }
                )

                res.json({ accessToken, user: { name: user.name, id: user._id, isAdmin: user.isAdmin, cart: user.cart } })

            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        }
    )

}

const logout = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(201)

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.json({ message: 'Cookies cleared' })
}

const check = async (req, res) => {
    try {
        const refreshToken = req.cookies?.jwt;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            const user = await User.findOne({ name: decoded.name });
            if (!user) return res.status(401).json({ message: 'User not found' });

            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        'name': user.name,
                        'id': user._id
                    }
                },
                process.env.ACCESS_TOKEN_KEY,
                { expiresIn: '15m' }
            );

            res.json({ accessToken, user: { name: user.name, id: user._id, isAdmin: user.isAdmin, cart: user.cart } });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    login,
    refresh,
    logout,
    check
}