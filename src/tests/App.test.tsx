import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store/store';
import App from '../index';

const renderWithRedux = (component, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

test('renders login component', () => {
  renderWithRedux(<App />);
  const loginElement = screen.getByText(/login/i);
  expect(loginElement).toBeInTheDocument();
});

test('successful login updates state', () => {
  const { store } = renderWithRedux(<App />);
  const usernameInput = screen.getByPlaceholderText(/username/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(loginButton);

  const state = store.getState();
  expect(state.user.isAuthenticated).toBe(true);
});

test('renders product list component', () => {
  renderWithRedux(<App />);
  const productListElement = screen.getByText(/product list/i);
  expect(productListElement).toBeInTheDocument();
});

test('renders dashboard component', () => {
  renderWithRedux(<App />);
  const dashboardElement = screen.getByText(/dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});