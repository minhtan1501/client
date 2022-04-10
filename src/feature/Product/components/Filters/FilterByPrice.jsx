import { Box, Button, TextField, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`
  },
  range: {
    display: 'flex',
    margin: theme.spacing(2,0,2,0),
    flexFlow: 'row nowrap',

    '& > span':{
      margin: theme.spacing(0,1,0,1)
    },
    alignItems:'center'

  }
}))

function FilterByPrice({ onChange}) {
  const classes = useStyles();
  const handleSubmit = () => {
    if(!onChange) return;
    onChange(values);
  }
  const [values,setValues] = React.useState({
      salePrice_gte: 0,
      salePrice_lte: 0, 
  })
  const handleChange = (e) => {
    const {name,value} = e.target
    setValues(pre =>{
      return {
        ...pre,
        [name]: value
      }
    })
  }

  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">
        Giá
      </Typography>
      <Box className={classes.range}>
        <TextField type="number" name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange}/>
        <span>-</span>
        <TextField type='number' name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange}/>
      </Box>


      <Button variant="outlined" onClick={handleSubmit} color='primary'>Áp dụng</Button>
    </Box>
  )
}

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
}

export default FilterByPrice
