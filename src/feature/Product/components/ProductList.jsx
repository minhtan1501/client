import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Product from './Product';

const ProductList = ({ data = [],handleDeleteProduct,admin }) => {
  return (
    <Box>
      <Grid container>
        {data.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} handleDeleteProduct={handleDeleteProduct} admin={admin}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};

export default ProductList;
