import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSale } from '../store/actions/saleActions';

const SaleForm: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    dispatch(createSale(saleData));
    setProductId('');
    setQuantity(1);
    setCustomerName('');
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Process Sale</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-gray-700">Product ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Submit Sale
        </button>
      </form>
    </div>
  );
};

export default SaleForm;