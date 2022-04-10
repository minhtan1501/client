import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';
import productApi from 'api/productApi';
import categoryApi from 'api/categoryApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    listStyleType: 'none',
    margin: theme.spacing(2, 0),
    padding: 0,
    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: (filters) => true,
    isRemovable: false,
    onRemove: (filters) => false,
    onToggle: (filters) => {
      const newFilters = { ...filters };
      console.log(newFilters);
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      console.log(newFilters);

      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có Khuyến mãi',
    isVisible: (filters) => filters.isPromotion,
    isActive: () => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 3,
    getLabel: (filters) =>
      `Từ ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
        filters.salePrice_gte
      )} đến ${new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(filters.salePrice_lte)}`,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isActive: (filters) => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: null,
  },
  {
    id: 4,
    getLabel: (filters, category) => {
      if (!filters['category.id']) return;
      return category[Number.parseInt(filters['category.id'])-1]?.name;
    },
    isVisible: (filters, category) => Boolean(filters['category.id']),
    isActive: (filters) => true,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };

      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: null,
  },
];

function FilterViewer({ filters = {}, onChange = null, category }) {
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters, category));
  }, [filters]);
  return (
    <Box component="ul" className={classes.root}>
      {category.length > 0 &&
        visibleFilters.map((x) => (
          <li key={x.id}>
            <Chip
              label={x.getLabel(filters, category)}
              color={x.isActive(filters) ? 'primary' : 'default'}
              clickable={!x.isRemovable}
              onDelete={
                x.isRemovable
                  ? () => {
                      if (!onChange) return;
                      const newFilters = x.onRemove(filters);
                      onChange(newFilters);
                    }
                  : null
              }
              onClick={
                x.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return;
                      const newFilters = x.onToggle(filters);
                      console.log(newFilters);
                      onChange(newFilters);
                    }
              }
            />
          </li>
        ))}
    </Box>
  );
}

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default FilterViewer;
