import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

// 1️⃣ Load environment variables
dotenv.config({path:'./backend/.env'});

const app: Application = express();

// 2️⃣ Middleware
app.use(express.json());
app.use(cors());

// 3️⃣ Routes
app.use('/api/auth', authRoutes);

// Health check route
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'MyMessagingApp Backend is Running! 🚀'
    });
});

// 4️⃣ Config
const PORT = process.env.PORT || 5000;

/**
 * 🔒 IMPORTANT:
 * - Production এ MONGO_URI অবশ্যই .env থেকে আসবে
 * - এখানে fallback রাখা হয়নি যেন ভুল করে localhost এ connect না হয়
 */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI is not defined in .env file');
    process.exit(1);
}

// 5️⃣ MongoDB Connection
mongoose.set('strictQuery', true);

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('-------------------------------------------');
        console.log('✅ Connected to MongoDB Atlas Successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port: ${PORT}`);
            console.log(`🔗 Local: http://localhost:${PORT}`);
            console.log('-------------------------------------------');
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed');
        console.error(err.message);
        process.exit(1);
    });

// 6️⃣ Global error handling
process.on('unhandledRejection', (err: any) => {
    console.error('Unhandled Rejection:', err.message);
    process.exit(1);
});
