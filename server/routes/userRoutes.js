const router = require('express').Router()
const { createUser, updateUser } = require('../controllers/userController')

router.post('/register', createUser)
// Update user route
router.patch('/update', updateUser)

module.exports = router