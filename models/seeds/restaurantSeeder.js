const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require("../restaurant")
const User = require('../user')
const { db, mongoose } = require('../../config/mongoose')

const restaurantList = require("./restaurant.json").results

const SEED_USER = [
  {
    name: 'USER1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'USER2',
    email: 'user2@example.com',
    password: '12345678'
  }
]


db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
    
  Promise.all(Array.from(SEED_USER, (SEEDUSER, index) => {
    // console.log(SEEDUSER, index)   
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEEDUSER.password, salt))
      .then(hash => User.create({
        name: SEEDUSER.name,
        email: SEEDUSER.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (value, i) => {
            // console.log(i, index, userId)
            Restaurant.create({ ...restaurantList[index * 3 + i], userId })
          }
        ))
      })
  }))
  .then(() => {
    console.log('done.')
    process.exit()
  })
})