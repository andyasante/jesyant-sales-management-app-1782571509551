import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Sales Management App
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/products" className="text-white hover:underline">
            Products
          </Link>
          <Link to="/sales" className="text-white hover:underline">
            Sales
          </Link>
          <Link to="/customers" className="text-white hover:underline">
            Customers
          </Link>
          {user.isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="text-white hover:underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;