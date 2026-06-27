import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await deleteProduct(productId);
        if (result) {
            return res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

export default router;