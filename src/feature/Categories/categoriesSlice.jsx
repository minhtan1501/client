import { createSlice } from "@reduxjs/toolkit";


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    name:'',
    onEdit: false,
    id:""

  },
  reducers: {
    setEdit: (state,action) => {
        state.onEdit = true;
        state.name = action.payload.name;
        state.id = action.payload.id
    },
    clearEdit: (state) => {
        state.onEdit = false;
        state.name = '';
        state.id = '';
    }
     
  },
});

const { actions, reducer } = categoriesSlice;

export const {setEdit,clearEdit} = actions;

export  {categoriesSlice};