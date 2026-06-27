```typescript
import express, { Request, Response } from 'express';
import { OrderController } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Initialize the OrderController
const orderController = new OrderController();

// Route to create a new order
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const order = await orderController.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all orders
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const orders = await orderController.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific order by ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const order = await orderController.getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an order by ID
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedOrder = await orderController.updateOrder(req.params.id, req.body);
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to delete an order by ID
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const success = await orderController.deleteOrder(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```