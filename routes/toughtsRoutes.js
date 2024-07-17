const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showThoughts)


module.exports = router