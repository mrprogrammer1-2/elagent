const router = require('express').Router()
const verifyJwt = require('../middleware/verifyJwt')
const { removeFromCart, getCart, addToCart, updateCart } = require('../controllers/cartController')

router.use(verifyJwt)

router.delete("/:id/:size", removeFromCart)
router.patch("/add", addToCart)
router.patch("/update", updateCart)

module.exports = router