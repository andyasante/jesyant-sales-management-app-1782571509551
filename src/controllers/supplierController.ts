```typescript
import { Request, Response, NextFunction } from 'express';
import { Supplier } from '../models/Supplier';
import { validationResult } from 'express-validator';

// Get all suppliers
export const getSuppliers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

// Get a single supplier by ID
export const getSupplierById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

// Create a new supplier
export const createSupplier = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, contactInfo } = req.body;
    const newSupplier = await Supplier.create({ name, contactInfo });
    res.status(201).json(newSupplier);
  } catch (error) {
    next(error);
  }
};

// Update an existing supplier
export const updateSupplier = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    const { name, contactInfo } = req.body;
    supplier.name = name;
    supplier.contactInfo = contactInfo;
    await supplier.save();

    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await supplier.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
```