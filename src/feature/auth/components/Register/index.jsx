import { unwrapResult } from "@reduxjs/toolkit";
import { register } from "../../UserSlice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import RegisterForm from "../FormRegister";
import {getToken} from "../../UserSlice"
function Register(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      values.name = values.fullname;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      props?.closeDialog();
      enqueueSnackbar("Register successfully!!! ✌🏻", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      console.log(err);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

Register.propTypes = {
  closeDialog: PropTypes.func,
};

export default Register;
