import express from "express"
import colors from "colors"
import dotenv from 'dotenv'
import morgan from "morgan"
// import { connect } from "mongoose"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import CategoryRoutes from './routes/categoryRoutes.js'
// import productModel from "./models/productModel.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';

// configure env
dotenv.config()

// database config

connectDB()

// es module fix
const  __filename = fileURLToPath(import.meta.url)
const  __dirname = path.dirname(__filename)

// creating rest object 
const app=express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './book/build')))

// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',CategoryRoutes)
app.use("/api/v1/product", productRoutes);

// rest api creation 
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname, "./book/build/index.html"))
})

// PORT
const PORT = process.env.PORT  || 8080

// run listen

app.listen(PORT,()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})
