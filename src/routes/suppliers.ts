```typescript
import express from 'express';
import { supplierController } from '../controllers/supplierController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route to get all suppliers
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const suppliers = await supplierController.getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    next(error);
  }
});

// Route to get a single supplier by ID
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const supplier = await supplierController.getSupplierById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    next(error);
  }
});

// Route to create a new supplier
router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const newSupplier = await supplierController.createSupplier(req.body);
    res.status(201).json(newSupplier);
  } catch (error) {
    next(error);
  }
});

// Route to update an existing supplier
router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const updatedSupplier = await supplierController.updateSupplier(req.params.id, req.body);
    if (!updatedSupplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(updatedSupplier);
  } catch (error) {
    next(error);
  }
});

// Route to delete a supplier
router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const deleted = await supplierController.deleteSupplier(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
```