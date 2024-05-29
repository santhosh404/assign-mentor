import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()


const MONGODB_URL = process.env.MONGODB_URL;


const connectDB = async (req, res) => {
    try {
        const connection = await mongoose.connect(MONGODB_URL);
        console.log('Database connected successfully!');
    }

    catch(err) {
        console.error('Error connecting to the database', err.message);
    }
}

export default connectDB;