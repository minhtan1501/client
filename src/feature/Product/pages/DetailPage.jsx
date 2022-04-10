import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import productsApi from "../../../api/ProductsApi";
import { addTocart } from "../../Cart/cartSlice";
import AddToCartForm from "../components/AddToCartForm";
import ProductInfo from "../components/ProductInfo";
import ProductThumnail from "../components/ProductThumnail";
import SwipperProduct from "../components/SwipperProduct";
import {useSnackbar} from 'notistack'
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: "500px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: 1,
    padding: theme.spacing(1.5),
  },
  swiper: {
    height: "300px",
    width: "auto",
    marginTop: theme.spacing(4),
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = React.useState({});
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.current.data)
  const {enqueueSnackbar} = useSnackbar()
  React.useEffect(() => {
    (async () => {
      try {
        const res = await productsApi.getProductById(productId);
        setProduct(res);
      } catch (err) {
        navigate("/not-found");
      }
    })();
  }, [productId]);

  const handleAddtoCartSubmit = ({ quantity }) => {
    if(!user) return enqueueSnackbar("Please Login or Register", {
      variant: "warning",
      autoHideDuration: 1000,
    });
    const action = addTocart({
      product,
      quantity,
    });
    dispatch(action);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumnail product={{}} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddtoCartSubmit}/>
            </Grid>
          </Grid>
        </Paper>
        <SwipperProduct/>
      </Container>
    </Box>
  );
}

DetailPage.propTypes = {};

export default DetailPage;
