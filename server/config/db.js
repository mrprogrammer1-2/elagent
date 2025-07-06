const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('connected to dataBase')
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDB