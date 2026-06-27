```typescript
import { Request, Response } from 'express';
import { Payment } from '../models/Payment';
import { Order } from '../models/Order';
import { validatePaymentInput } from '../utils/validators';
import { handleError } from '../utils/errorHandler';

// Process a payment for an order
export const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, amount, paymentMethod } = req.body;

    // Validate input
    const { valid, errors } = validatePaymentInput({ orderId, amount, paymentMethod });
    if (!valid) {
      res.status(400).json({ errors });
      return;
    }

    // Check if order exists
    const order = await Order.findByPk(orderId);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Check if payment amount matches order total
    if (order.total !== amount) {
      res.status(400).json({ error: 'Payment amount does not match order total' });
      return;
    }

    // Create payment record
    const payment = await Payment.create({
      orderId,
      amount,
      paymentMethod,
      status: 'completed',
    });

    // Update order status
    await order.update({ status: 'paid' });

    res.status(201).json({ payment });
  } catch (error) {
    handleError(res, error);
  }
};

// Get payment details by ID
export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Find payment by ID
    const payment = await Payment.findByPk(id);
    if (!payment) {
      res.status(404).json({ error: 'Payment not found' });
      return;
    }

    res.status(200).json({ payment });
  } catch (error) {
    handleError(res, error);
  }
};

// List all payments
export const listPayments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ payments });
  } catch (error) {
    handleError(res, error);
  }
};
```