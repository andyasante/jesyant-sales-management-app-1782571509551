import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);

const connectToDatabase = async () => {
  const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy';
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

startServer();