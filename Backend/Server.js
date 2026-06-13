require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware it is smthg which give response to a req   here next is used to render other req below it
app.use(express.json()) // this is used in patch and post as they input some data to post or patch req alone cannot andle it

app.use('/', (req,res,next) => {
 console.log(req.path,req.method)
 next()
})

// routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
.then( () => {
    
// listening req
app.listen(process.env.PORT, () => {
    console.log('mongo db connected and listening on port',process.env.PORT)
})
})
.catch((error) => {
    console.error("MongoDB Error:");
    console.error(error);
    console.error(error.message);
  })


