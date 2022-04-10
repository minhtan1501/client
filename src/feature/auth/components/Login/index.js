import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../UserSlice';
import LoginForm from '../FormLogin';
function Login(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      props?.closeDialog();
      window.location.href = '/';
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
      console.log(err)
    }
  };
  return (
    <div>
      <LoginForm  onSubmit={handleSubmit} />
    </div>
  );
}

Login.propTypes = {
  closeDialog: PropTypes.func,
};

export default Login;