import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { useHistory } from 'react-router-dom';
import { formatPrice } from "../../../utils/common";
import { Link, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    cursor: "pointer",
  },
  img: {
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale(1.02)" },
  },
  price: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  description: {
    height: "50px",
    fontFamily: "",
  },
}));
function Product({ product }) {
  const navigate = useNavigate();
  const classes = useStyles();
  // const history = useHistory();
  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.root} onClick={handleClick}>
      <CardMedia
        component="img"
        height="200"
        image={product.images.url}
        alt="green iguana"
        className={classes.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography className={classes.price} variant="body2" color="secondary">
          {formatPrice(product.price)}
        </Typography>
        <Box
          sx={{ 
           
            display: '-webkit-box',
            "-webkit-box-orient": "vertical",
            '-webkit-line-clamp': 3,
            height:"50px",
            overflow:"hidden",
            fontWeight: '500',
            fontFamily:"Roboto, Helvetica, Arial, sans-serif"
          }}
          color="textSecondary"
        >
            {product.description}
        </Box>
      </CardContent>
    </Card>
  );
}

Product.propTypes = {};

export default Product;
