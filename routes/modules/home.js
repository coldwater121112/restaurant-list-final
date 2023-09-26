const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

/*
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
*/
// routes setting
// 使用者可以瀏覽全部所有餐廳
router.get('/', (req, res) => {
  const userId = req.user._id
  const sortValue = req.query.sort;
  // console.log(sortValue);
  Restaurant.find({ userId }) // 取出 Restaurant model 裡的所有資料
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



/*
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const type = req.query.type
  const sort = req.query.sort
  const userId = req.user._id
  if (!keyword)
    return Restaurant.find({ userId })
          .lean()
          .sort(`${sort}`)
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.log(error)) 

  return Restaurant.find({ userId })
          .lean()
          .sort(`${sort}`)
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.log(error))
})*/
// 搜尋餐廳
router.get("/search", (req, res) => {
  let sort = req.query.sort;
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.find({ userId })
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

module.exports = router