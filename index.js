import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './database/config.js';
import { MentorRoutes } from './routers/MentorRoutes.js';
import { StudentRoutes } from './routers/StudentRoutes.js';
dotenv.config()

//Initializing the express app
const app = express();

//Configuring middleware
app.use(cors())
app.use(express.json())

//Connecting to DB
connectDB()

//Configuring routes
app.use('/api/v1/mentors', MentorRoutes);
app.use('/api/v1/students', StudentRoutes);


const PORT = process.env.PORT || 5000;

//Listening to particular port
app.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
})