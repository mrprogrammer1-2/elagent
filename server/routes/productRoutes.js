const router = require('express').Router()
const { getProducts, updateProduct, createProduct, toggleBestseller, deleteProduct } = require('../controllers/productController')
const upload = require('../middleware/multer')
const isAdmin = require('../middleware/isAdmin')
const verifyJwt = require('../middleware/verifyJwt')

router.get('/', getProducts)
router.post('/', verifyJwt, isAdmin, upload.array('image', 5), createProduct)
router.patch('/:id', verifyJwt, isAdmin, updateProduct)
router.patch('/bestsellerTog/:id', verifyJwt, isAdmin, toggleBestseller)
router.delete('/:id', verifyJwt, isAdmin, deleteProduct)

module.exports = router