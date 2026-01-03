import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

// ১. পরিবেশ ভেরিয়েবল লোড করা
dotenv.config();

const app: Application = express();

// ২. মিডলওয়্যার
app.use(express.json()); 
app.use(cors()); 

// ৩. রুটস
app.use('/api/auth', authRoutes);

// হেলথ চেক রুট
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "MyMessagingApp Backend is Running! 🚀" });
});

// ৪. কনফিগারেশন এবং ডাটাবেস কানেকশন
const PORT = process.env.PORT || 5000;

/** * আপনার দেওয়া Atlas URL সরাসরি এখানে যুক্ত করা হলো যাতে .env এরর আর না আসে। 
 * প্রোডাকশনে যাওয়ার সময় এটি আমরা আবার .env এ নিয়ে যাব।
 */
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://messagingapp2:messagingcluster2026@testingmymessage.e1kbflv.mongodb.net/?appName=Testingmymessage";

// ৫. ডাটাবেসে কানেক্ট হওয়া এবং সার্ভার চালু করা
mongoose.set('strictQuery', true); 
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('-------------------------------------------');
        console.log('✅ Connected to MongoDB Atlas Successfully!');
        app.listen(PORT, () => {
            console.log(`🚀 Server is flying on port: ${PORT}`);
            console.log(`🔗 Local Access: http://localhost:${PORT}`);
            console.log('-------------------------------------------');
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB Connection Failed!');
        console.error(err.message);
        process.exit(1);
    });

// ৬. গ্লোবাল এরর হ্যান্ডলিং
process.on('unhandledRejection', (err: any) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});
