const express = require('express')
const router = express.Router()
const ToughtsController = require('../controllers/ToughtsController')

// helpers
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtsController.createThought)
router.post('/add', checkAuth, ToughtsController.createThoughtSave)
router.get('/add', checkAuth, ToughtsController.createThought)
router.post('/remove', checkAuth, ToughtsController.removeThought)

router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.get('/', ToughtsController.showThoughts)


module.exports = router