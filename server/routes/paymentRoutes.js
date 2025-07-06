const express = require('express')

const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')
const { createStripeCheckoutSession, stripeCheckoutSuccess, createPayPalOrder, capturePayPalOrder, testPayPalConfig } = require('../controllers/paymentController')

router.use(verifyJwt)

router.post('/stripe', createStripeCheckoutSession)
router.post('/stripe-checkout-success', stripeCheckoutSuccess)
router.post('/paypal/create-order', createPayPalOrder)
router.post('/paypal/capture-order', capturePayPalOrder)
router.get('/paypal/test', testPayPalConfig)

module.exports = router