// require packages used in the project
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override');
const routes = require('./routes')
const port = 3000
const exphbs = require('express-handlebars')
const handlebarsHelper = require('./config/handlebars-helper')
const flash = require('connect-flash')   // 引用套件
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
require('./config/mongoose')


const app = express()



// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')



app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))



// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
usePassport(app)
app.use(flash())  // 掛載套件

app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})