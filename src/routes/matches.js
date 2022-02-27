const express = require('express')
const router = express.Router()
const match_controller = require('../app/controllers/MatchController')

router.use('/', match_controller.index)

module.exports = router