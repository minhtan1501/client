import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

ProductFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,
};

function ProductFilters({filters, onChange}) {
    
    const handleCategoryChange = (categoryId) =>{
        if(!onChange) return
        const newFilters = {
            ...filters,
            "category.id": categoryId
        };

        onChange(newFilters);
    }
    const handlePriceChange = (values) =>{
        if(!onChange) return
        const newFilters = {
            ...filters,
            "salePrice_gte": values.salePrice_gte,
            "salePrice_lte":values.salePrice_lte,
        };

        onChange(newFilters);
    }

    const handleServiceChange = (values) =>{
        if(!onChange) return
        const newFilters = {
            ...filters,
            ...values
        };

        onChange(newFilters);
    }

    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange}/>
            <FilterByPrice onChange={handlePriceChange} />
            <FilterByService  filters={filters} onChange={handleServiceChange} />
        </Box>
    );
}

export default ProductFilters;