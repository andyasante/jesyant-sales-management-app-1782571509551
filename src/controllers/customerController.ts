```typescript
import { Request, Response } from 'express';
import { Customer } from '../models/Customer';
import { validationResult } from 'express-validator';

// Get all customers
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
};

// Get a single customer by ID
export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve customer' });
  }
};

// Create a new customer
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { name, email, phone } = req.body;
  try {
    const newCustomer = await Customer.create({ name, email, phone });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Update an existing customer
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      customer.name = name;
      customer.email = email;
      customer.phone = phone;
      await customer.save();
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (customer) {
      await customer.destroy();
      res.status(200).json({ message: 'Customer deleted successfully' });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
```