import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri) {
  console.error('MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

async function startServer() {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/sales', saleRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();