require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT
const MONGOOSE_URL = process.env.MONGOOSE_URL
const mongoose = require('mongoose')
const app = express();
const userRouter = require('./router/user.router.js')
const path = require('path')

app.use(express.urlencoded({extended: true})) // To get form data
app.use(express.json()) // For json data

app.use('/user', userRouter)


app.set('view engine', 'ejs')
app.set('views', path.resolve('./view'))

app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')))

app.get('/home', (req, res) => {
    res.status(200).render('home')
})

mongoose.connect(MONGOOSE_URL)
.then(() => {console.log("connection success!")})
.catch(err => {console.log(err)})


app.listen(PORT, (req, res) =>{
    console.log('Auth app is running on port 3000')
})

