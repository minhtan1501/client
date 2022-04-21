import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from '../../../../api/categoryApi'
import { Skeleton } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all 0.25s',
      '&:hover': {
        cursor: 'pointer',
        color: theme.palette.primary.light,
        fontSize: '14px',
      },
    },
  },
}));

function FilterByCategory({ onChange }) {
  const classes = useStyles();
  const [loadding, setLoading] = React.useState(true);
  const [categoryList, setCategoryList] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAllCategory();
        setCategoryList(response);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch category list', err);
        setLoading(false);
      }
    })();
  }, []);
  const handleCategoryClick = (category) => {
    if (!onChange) return;

    onChange(category);
  };
  return (
    <Box className={classes.root}>
      <Typography  variant='h6'>Category</Typography>
      {loadding ? (
        Array.from(new Array(categoryList.length)).map((x, index) => <Skeleton key={index} />)
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category ,index) => (
            <li  onClick={() => handleCategoryClick(category.name)} key={category._id}>
              <Typography variant="body2">{category.name}</Typography>
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
}

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByCategory;
