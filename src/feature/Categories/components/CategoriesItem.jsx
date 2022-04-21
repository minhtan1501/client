import React from "react";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2,"auto"),
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1),
    justifyContent: "space-between",
    width: "400px"
  },
  btnEdit: {
    backgroundColor: theme.palette.warning.main,
    fontWeight: "bold",
    '&:hover' : {
        backgroundColor: theme.palette.warning.light
    }
  },
  btnDelete: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
    '&:hover' : {
        backgroundColor: theme.palette.error.light
    }
  },
}));

function CategoriesItem({item,handleDeleteCategory,handleClickEdit}) {
  const classes = useStyles();
const handleClickDelete = (id) =>{
  Swal.fire({
        icon: 'warning',
        title: 'Are you sure',
        text: 'You will not be able to recover this Categories!',
        showConfirmButton: true,
        showCancelButton: true
      }).then(result =>{
          if(result.isConfirmed){
            if(handleDeleteCategory) return handleDeleteCategory(id)
          }
      })
    
}
const handleClickEditCategory = () =>{
  if(handleClickEdit) return handleClickEdit(item.name,item._id,true)
}
  return (
    <Box className={classes.root}>
      <Typography component="p" variant="body2">
        {item.name}
      </Typography>
      <Box>
        <Button onClick={handleClickEditCategory} className={classes.btnEdit}>Edit</Button>
        <Button onClick={()=>handleClickDelete(item._id)} className={classes.btnDelete}>Delete</Button>
      </Box>
    </Box>
  );
}

CategoriesItem.propTypes = {};

export default CategoriesItem;
