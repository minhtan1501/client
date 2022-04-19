import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "300px",
    width: "250px",
    margin: theme.spacing(3),
    position: "relative",
    border: ` 1px solid ${theme.palette.grey[300]}`,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",

  },
  img: {
    width: "100%",
    objectFit: "contain",
    height: "100%",
  },
  deleteIcon: {
    position: "absolute",
    backgroundColor: "crimson",
    color: " #fff",
    width: "24px",
    height: "24px",
    textAlign: "center",
    borderRadius: "50%",
    right: "-5px",
    top: "-9px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
}));
function ImageProduct({url,handleDeleteImg}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {Object.keys(url).length !==0 ? (
        <>
          <img
            className={classes.img}
            src={url.url}
          />
          <Box onClick={handleDeleteImg} component="span" className={classes.deleteIcon}>
            x
          </Box>
        </>
      ) : (
        <Typography
          className={classes.title}
          component="h4"
          variant="h4"
          align="center"
        >
          No images
        </Typography>
      )}
    </Box>
  );
}

export default ImageProduct;
