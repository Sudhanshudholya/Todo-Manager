import mongoose from "mongoose";
import "dotenv/config"

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("mongodb connected on port 2000")
    } catch (error) {
        console.log("mongodb connection is failed", error)
    }
}