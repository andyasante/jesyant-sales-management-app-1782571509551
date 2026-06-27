import express from 'express';
import { salesController } from '../controllers/salesController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get all sales records
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const sales = await salesController.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
});

// Route to get a specific sale by ID
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const sale = await salesController.getSaleById(req.params.id);
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Route to create a new sale record
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const newSale = await salesController.createSale(req.body);
    res.status(201).json(newSale);
  } catch (error) {
    next(error);
  }
});

// Route to update an existing sale record
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const updatedSale = await salesController.updateSale(req.params.id, req.body);
    if (updatedSale) {
      res.status(200).json(updatedSale);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    next(error);
  }
});

// Route to delete a sale record
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const deleted = await salesController.deleteSale(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;