import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

function PasswordField(props) {
  const { errors, name, label, control } = props;
  const hasError = errors[name];
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!hasError}
      margin="normal"
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            id={name}
            type={showPassword ? "text" : "password"}
            // disabled={disabled}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            {...field}
            label={label}
            name={name}
          />
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default PasswordField;
