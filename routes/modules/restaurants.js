const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 新增餐廳
router.post("/", (req, res) => {
  const userId = req.user._id
  const reqBody = req.body
  console.log(reqBody)
  return Restaurant.create({ ...reqBody, userId })
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
router.get("/:restaurant_id", (req, res) => {
  const userId = req.user._id
  const _id  = req.params._id
  // console.log(restaurant_id)
  // return Restaurant.findById(Object.values(restaurant_id))
  return Restaurant.findOne({_id , userId})
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
router.get("/:restaurant_id/edit", (req, res) => {
  const userId = req.user._id
  const _id  = req.params._id
  // console.log(restaurant_id)
  return Restaurant.findOne({_id, userId})
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

router.put("/:restaurant_id", (req, res) => {
  const userId = req.user._id
  const _id  = req.params._id;
  const reqBody = req.body
  return Restaurant.findOne({_id, userId })
    .then(restaurant => {
            for (let info in reqBody) {
              if (!reqBody[info]) continue
              restaurant[info] = reqBody[info]
            }
            return restaurant.save()})
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
});

// 刪除餐廳
router.delete("/:restaurant_id", (req, res) => {
  const userId = req.user._id
  const _id  = req.params._id
  Restaurant.deleteOne({_id , userId})
    .then(() => res.redirect("/"))
    .catch(error => {
      console.log(error)
      res.render(
        'errorPage',
        { error: error.message }
      )
    })
})

module.exports = router