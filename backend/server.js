import express from "express"
import "dotenv/config"
import { connectDB } from "./config/db.js"
import cors from "cors"
import todoRouter from "./routes/todo.routes.js"



const app = express()
const PORT = process.env.PORT || 4040


app.use(express.json())
app.use(cors({
    credentials: true,
     origin: [
    "http://localhost:5173",
    "https://todo-manager-bay.vercel.app"
  ],
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type" , "Authorization"]
}))


app.use("/todo", todoRouter)

app.get("/", (req, res) => {
  res.send("Todo Manager API is running 🚀");
});

app.listen(PORT, () => {
    connectDB()
    console.log('Server is running on port 2000')
})