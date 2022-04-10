import { Box, Container, Divider, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import paymentApi from "../../api/paymentApi";
import { cartItemsCountSelector, cartTotalSelector } from "./cartSelector";
import { clearCart } from "./cartSlice";
import CartEmty from "./components/CartEmty";
import CartItem from "./components/CartItem";
import HeaderCard from "./components/HeaderCart";
import SubTotal from "./components/SubTotal";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: "100%",
  },
  wrapper:{
    "maxHeight": "70vh",
    "overflowY": "auto",
  },
  container:{
    paddingTop: theme.spacing(3)
  }
}));
function CartDetail(props) {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const quantityCart = useSelector(cartItemsCountSelector);
  const cartList = useSelector((state) => state.cart.cartItems);
  const totalPriceCart = useSelector(cartTotalSelector);
  const token = useSelector(state => state.user.token);
  const handlePaymentPayPal = async(value) =>{
    try{
      const {paymentID, address} = value;
      await paymentApi.createPayment({cart:cartList,paymentID, address},token)
      dispatch(clearCart())
      enqueueSnackbar("You have successfully placed an oder.", { variant: 'success' });

    } catch(err){
      console.log(err);
    } 

  }
  return (
    <Paper elevation={0} className={classes.root} >
      <Container className={classes.container} >
        <HeaderCard count={quantityCart} />
        {quantityCart === 0 ? (
          <CartEmty />
        ) : (
          <Box className={classes.wrapper}>
            {cartList.map((item,index) => <CartItem product={item} key={index} />)}

          </Box>
        )}
        {quantityCart > 0 ? <>
          <Divider light />
          <SubTotal total={totalPriceCart} onSubmit={handlePaymentPayPal}/>
        </> : ''}
        
      </Container>
    </Paper>
  );
}

CartDetail.propTypes = {};

export default CartDetail;
