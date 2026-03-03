import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";                       
import dotenv from "dotenv";

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

app.get("/health", (req, res) => {
    res.json({status: "ok", message: "ApI is running"})
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})