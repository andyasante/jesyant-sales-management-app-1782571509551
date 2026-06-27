import express from 'express';
import { productController } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get all products
router.get('/', authMiddleware, productController.getAllProducts);

// Route to get a single product by ID
router.get('/:id', authMiddleware, productController.getProductById);

// Route to create a new product
router.post('/', authMiddleware, productController.createProduct);

// Route to update an existing product
router.put('/:id', authMiddleware, productController.updateProduct);

// Route to delete a product
router.delete('/:id', authMiddleware, productController.deleteProduct);

export default router;