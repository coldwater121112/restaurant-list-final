const express = require('express')
const router = express.Router()
const home = require('./home')
const todos = require('./modules/todos')
const users = require('./users')
const { authenticator } = require('../../middleware/auth')  // 掛載 middleware

router.use('/todos', authenticator, todos) // 加入驗證程序
router.use('/users', users)
router.use('/', authenticator, home) // 加入驗證程序
module.exports = router