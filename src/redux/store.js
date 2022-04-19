import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../feature/auth/UserSlice';
import { cartSlice } from '../feature/Cart/cartSlice';
import {categoriesSlice} from '../feature/Categories/categoriesSlice'
import callbackSlice from './callback';
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    categories: categoriesSlice.reducer,
    callback: callbackSlice.reducer,
  },
});

export default store;