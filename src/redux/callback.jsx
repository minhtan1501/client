import { createSlice } from "@reduxjs/toolkit";

const callbackSlice =  createSlice({
    name: "callback",
    initialState:{
        callback:true,
    },
    reducers:{
        setCallback:(state,action) => {
            state.callback = action.payload
        }
    }
});

export default callbackSlice;