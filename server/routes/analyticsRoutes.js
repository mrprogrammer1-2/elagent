const express = require('express')
const verifyJwt = require('../middleware/verifyJwt')
const isAdmin = require('../middleware/isAdmin')
const { getAnalyticsData, getDailySalesData } = require('../controllers/analyticsController')

const router = express.Router()

router.get('/', verifyJwt, isAdmin, async (req, res) => {
    try {
        const analyticsData = await getAnalyticsData()

        const endDate = new Date()
        const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)

        const dailySalesData = await getDailySalesData(startDate, endDate)

        res.json({
            analyticsData,
            dailySalesData
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }

})

module.exports = router