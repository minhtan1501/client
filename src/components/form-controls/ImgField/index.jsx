import React from "react";
import PropTypes from "prop-types";
import { FormHelperText, InputLabel, makeStyles } from "@material-ui/core";
import { Controller } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: "flex",
    flexFlow: "row nowrap",
    maxWidth: "160px",
    alignItems: "center",
  },
}));
function ImgField(props) {
  const { errors, name, label, control, handleSubmit } = props;
  const hasError = errors[name];
  const classes = useStyles();
  return (
    <FormControl error={!!hasError} margin="normal">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <input type="file" id={name} {...field} label={label} name={name} />
          );
        }}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

ImgField.propTypes = {};

export default ImgField;
