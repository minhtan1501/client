import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string';
import productsApi from '../../../api/ProductsApi'
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core'
import ProductList from '../components/ProductList'
import ProductSkeletonList from '../components/ProductSkeletonList'
import './styles.css'
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: '250px',
  },

  right: {
    flex: 1,
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    paddingBottom: '10px',
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList,setProductList] = React.useState([])
  const [loading,setLoading] = React.useState(true)
  const callback = useSelector(state => state.callback)
  React.useEffect(()=>{
    (async()=>{
      const query ={
        page:1, 
        limit: 9}
      const res = await productsApi.getAllProducts(query)
  
      setProductList(res.products)
      setLoading(false);
    })()
  },[callback])
  return (
    <Box>
      <Container>
      <Grid container spacing={1}>
      <Grid item  className={classes.left}>
        Filter
      </Grid>
      <Grid item  className={classes.right}>
        <Paper elevation={0}>
        {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList data={productList} />
              )}

        </Paper>
      </Grid>
      </Grid>

      </Container>
    </Box>
  )
}

ListPage.propTypes = {}

export default ListPage
