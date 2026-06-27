import express from 'express';
import { processPayment } from '../controllers/paymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to process a payment
router.post('/process', authMiddleware, async (req, res, next) => {
  try {
    const paymentDetails = req.body;
    const result = await processPayment(paymentDetails);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;