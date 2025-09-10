import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'

//configure env
dotenv.config() //{path:''} :if .env file is any folder

//database config
connectDB();

//rest object
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//rest api
app.get('/',(req,res) => {
    res.send("<h1>Welcome to Ecommerce app</h>")
})

//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on  ${PORT}`.bgCyan.white)
})