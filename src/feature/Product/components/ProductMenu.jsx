import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, makeStyles } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },
    '& > li > a': {
      color: theme.palette.grey[700],
    },
    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      fontWeight: '500'
    },
  },
}));
function ProductMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={`${url}/description`} exact>
          Description
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/additional`}>
          Additional Information
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${url}/reviews`}>
          Reviews
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
