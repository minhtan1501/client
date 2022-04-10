import React from "react";
import PropTypes from "prop-types";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { formatPrice } from "../../../utils";
import AddToCartForm from "./AddToCartForm";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  price: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(1,1),
    fontSize: '18px'
  },
  title: {
    color: theme.palette.primary.main
  },
  description:{
    maxWidth:'400px'
  }
}));
function ProductInfo({ product = {} }) {
  const classes = useStyles();
  const { title, description, price, content, sold } = product;

  return (
    <>
    
    <Box className={classes.root}>
      <Typography component="h1" variant="h4" className={classes.title}>
        {title}
      </Typography>
      <Typography component="p" className={classes.price}>{formatPrice(price)}</Typography>
      <Typography variant="body2" className={classes.description}>
        {description}
      </Typography>
      <Typography component="p">Sold: {sold}</Typography>
    </Box>
    
    </>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
