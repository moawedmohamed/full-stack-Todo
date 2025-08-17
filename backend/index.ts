import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import todoRoutes from './routes/todoRoutes'; // مسار الـ router
import authRoutes from './routes/authRoutes';
import { pool } from "./db"
const app = express()

//* middlewares 
app.use(cors())
app.use(express.json())

app.use('/todos', todoRoutes)
app.use('/auth',authRoutes)
const PORT: number = 5000;
app.listen(PORT, () => {
    console.log(`the server running on ${PORT}`);
})