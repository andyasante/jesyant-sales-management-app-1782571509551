import { Request, Response } from 'express';
import Sale from '../models/Sale';
import Product from '../models/Product';

export const createSale = async (req: Request, res: Response) => {
    try {
        const { products, customerId, totalAmount } = req.body;

        const sale = new Sale({
            products,
            customerId,
            totalAmount,
            date: new Date(),
        });

        await sale.save();

        for (const product of products) {
            await Product.findByIdAndUpdate(product.productId, {
                $inc: { stock: -product.quantity },
            });
        }

        res.status(201).json({ message: 'Sale created successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sale', error: error.message });
    }
};

export const getSales = async (req: Request, res: Response) => {
    try {
        const sales = await Sale.find().populate('customerId').populate('products.productId');
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sales', error: error.message });
    }
};

export const getSaleById = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findById(req.params.id).populate('customerId').populate('products.productId');
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sale', error: error.message });
    }
};

export const updateSale = async (req: Request, res: Response) => {
    try {
        const { products, customerId, totalAmount } = req.body;

        const sale = await Sale.findByIdAndUpdate(req.params.id, {
            products,
            customerId,
            totalAmount,
        }, { new: true });

        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        res.status(200).json({ message: 'Sale updated successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sale', error: error.message });
    }
};

export const deleteSale = async (req: Request, res: Response) => {
    try {
        const sale = await Sale.findByIdAndDelete(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.status(200).json({ message: 'Sale deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sale', error: error.message });
    }
};