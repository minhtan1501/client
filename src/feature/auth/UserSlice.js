import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
// import StorageKeys from 'constants/storage-keys';

export const register = createAsyncThunk("users/register", async (payload) => {
  // call API to register
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem("firstLogin", true); 
  //   localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data;
});
export const login = createAsyncThunk("users/login", async (payload) => {
  // call API to register
  const data = await userApi.login(payload);

  // save data to local storage
  localStorage.setItem("firstLogin", true);
  //   localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data;
});

export const getToken = createAsyncThunk("users/token", async (payload) => {
  // call API to register
  const data =  await userApi.refreshToken();
  // save data to local storage
  //   localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  //   localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.accessToken;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    settings: {},
    token: "",
  },
  reducers: {
    logout(state, action) {
      // clear local storage
      //   localStorage.removeItem(StorageKeys.USER)
      //   localStorage.removeItem(StorageKeys.TOKEN)
      state.current = {};
      state.token = "";
      localStorage.removeItem('firstLogin')
    },
    setUser(state, action) {
        state.current = action.payload
    }
  },
  extraReducers: {
    // 'register/user/fulfilled'
    [register.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [getToken.fulfilled]: (state, action) => {
      state.token = action.payload;
    },
  },
});

const { actions } = userSlice;

export default actions;

export { userSlice };

