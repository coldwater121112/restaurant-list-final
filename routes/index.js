const express = require('express')
const router = express.Router()


const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')   // 引用模組
const { authenticator } = require('../middleware/auth.js')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)  // 掛載模組
router.use('/', authenticator, home)

module.exports = router