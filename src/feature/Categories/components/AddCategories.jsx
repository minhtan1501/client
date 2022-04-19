import React from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../../../components/form-controls/InputField";
import { Box, Button, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  submit: {
      maxWidth: '50px',
      padding: theme.spacing(1,2),
      backgroundColor: theme.palette.success.main,
      color: '#fff',
      fontWeight: 'bold',
      '&:hover':{
          backgroundColor: theme.palette.success.light
      }
  },
  wapper:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  input:{
    margin: theme.spacing(1,1),
  }
}));
function AddCategories({onSubmit,categories}) {
  const classes = useStyles();

  const schema = yup
    .object()
    .shape({
      categories: yup.string().required("Please enter name category"),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      categories:'' ,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitAddCategories = (d) => {
    if (onSubmit){
      reset();
      return onSubmit(d);
      
    } 
    return;
  };
  React.useEffect(() => {
    reset({categories: categories.name})
  },[categories])
  return (
    <form onSubmit={handleSubmit((d) => handleSubmitAddCategories(d))}>
      <Box className={classes.wapper}>
          <Box className={classes.input}>
      <InputField
        control={control}
        errors={errors}
        name="categories"
        label="Categories"
      />
          </Box>
      <Button
        size="small"
        disabled={isSubmitting}
        type="submit"
        fullWidth
        className={classes.submit}
        variant="contained"
      >
        {
          categories.onEdit ? 'Update': 'Save'
        }
      </Button>

      </Box>
    </form>
  );
}

AddCategories.propTypes = {};

export default AddCategories;
