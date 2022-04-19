import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function SelectField(props) {
  const { errors, name, label, control,data } = props;
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
        defaultValues={data[0].name}
        render={({ field }) => (
          <Select
            id={name}
            {...field}
            label={label}
            name={name}
            defaultValue={data[0]?.name}
          >
              {data.map((item)=>(
                   <MenuItem value={item.name} key={item?._id}>{item.name}</MenuItem>
              ))} 
          </Select>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectField;
