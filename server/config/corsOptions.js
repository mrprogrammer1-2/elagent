const allowedOrigins = require('./allowdOrgins')

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    credentials: true, // fixed typo from 'Credential' to 'credentials'
    optionsSuccessStatus: 200
}

module.exports = corsOptions