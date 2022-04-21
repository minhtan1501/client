import React from 'react';
import { Box, makeStyles, Paper } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
// import FilterByService from './Filters/FilterByService';


const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        flexDirection: 'column',
    }
}))

function ProductFilters({filters, onChange}) {
    const classes = useStyles();
    const handleCategoryChange = (value) =>{
        if(!onChange) return
        const newFilters = {
            ...filters,
            category: value
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
        <Box component={Paper} className={classes.root}>
            <FilterByCategory onChange={handleCategoryChange}/>
            <FilterByPrice onChange={handlePriceChange} />
            {/* <FilterByService  filters={filters} onChange={handleServiceChange} /> */}
        </Box>
    );
}

export default ProductFilters;