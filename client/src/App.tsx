```typescript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import SalesReport from './components/SalesReport';
import CustomerForm from './components/CustomerForm';
import SupplierForm from './components/SupplierForm';
import OrderForm from './components/OrderForm';
import PaymentForm from './components/PaymentForm';
import AuthContextProvider from './context/AuthContext';
import useAuth from './hooks/useAuth';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AuthContextProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto p-4">
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/sales" component={SalesReport} />
              <Route path="/customers" component={CustomerForm} />
              <Route path="/suppliers" component={SupplierForm} />
              <Route path="/orders" component={OrderForm} />
              <Route path="/payments" component={PaymentForm} />
              {/* Add more routes as needed */}
            </Switch>
          </div>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
```