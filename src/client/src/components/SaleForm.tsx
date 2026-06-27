import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSale } from '../redux/productSlice';

const SaleForm: React.FC = () => {
    const dispatch = useDispatch();
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [customerName, setCustomerName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productId || quantity <= 0 || !customerName) {
            setError('All fields are required and quantity must be greater than zero.');
            return;
        }
        setError('');

        const saleData = {
            productId,
            quantity,
            customerName,
        };

        try {
            await dispatch(createSale(saleData)).unwrap();
            setProductId('');
            setQuantity(1);
            setCustomerName('');
        } catch (err) {
            setError('Failed to process sale. Please try again.');
        }
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Process Sale</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="productId" className="block text-sm font-medium text-gray-700">Product ID</label>
                    <input
                        type="text"
                        id="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
                >
                    Submit Sale
                </button>
            </form>
        </div>
    );
};

export default SaleForm;