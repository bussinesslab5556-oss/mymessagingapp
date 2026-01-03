import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

// ১. পরিবেশ ভেরিয়েবল লোড করা (সবার উপরে থাকা জরুরি)
dotenv.config();

const app: Application = express();

// ২. মিডলওয়্যার (Middlewares)
app.use(express.json()); // বডি পার্সার
app.use(cors()); // ক্রস অরিজিন রিসোর্স শেয়ারিং

// ৩. রুটস (Routes)
app.use('/api/auth', authRoutes);

// হেলথ চেক রুট (সার্ভার সচল কি না তা বোঝার জন্য)
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "MyMessagingApp Backend is Running! 🚀" });
});

// ৪. কনফিগারেশন এবং ডাটাবেস কানেকশন
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ Error: MONGO_URI is missing in .env file.");
    process.exit(1); // ডাটাবেস ছাড়া সার্ভার চালানো নিরাপদ নয়
}

// ৫. ডাটাবেসে কানেক্ট হওয়া এবং সার্ভার চালু করা
mongoose.set('strictQuery', true); // Mongoose 7+ এর জন্য ভালো প্র্যাকটিস
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

// ৬. আনহ্যান্ডেলড এরর হ্যান্ডলিং (Global Error Handling)
process.on('unhandledRejection', (err: any) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

