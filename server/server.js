import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"

// app config
dotenv.config()
connectDB()

//app 
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

//API Endpoints
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)


app.get("/", (req, res) => {
  res.send("API working")
})

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
