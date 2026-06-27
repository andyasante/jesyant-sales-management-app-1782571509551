import express from 'express';
import { body, param } from 'express-validator';
import { getCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController';
import { validateRequest } from '../middleware/errorMiddleware';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Get all customers
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const customers = await getCustomers();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// Get a customer by ID
router.get('/:id', authMiddleware, [
  param('id').isUUID().withMessage('Invalid customer ID format')
], validateRequest, async (req, res, next) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// Create a new customer
router.post('/', authMiddleware, [
  body('name').isString().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').isString().withMessage('Phone number is required')
], validateRequest, async (req, res, next) => {
  try {
    const newCustomer = await createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
});

// Update a customer
router.put('/:id', authMiddleware, [
  param('id').isUUID().withMessage('Invalid customer ID format'),
  body('name').optional().isString().withMessage('Name must be a string'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isString().withMessage('Phone number must be a string')
], validateRequest, async (req, res, next) => {
  try {
    const updatedCustomer = await updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    next(error);
  }
});

// Delete a customer
router.delete('/:id', authMiddleware, [
  param('id').isUUID().withMessage('Invalid customer ID format')
], validateRequest, async (req, res, next) => {
  try {
    const success = await deleteCustomer(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;