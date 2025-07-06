const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')

const app = express()

require('dotenv').config()
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())

const PORT = process.env.PORT || 3500

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`)
        })
    })

app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/coupons', require('./routes/couponRoutes'))
app.use('/payment', require('./routes/paymentRoutes'))
app.use('/analytics', require('./routes/analyticsRoutes'))

