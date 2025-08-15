import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"


import authRoutes from "./routes/auth.route"
import userRoutes from "./routes/user.route"
import messageRoutes from "./routes/message.route"

dotenv.config() //for loading env variables

const app = express()

app.use(express.json({limit: "10mb"})) //for reading the body
app.use(cookieParser()) //for cookies
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",  
    credentials: true   //for cookies
}))


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/message", messageRoutes)


const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on ${port} port`);
})