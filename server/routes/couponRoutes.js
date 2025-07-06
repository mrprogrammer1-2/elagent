const express = require('express')
const verifyJwt = require('../middleware/verifyJwt')
const { getCoupons, validateCoupon } = require('../controllers/couponController')

const router = express.Router()


router.get('/', verifyJwt, getCoupons)
router.post('/validate', verifyJwt, validateCoupon)

module.exports = router
