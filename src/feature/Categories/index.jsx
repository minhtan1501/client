import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import categoryApi from "../../api/categoryApi";
import { clearEdit, setEdit } from "./categoriesSlice";
import AddCategories from "./components/AddCategories";
import CategoriesList from "./components/CategoriesList";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "70vh",
    boxShadow: "1px 0px 10px #e1dbdb",
    overflowY:" auto"
  },
  left: {
    width: "300px",
    height: "auto",
    maxHeight: "100%",
    paddingRight: theme.spacing(1),
  },
  right: {
    paddingLeft: theme.spacing(3),
    borderLeft: "1px solid #ccc",
  },
  title: {
    padding: theme.spacing(1, 0),
    fontWeight: "bold",
  },
}));
function Categories(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [categoryList, setCategoryList] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [callback, setCallback] = React.useState(true);
  const categories = useSelector(state => state.categories)  
  React.useEffect(() => {
    (async () => {
      try {
        const res = await categoryApi.getAllCategory();
        setCategoryList(res);
      } catch (err) {}
    })();
  }, [callback]);
  // edit and create
  const onSubmit = async (value) => {
    try {
      if(categories.onEdit){
        await categoryApi.updateCategoryById({ name: value.categories },categories.id,user.token);
        dispatch(clearEdit())
      }
      else{

        await categoryApi.createCategory({ name: value.categories }, user.token);
      }
      enqueueSnackbar("Create Categories Successfuly!", { variant: "success" });
      setCallback(!callback);
    } catch (err) {
      enqueueSnackbar(err.data?.message, { variant: "error" });
    }
  };
  // Handle delete category
  const handleDeleteCategory = async (value) => {
    try {
      await categoryApi.deleteCategoryById(value, user.token);
      enqueueSnackbar("Delete Categories successfuly!", { variant: "success" });
      setCallback(!callback);
    } catch (err) {}
  };
  //Handle Edit category
  const handleClickEdit = (name, id, onEdit) => {
    dispatch(setEdit({ name: name, id: id}))
  };
  return (
    <Paper elevation={0}>
      <Box pt={3} pb={3}>
        <Container className={classes.root}>
          <Typography
            className={classes.title}
            align="center"
            component="h4"
            variant="h4"
          >
            CATEGORIES
          </Typography>
          <Grid container justifyContent="center" >
            <Grid item className={classes.left}>
              <AddCategories onSubmit={onSubmit} categories={categories}/>
            </Grid>
            <Grid item className={classes.right}>
              <CategoriesList
                list={categoryList}
                handleDeleteCategory={handleDeleteCategory}
                handleClickEdit={handleClickEdit}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Paper>
  );
}

export default Categories;
