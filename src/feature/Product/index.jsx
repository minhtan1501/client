import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import { Box } from '@material-ui/core';
import DetailPage from './pages/DetailPage';

ProductFeature.propTypes = {
    
};

function ProductFeature(props) {
    return (
        <Box pt={3}>
            <Routes>
                <Route path='/' element={<ListPage/>} />
                <Route path=":productId" element={<DetailPage/>} />

            </Routes>
        </Box>
    );
}

export default ProductFeature;