```typescript
import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { Supplier } from '../models/Supplier';
import { validateOrderInput } from '../utils/validators';
import { DatabaseError } from '../utils/errorHandler';

// Create a new order
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, supplierId, products, totalAmount } = req.body;

    // Validate input
    const { error } = validateOrderInput(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if customer exists
    const customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    // Check if supplier exists
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) return res.status(404).json({ error: 'Supplier not found' });

    // Check if products exist and have sufficient stock
    for (const product of products) {
      const dbProduct = await Product.findByPk(product.id);
      if (!dbProduct || dbProduct.stock < product.quantity) {
        return res.status(400).json({ error: `Insufficient stock for product ID: ${product.id}` });
      }
    }

    // Create order
    const order = await Order.create({
      customerId,
      supplierId,
      products,
      totalAmount,
    });

    // Update product stock
    for (const product of products) {
      const dbProduct = await Product.findByPk(product.id);
      if (dbProduct) {
        dbProduct.stock -= product.quantity;
        await dbProduct.save();
      }
    }

    res.status(201).json(order);
  } catch (err) {
    next(new DatabaseError('Failed to create order', err));
  }
};

// Get all orders
export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({ include: [Customer, Supplier] });
    res.status(200).json(orders);
  } catch (err) {
    next(new DatabaseError('Failed to retrieve orders', err));
  }
};

// Get order by ID
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id, { include: [Customer, Supplier] });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (err) {
    next(new DatabaseError('Failed to retrieve order', err));
  }
};

// Update an order
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, supplierId, products, totalAmount } = req.body;

    // Validate input
    const { error } = validateOrderInput(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    // Update order details
    order.customerId = customerId;
    order.supplierId = supplierId;
    order.products = products;
    order.totalAmount = totalAmount;
    await order.save();

    res.status(200).json(order);
  } catch (err) {
    next(new DatabaseError('Failed to update order', err));
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await order.destroy();
    res.status(204).send();
  } catch (err) {
    next(new DatabaseError('Failed to delete order', err));
  }
};
```