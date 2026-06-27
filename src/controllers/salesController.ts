```typescript
import { Request, Response, NextFunction } from 'express';
import { Sale } from '../models/Sale';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { validationResult } from 'express-validator';
import { DatabaseError } from '../utils/errorHandler';

// Get all sales
export const getAllSales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sales = await Sale.findAll({
      include: [
        { model: Product, as: 'product' },
        { model: Customer, as: 'customer' }
      ]
    });
    res.status(200).json(sales);
  } catch (error) {
    next(new DatabaseError('Failed to retrieve sales', error));
  }
};

// Get a single sale by ID
export const getSaleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await Sale.findByPk(req.params.id, {
      include: [
        { model: Product, as: 'product' },
        { model: Customer, as: 'customer' }
      ]
    });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  } catch (error) {
    next(new DatabaseError('Failed to retrieve sale', error));
  }
};

// Create a new sale
export const createSale = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId, customerId, quantity, totalAmount } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const sale = await Sale.create({
      productId,
      customerId,
      quantity,
      totalAmount
    });

    res.status(201).json(sale);
  } catch (error) {
    next(new DatabaseError('Failed to create sale', error));
  }
};

// Update a sale
export const updateSale = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    const { productId, customerId, quantity, totalAmount } = req.body;

    if (productId) {
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      sale.productId = productId;
    }

    if (customerId) {
      const customer = await Customer.findByPk(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      sale.customerId = customerId;
    }

    if (quantity !== undefined) sale.quantity = quantity;
    if (totalAmount !== undefined) sale.totalAmount = totalAmount;

    await sale.save();
    res.status(200).json(sale);
  } catch (error) {
    next(new DatabaseError('Failed to update sale', error));
  }
};

// Delete a sale
export const deleteSale = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sale = await Sale.findByPk(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await sale.destroy();
    res.status(204).send();
  } catch (error) {
    next(new DatabaseError('Failed to delete sale', error));
  }
};
```