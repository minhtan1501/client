import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../utils";
import PaypalButton from "../PaypalButton";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    maxWidth: "200px",
    marginLeft: "auto",
  },
  item: {
    fontWeight: "600",
    fontSize: "20px",
  },
  wrap: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  btn: {
    backgroundColor: "#16CC9B",
    margin: theme.spacing(2, "auto"),
    padding: theme.spacing(0.7, 1.5),
    "&:hover": {
      backgroundColor: "#60e9c4",
    },
    display: "flex",

    "& > span > a": {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "600",
    },
  },
}));
function SubTotal({ total,onSubmit }) {
  const classes = useStyles();
  const tranSuccess = async (payment) => {
    if(!onSubmit) return;
    onSubmit(payment)
  };
  return (
    <Box component="div" className={classes.root}>
      <Box className={classes.wrap}>
        <Typography
          color="secondary"
          component="p"
          variant="body2"
          className={classes.item}
        >
          Total
        </Typography>
        <Typography
          color="secondary"
          component="p"
          variant="body2"
          className={classes.item}
        >
          {formatPrice(total)}
        </Typography>
      </Box>
      <Button className={classes.btn}>
        {/* <Link to='/checkout'>Check Out</Link> */}
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </Button>
    </Box>
  );
}

export default SubTotal;
