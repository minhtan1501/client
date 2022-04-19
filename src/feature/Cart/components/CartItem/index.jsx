import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import QuantityField from "../../../../components/form-controls/QuantityFiled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatPrice } from "../../../../utils";
import { useDispatch } from "react-redux";
import { removeFromCart, setQuantity } from "../../cartSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  left: {
    display: "flex",
  },
  img: {
    width: "200px",
    height: "150px",
  },
  price: {
    fontWeight: "bold",
  },
  deleteIcon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));
function CartItem({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const schema = yup
    .object()
    .shape({
      quantity: yup
        .number()
        .min(1, "Minimum value is 1")
        .typeError("Amount must be a number")
        .required("Please enter quantity"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: product.quantity || 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitAdd = (value) => {
    dispatch(
      setQuantity({
        id: product.product._id,
        quantity: value,
      })
    );
  };
  const handleDeleteCartItem = () => {
    dispatch(
      removeFromCart(product.product._id)
    );
  };
  return (
    <Grid container className={classes.root}>
      <Grid item xs={8} md={8} lg={8} sm={8}>
        <Grid container className={classes.left}>
          <Grid
            item
            sm={5}
            xs={0}
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
          >
            <img
              className={classes.img}
              src={`${product.product.images.url}`}
            />
          </Grid>
          <Grid item sm={7} xs={12} md={8} lg={9} pl={1}>
            <Typography component="h6" variant="h5">
              {product.product.title}
            </Typography>
            <Typography component="p" variant="h6" className={classes.price}>
              {formatPrice(product.product.price)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} md={4} lg={4} sm={4}>
        <Box sx={{ display: "flex" }}>
          <QuantityField
            errors={errors}
            control={control}
            name="quantity"
            label="Quantity"
            onSubmit={handleSubmit}
            handleSubmit={handleSubmitAdd}
          />
          <IconButton
            size="small"
            color="secondary"
            className={classes.deleteIcon}
            onClick = {handleDeleteCartItem}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

CartItem.propTypes = {};

export default CartItem;
