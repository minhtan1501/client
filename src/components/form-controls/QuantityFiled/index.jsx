import { Box, FormHelperText, makeStyles, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: "flex",
    flexFlow: "row nowrap",
    maxWidth: "160px",
    alignItems: "center",
  },
}));

function QuantityField(props) {
  const { errors, name, label, control,handleSubmit } = props;
  const hasError = errors[name];
  const classes = useStyles();
  return (
    <FormControl
      size="small"
      error={!!hasError}
      fullWidth
      margin="normal"
      variant="outlined"
    >
      <Typography variant="body2">{!handleSubmit && label }</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box className={classes.box}>
            <IconButton
              onClick={() =>{
                if(handleSubmit){
                  if(field.value === 1) return handleSubmit(1)
                  field.onChange(Number.parseInt(field.value)?Number.parseInt(field.value) - 1 :1 )
                  return  handleSubmit(field.value - 1 )
                }
                field.onChange(Number.parseInt(field.value)?Number.parseInt(field.value) - 1 :1 )
              }
              }
            >
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>

            <OutlinedInput
              type="number"
              {...field}
              onChange={(e) =>{
                if(handleSubmit) handleSubmit(Number.parseInt(e.target.value))
                field.onChange(Number.parseInt(e.target.value))
              }}
            />
            <IconButton
              onClick={() =>{
                field.onChange(Number.parseInt(field.value)?Number.parseInt(field.value) + 1 :1 )
                if(handleSubmit)
                {
                  handleSubmit(field.value + 1 )
                }
              }
              }
            >
              <AddCircleOutlineOutlinedIcon />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

QuantityField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
};

export default QuantityField;
