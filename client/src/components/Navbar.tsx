```typescript
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">Pharmaceutical Sales Management</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/products" className="text-white hover:text-gray-200">
            Products
          </Link>
          <Link to="/sales" className="text-white hover:text-gray-200">
            Sales
          </Link>
          <Link to="/customers" className="text-white hover:text-gray-200">
            Customers
          </Link>
          <Link to="/suppliers" className="text-white hover:text-gray-200">
            Suppliers
          </Link>
          <Link to="/orders" className="text-white hover:text-gray-200">
            Orders
          </Link>
          <Link to="/payments" className="text-white hover:text-gray-200">
            Payments
          </Link>
          <Link to="/login" className="text-white hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```