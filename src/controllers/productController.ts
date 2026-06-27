import { Request, Response } from 'express';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, price, quantity } = req.body;
    try {
        const newProduct = await Product.create({ name, price, quantity });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    try {
        const product = await Product.findById(id);
        if (product) {
            product.name = name;
            product.price = price;
            product.quantity = quantity;
            await product.save();
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (product) {
            await product.remove();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};