import React from 'react'
import PropTypes from 'prop-types'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "./style.css";
import { Box, makeStyles, Typography } from '@material-ui/core';
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
function SwipperProduct(props) {
    const classes = useStyles();
  return (
    <Box component="div" className={classes.swiper}>
    <Typography variant="h5">Related Product</Typography>
    <Swiper
      breakpoints={{
        // when window width is >= 640px
        640: {
          width: 640,
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          width: 768,
          slidesPerView: 2,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
    </Swiper>
  </Box>
  )
}

SwipperProduct.propTypes = {}

export default SwipperProduct
