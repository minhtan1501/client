import { Box, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow:'column'
    },
    title: {
        fontWeight: 'bold'
    },
    total:{
        justifyContent: 'end',
        display: 'flex',
    }

}))
function HeaderCard({count}) {
    const classes = useStyles();
  return (
    <Box className={classes.root}>
        <Typography className={classes.title} variant='h5'>SHOPPING CART</Typography>
        <Typography className={classes.total} component='p' variant='body2'>{count} Items in the bag</Typography>
    </Box>
  )
}

export default HeaderCard