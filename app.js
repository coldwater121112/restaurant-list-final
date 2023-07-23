const express = require('express')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const port = 3000
const handlebarsHelper = require('./config/handlebars-helper')
const Restaurant = require('./models/restaurant')
const app = express()


require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));



// routes setting
// 使用者可以瀏覽全部所有餐廳
app.get('/', (req, res) => {
  const sortValue = req.query.sort;
  console.log(sortValue);
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurant => res.render('index', { restaurants: restaurant })) // 將資料傳給 index 樣板
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    }) // 錯誤處理
})

// 搜尋餐廳
app.get("/search", (req, res) => {
  let sort = req.query.sort;
  const keyword = req.query.keyword
  Restaurant.find({})
    .lean()
    .sort(`${sort}`)
    .then(restaurant => {
      const filterRestaurants = restaurant.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      if (filterRestaurants.length === 0) {
        res.render('error', { keyword })
      } else {
        res.render('index', { restaurants: filterRestaurants, keyword, sort })
      }
    })
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})


app.get("/new", (req, res) => {
  res.render("new")
})

// 新增餐廳
app.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})

// 使用者可以瀏覽一家餐廳的詳細資訊
app.get("/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params
  // console.log(restaurant_id)
  // return Restaurant.findById(Object.values(restaurant_id))
  return Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})

// 使用者可以修改一家餐廳的資訊
app.get("/:restaurant_id/edit", (req, res) => {
  const { restaurant_id } = req.params
  // console.log(restaurant_id)
  return Restaurant.findById(restaurant_id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})
// post的寫法 Note:<form action="/restaurants/{{ restaurant._id }}" method="POST">
// app.post("/restaurants/:restaurant_id", (req, res) => {
//   const { restaurant_id } = req.params;
//   return Restaurant.findByIdAndUpdate(restaurant_id, req.body)
//     .then(() => res.redirect(`/restaurants/${restaurant_id}`))
//     .catch(error => console.log(error));
// });

app.put("/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params;
  return Restaurant.findByIdAndUpdate(restaurant_id, req.body)
    .then(() => res.redirect(`/restaurants/${restaurant_id}`))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
});

// 刪除餐廳
app.delete("/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params
  Restaurant.findByIdAndDelete(restaurant_id)
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})