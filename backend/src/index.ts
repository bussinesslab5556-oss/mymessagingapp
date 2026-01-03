import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

// ✅ Correct dotenv config
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'MyMessagingApp Backend is Running! 🚀'
    });
});

// Config
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in .env file');
    process.exit(1);
}

// MongoDB
mongoose.set('strictQuery', true);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas Successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed');
        console.error(err.message);
        process.exit(1);
    });
