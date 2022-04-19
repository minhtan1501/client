import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { formatPrice } from "../../../utils/common";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    cursor: "pointer",
    position: "relative",
  },
  img: {
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale(1.03)" },
    objectFit: "contain",
  },
  price: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  description: {
    height: "50px",
    fontFamily: "",
  },
  edit: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  delete:{
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'crimson',
    color: "#fff",
  }
}));
function Product({ product }) {
  const navigate = useNavigate();
  const classes = useStyles();
  // const history = useHistory();
  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };
  const handleClickEdit = () =>{
    navigate(`/editproduct/${product._id}`);
  }
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.root}>
      <CardMedia
        component="img"
        height="200"
        image={product.images.url}
        alt="green iguana"
        className={classes.img}
        onClick={handleClick}
      />
      <EditOutlinedIcon onClick={handleClickEdit} className={classes.edit} />
      <DeleteOutlineOutlinedIcon className={classes.delete} />
      <CardContent>
        <Box
          sx={{
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": 1,
            height: "20px",
            fontSize: "16px",
            overflow: "hidden",
            fontWeight: "bold",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          }}
          onClick={handleClick}
        >
          {product.title}
        </Box>
        <Typography
          onClick={handleClick}
          className={classes.price}
          variant="body2"
          color="secondary"
        >
          {formatPrice(product.price)}
        </Typography>
        <Box
          onClick={handleClick}
          sx={{
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            "-webkit-line-clamp": 3,
            height: "50px",
            overflow: "hidden",
            fontWeight: "500",
            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
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
