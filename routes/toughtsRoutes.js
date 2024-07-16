const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

router.get('/', ToughtsController.showThoughts)

module.exports = router