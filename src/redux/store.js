import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../feature/auth/UserSlice';
import { cartSlice } from '../feature/Cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;