import express from 'express';
import { createSale, getSales, getSaleById, updateSale, deleteSale } from '../controllers/saleController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, getSales);
router.get('/:id', authMiddleware, getSaleById);
router.put('/:id', authMiddleware, updateSale);
router.delete('/:id', authMiddleware, deleteSale);

export default router;