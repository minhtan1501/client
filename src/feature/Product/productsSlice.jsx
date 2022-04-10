import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsApi from '../../api/ProductsApi';
// import StorageKeys from 'constants/storage-keys';

export const getAllProducts = createAsyncThunk('users/register', async (payload) => {
  // call API to register
  const data = await productsApi.getAllProducts(payload);

  // save data to local storage
//   localStorage.setItem(StorageKeys.TOKEN, data.jwt);
//   localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data;
});


const userSlice = createSlice({
  name: 'product',
  initialState: {
    current: [],
    settings: {},

  },
  reducers: {
  },
  extraReducers: {
    // 'register/user/fulfilled'
    [getAllProducts.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer } = userSlice;

export default reducer;

export { userSlice };