import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import productsApi from "../../../api/ProductsApi";
import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import callbackSlice from "../../../redux/callback";
import uploadApi from "../../../api/uploadApi";
import Swal from "sweetalert2";
import FilterByCategory from "../components/Filters/FilterByCategory";
import ProductFilters from "../components/ProductFilters";
const useStyles = makeStyles((theme) => ({
  root: {},

  left: {
    width: "250px",
  },

  right: {
    flex: 1,
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "10px",
  },
}));
function ListPage(props) {
  const classes = useStyles();
  const [productList, setProductList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const callback = useSelector((state) => state.callback);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [filter,setFilter] = React.useState({
    page:1,
    limit:9,
    sort: 'price',
    search: '',
    category: null,
    price: 500,
  });
  React.useEffect(() => {
    (async () => {
      setLoading(true)
      const url = `page=${filter.page}&limit=${filter.limit}&sort=${filter.sort}&${filter.category ? `category=${filter.category}`:null}&price[gte]=${filter.price}`
      const res = await productsApi.getAllProducts(url);
      setProductList([...res.products]);
      setLoading(false);
    })();
  }, [callback,filter]);
  const handleDeleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      await productsApi.deleteProduct(id);
      await uploadApi.destroyImg({ public_id:public_id }, user.token);
      setLoading(false);

      dispatch(callbackSlice.actions.setCallback(!callback));
    } catch (err) {
      console.log(err.toString());
    }
  };
  const alertDeleteProduct = async (id, public_id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure',
      text: 'You will not be able to recover this Categories!',
      showConfirmButton: true,
      showCancelButton: true
    }).then(result =>{
        if(result.isConfirmed){
          handleDeleteProduct(id, public_id);
        }
    })
  }
 
  const handleFiltersChange = (value) => {
    setFilter((pre) => {
      return {
        ...pre,
        ...value,
      };
    });
    // const filter = {
    //   ...queryParam,
    //   ...value
    // }
    // history.push({
    //   pathname:history.location.pathname,
    //   search: queryString.stringify(filter),
    // })
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <ProductFilters filter={filter} onChange={handleFiltersChange}/>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              {loading ? (
                <ProductSkeletonList length={9} />
              ) : (
                <ProductList
                  data={productList}
                  handleDeleteProduct={alertDeleteProduct}
                  admin={user?.current?.isAdmin}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

ListPage.propTypes = {};

export default ListPage;
