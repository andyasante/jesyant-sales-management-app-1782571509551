import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from '../reducers/userReducer';
import { productReducer } from '../reducers/productReducer';
import { saleReducer } from '../reducers/saleReducer';

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  sale: saleReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export default store;