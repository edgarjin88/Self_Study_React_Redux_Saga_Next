const express = require('express'); 
const app  = express()
const morgan = require('morgan');
const cors = require('cors')
const bodyParser = require('body-parser') //without body parser, JSON data is not parsed into JS. 
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

require('dotenv').config()
// DATABASE='mongodb://localhost:27017/auth'


mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then((()=> console.log('db connected')))
.catch(err => console.log('db connection error :', err))

app.use(morgan('dev')); //morgan initiated. 
// app.use(cors())// allows al origins 
app.use(bodyParser.json());  // without body parser, req.body was undefined. 

//route middleware always the end of other middleware
if(process.env.NODE_ENV="development"){
  app.use(cors({origin: `http://localhost:3000`}))
}
app.use('/api', authRoutes)
app.use("/api", userRoutes);
// in this case, each request go through all routes until it reaches to the right one. not a good way. 

const port = process.env.PORT || 8000

app.listen(port, ()=>{
 console.log(`Server is running on port ${port}`);
})