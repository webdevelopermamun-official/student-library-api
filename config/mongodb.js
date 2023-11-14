import mongoose from "mongoose";

// create mongodb connection
export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected...`.bgCyan);
    } catch (error) {
        console.log("Error connecting to MongoDB".red, error.message);
    }
};