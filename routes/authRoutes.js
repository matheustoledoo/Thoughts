const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// Get route(for go to page on website)
router.get('/login', AuthController.login)
router.get('/register', AuthController.register)
router.get('/logout', AuthController.logout)

// Post route(for register or login on database)
router.post('/register', AuthController.registerPost)


module.exports = router