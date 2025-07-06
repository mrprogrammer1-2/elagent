const Coupon = require('../models/couponModel')

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({ userId: req.id }).exec()
        if (!coupons) return res.status(404).json({ message: 'No coupons found' })
        res.json(coupons)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}


const validateCoupon = async (req, res) => {
    const { code } = req.body
    try {
        const coupon = await Coupon.findOne({ code, userId: req.id }).exec()
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found' })
        }
        if (!coupon.isActive) {
            return res.status(400).json({ message: 'Coupon is not active' })
        }
        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' })
        }
        res.json({
            message: 'Coupon is valid',
            code: coupon.code,
            discount: coupon.discount,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }

}

module.exports = {
    getCoupons,
    validateCoupon
}