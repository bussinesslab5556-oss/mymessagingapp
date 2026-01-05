import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('MyMessagingApp Backend is Running! 🚀');
});

app.listen(PORT, () => {
  console.log('-----------------------------------------');
  console.log('✅ Server is running on: http://localhost:' + PORT);
  console.log('✅ .env Port Check: ' + process.env.PORT);
  console.log('-----------------------------------------');
});
