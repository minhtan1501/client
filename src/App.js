import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';
import ProductFeature from "./feature/Product";
import HomeFeature from "./feature/Home";
import NotFound from "./components/NotFound";
import { useDispatch } from "react-redux";
import React from "react";
import { getToken } from "./feature/auth/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import {  useSelector } from 'react-redux'
import userApi from "./api/userApi";
import actions from "./feature/auth/UserSlice"
import CartDetail from "./feature/Cart";
import './index.css'
import { initValueCart } from "./feature/Cart/cartSlice";
import HistoryOder from "./feature/HistoryOder";
function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const cart = useSelector(state => state.cart.cartItems)
  const initCart = useSelector(state => state.user.current)
  React.useEffect(()=>{
    (async()=>{
      try {
        if(!localStorage.getItem("firstLogin"))return
        const action = getToken();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      
      } catch (err) {
        console.log(err)
      }
    })()
  },[token])
  React.useEffect(()=>{
    (async()=>{
      if(!token) return
      try {
        const res = await userApi.getUser(token);
        dispatch(actions.setUser({data:res, isAdmin: !!res.role}))
      }
      catch (err) {
        
      }
    })()
  },[token])

  React.useEffect(()=>{
    (async()=>{
      if(!token) return
      try {
         await userApi.addCart({token:token,cart:cart})
      }
      catch (err) {
        
      }
    })()
  },[cart])
  React.useEffect(()=>{
    if(initCart){
      dispatch(initValueCart(initCart?.data?.cart))
    }
  },[initCart])

  return (
    <div >
     <Header />
     
     <Routes>
     <Route path='/history' element={token?<HistoryOder/>:<NotFound/>}/>
     <Route path="product/*" element={<ProductFeature/>}/>
     <Route path='/home' element={<HomeFeature />}/>
     <Route path='cart' element={<CartDetail/>} />
     <Route path='/' element={<HomeFeature />}/>
    <Route path='*' element={<NotFound/>}/>
       
     </Routes>
    </div>
  );
}

export default App;
