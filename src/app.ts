import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import { IUser } from './models/userModel';
import authRoutes from './routes/authRoutes';

import userRoutes from './routes/userRoutes';
import familyDataRoutes from './routes/familyDataRoutes';

declare global {
  namespace Express {
      interface Request {
          user: IUser
      }
  }
}

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/family', familyDataRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(`Error connecting to MongoDB: ${error}`));
