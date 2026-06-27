import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import ProductList from './components/ProductList';
import SaleForm from './components/SaleForm';
import './styles/tailwind.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Sales Management App</h1>
          <Switch>
            <Route path="/" exact component={ProductList} />
            <Route path="/sales" component={SaleForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;