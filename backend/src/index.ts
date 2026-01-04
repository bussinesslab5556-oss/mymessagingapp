import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app: Application = express();

// ✅ প্রোডাকশন গ্রেড মিডলওয়্যার
app.use(express.json());
app.use(cors({
    origin: '*', // আপাতত সব এলাউ করা হলো যাতে মোবাইল থেকে সমস্যা না হয়
    credentials: true
}));

// রুটস
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'MyMessagingApp Backend is Running! 🚀' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ MONGO_URI missing');
    process.exit(1);
}

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas Successfully!');
        app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    });

// ✅ প্রিভেন্ট সার্ভার ক্রাশ
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
});
