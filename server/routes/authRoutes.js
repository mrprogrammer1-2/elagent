const router = require('express').Router()
const { login, refresh, logout, check } = require('../controllers/authController')

router.post('/login', login)
router.post('/refresh', refresh)
router.get('/logout', logout)
router.get('/check', check);

module.exports = router