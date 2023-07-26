// require packages used in the project
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override');
const routes = require('./routes')
const exphbs = require('express-handlebars')
const handlebarsHelper = require('./config/handlebars-helper')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const flash = require('connect-flash')   // 引用套件

require('./config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PORT = process.env.PORT
const app = express()



// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))



// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use(flash())  // 掛載套件
usePassport(app)
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is runnung on port http://localhost:${PORT}`)
})
