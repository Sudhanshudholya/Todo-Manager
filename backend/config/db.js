import mongoose from "mongoose";
import "dotenv/config"

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));

}