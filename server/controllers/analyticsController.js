const User = require('../models/userModel')
const Product = require('../models/productModel')
const Order = require('../models/orderModal')

const getAnalyticsData = async () => {
    // Count all users
    const totalUsers = await User.countDocuments()

    // Count all products
    const totalProducts = await Product.countDocuments()

    // Calculate total sales and revenue
    const salesData = await Order.aggregate([
        {
            $group: {
                _id: null, // Group all orders together
                totalSales: { $sum: 1 }, // Count each order
                totalRevenue: { $sum: '$totalAmount' } // Fixed: Changed from totalPrice to totalAmount
            }
        }
    ])

    // Extract results (or default to 0 if no orders)
    const { totalSales = 0, totalRevenue = 0 } = salesData[0] || {}

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }
}

const getDailySalesData = async (startDate, endDate) => {
    // 1. Get sales grouped by day
    const salesData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate, // After start date
                    $lte: endDate    // Before end date
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: {
                        format: "%Y-%m-%d", // Format as "2023-01-01"
                        date: "$createdAt"
                    }
                },
                sales: { $sum: 1 },    // Count orders per day
                revenue: { $sum: "$totalAmount" } // Sum revenue per day
            }
        },
        { $sort: { _id: 1 } } // Sort by date ascending
    ])

    // 2. Generate all dates in range (even days with no sales)
    const dateArray = getDateInRange(startDate, endDate)

    // 3. Combine with sales data
    return dateArray.map(date => {
        const dayData = salesData.find(d => d._id === date)
        return {
            date,
            sales: dayData?.sales || 0, // Default to 0 if no sales
            revenue: dayData?.revenue || 0
        }
    })
}
function getDateInRange(startDate, endDate) {
    const dates = []
    let currentDate = new Date(startDate)
    while (currentDate <= new Date(endDate)) {
        dates.push(currentDate.toISOString().split('T')[0])
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
}

module.exports = { getAnalyticsData, getDailySalesData }