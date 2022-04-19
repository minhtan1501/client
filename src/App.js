import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import ProductFeature from "./feature/Product";
import HomeFeature from "./feature/Home";
import NotFound from "./components/NotFound";
import { useDispatch,useSelector } from "react-redux";
import React from "react";
import { getToken } from "./feature/auth/UserSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import userApi from "./api/userApi";
import actions from "./feature/auth/UserSlice";
import CartDetail from "./feature/Cart";
import "./index.css";
import { initValueCart } from "./feature/Cart/cartSlice";
import HistoryOder from "./feature/HistoryOder";
import { Box, CircularProgress } from "@material-ui/core";
import Categories from "./feature/Categories";
import CreateProduct from "./feature/CreateProduct";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const [loading,setLoading] = React.useState(false);
  const initCart = useSelector((state) => state.user.current);
  React.useEffect(() => {
    const refresh = async () => {
      try {
        if (!localStorage.getItem("firstLogin")) {
          setLoading(false);
          return
        };
        const action = getToken();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    refresh();
    setTimeout(()=>{
      refresh();
    },10*24*1000)
  }, [user.token]);
  React.useEffect(() => {
    (async () => {
      if (!user.token) return;
      try {
        const res = await userApi.getUser(user.token);
        dispatch(actions.setUser({ data: res, isAdmin: !!res.role }));
      } catch (err) {}
    })();
  }, [user.token]);

  React.useEffect(() => {
    (async () => {
      if (!user.token) return;
      try {
        await userApi.addCart({ token: user.token, cart: cart });
      } catch (err) {}
    })();
  }, [cart]);
  React.useEffect(() => {
    if (initCart) {
      dispatch(initValueCart(initCart?.data?.cart));
    }
  }, [initCart]);

  if(loading){
    return (
      <Box>
        <CircularProgress/>
      </Box>
    )
  }

  return (
    <div>
      <Header isAdmin={user?.current?.isAdmin}/>

      <Routes>
        <Route
          path="/history/*"
          element={user.token ? <HistoryOder /> : <NotFound />}
        />
        <Route
          path="/categories"
          element={user?.current?.isAdmin ? <Categories /> : <NotFound />}
        />
        <Route
          path="/createproduct"
          element={user?.current?.isAdmin ? <CreateProduct /> : <NotFound />}
        />
        <Route
          path="/editproduct/:id"
          element={user?.current?.isAdmin ? <CreateProduct /> : <NotFound />}
        />
        <Route path="product/*" element={<ProductFeature />} />
        <Route path="/home" element={<HomeFeature />} />
        <Route path="cart" element={<CartDetail />} />
        <Route path="/" element={<HomeFeature />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
