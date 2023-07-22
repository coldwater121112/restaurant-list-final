const Restaurant = require("../restaurant")
const { db, mongoose } = require('../../config/mongoose')

const restaurantList = require("../../restaurant.json").results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("running restaurantSeeder script...")
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})