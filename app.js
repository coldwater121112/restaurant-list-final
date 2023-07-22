const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()


require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))



app.get('/', (req, res) => {
  res.send('hello world!')
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})