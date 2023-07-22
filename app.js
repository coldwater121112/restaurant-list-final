const express = require('express')
const app = express()
const methodOverride = require('method-override')

const mongoose = require("mongoose")
const exphbs = require('express-handlebars')




// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))



app.get('/', (req, res) => {
  res.send('hello world!')
})



app.listen(3000, () => {
  console.log('App is runnung on port http://localhost:3000')
})