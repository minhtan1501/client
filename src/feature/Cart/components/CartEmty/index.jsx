import React from 'react'
import PropTypes from 'prop-types'
import { Box, Button, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    title:{
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        margin: '0 auto',
        display: 'flex',
        backgroundColor: theme.palette.success.main,
        marginTop: theme.spacing(2),
        '&:hover':{
            backgroundColor: theme.palette.success.light
        },

        '& > span > a ':{
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
        }
    },
    img:{
        margin: '0 auto',
        display: 'flex',
        height: '300px',
        
    }
}))
function CartEmty(props) {
    const classes = useStyles();
  return (
    <Box pt={4}>
        <Typography className={classes.title} component='h5' variant='h5'>There are no products in your cart</Typography>
        <img src='empty-cart.png' className ={classes.img}/>
        <Button size='large' className={classes.btn}>
            <Link to='/product'>
                Shopping Now
            </Link>
        </Button>
    </Box>
  )
}

CartEmty.propTypes = {}

export default CartEmty
