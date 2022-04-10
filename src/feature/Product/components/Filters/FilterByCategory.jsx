import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
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
        const response = await categoryApi.getAll();
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
      <Typography variant={'subtitle2'}>DANH MỤC SẢN PHẨM</Typography>
      {loadding ? (
        Array.from(new Array(6)).map((x, index) => <Skeleton key={index} />)
      ) : (
        <ul className={classes.menu}>
          {categoryList.map((category ,index) => (
            <li  onClick={() => handleCategoryClick(category.id)} key={category.id}>
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
