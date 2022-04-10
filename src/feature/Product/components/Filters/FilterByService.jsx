import {
  Box,
  Button,
  TextField,
  Typography,
  makeStyles,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& > li': {
      marginTop: theme.spacing(1),
      '& > label':{
        fontSize:"14px",
          '& > span:nth-child(2)':{
            fontSize:'14px'
          }
      }
    },
  },
}));

function FilterByService({ onChange, filters }) {
  const classes = useStyles();
  const handleChange = (e) => {
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">DỊCH VỤ</Typography>
      <ul className={classes.list}>
        {[{name:'isPromotion',label:"Có khuyến mãi"}, {name:'isFreeShip',label:"Vận chuyển miễn phí"}].map((service,index) => (
          <li key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.name])}
                  onChange={handleChange}
                  name={service.name}
                  color="primary"
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

export default FilterByService;
