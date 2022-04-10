import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
// import { STATIC_HOST } from 'constants/index';
// import { THUMBNAIL_PLACEHOLDER } from 'constants';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

function ProductThumnail({ product }) {
  // const thumbnailUrl = product.thumbnail
  //   ? `${STATIC_HOST}${product.thumbnail?.url}`
  //   : THUMBNAIL_PLACEHOLDER;
    const images = [
        {
          original: 'https://res.cloudinary.com/dtvwgsmrq/image/upload/v1648879173/baocao/wcas5yx4oxnqju3nfbgj.jpg',
          thumbnail: 'https://res.cloudinary.com/dtvwgsmrq/image/upload/v1648879173/baocao/wcas5yx4oxnqju3nfbgj.jpg',
        },
        {
          original: 'https://picsum.photos/id/1015/1000/',
          thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
          original: 'https://picsum.photos/id/1019/1000/',
          thumbnail: 'https://picsum.photos/id/1019/250/150',
        },
      ]
  return (
      <Box >
          <ImageGallery items={images}  slideDuration={300} showNav={false} showPlayButton={false} showFullscreenButton={false}/>
      </Box>
  );
}

ProductThumnail.propTypes = {
  product: PropTypes.object,
};

export default ProductThumnail;
