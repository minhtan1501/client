import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Typography,
  makeStyles,
  Button,
  LinearProgress,
} from '@material-ui/core';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';
// import InputField from '../../../../components/form-controls/InputField';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: 'relative',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 0),
    backgroundColor: "#d70018",
    color: '#fff',
    fontWeight: "bold",
    '&:hover':{
      backgroundColor: "#DF3346"
    }
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function LoginForm(props) {
  const classes = useStyles();
  const schema = yup
    .object()
    .shape({
      email: yup
        .string()
        .required('Please enter your email')
        .email('Please enter a valid email address '),
      password: yup
        .string()
        .required('Please enter yours password'),
    })
    .required();

  const {register,
    control,
    handleSubmit,
    formState: { errors },
    formState: { isSubmitting  }} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitLogin = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) await onSubmit(values);
  };


  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography
        className={classes.title}
        color="textPrimary"
        component="h3"
        variant="h5"
      >
        Sign in
      </Typography>
      <form onSubmit={handleSubmit(d =>handleSubmitLogin(d))}>
        <InputField control={control}  errors={errors}  name="email" label="Email" />
        <PasswordField control={control} errors={errors} name="password" label="Password" />
        <Button
          size='large'
          disabled={isSubmitting}
          type="submid"
          fullWidth
          className={classes.submit}
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default LoginForm;