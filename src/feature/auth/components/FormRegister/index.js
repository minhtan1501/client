import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar, Button,
  LinearProgress, makeStyles, Typography
} from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-controls/InputField";
import PasswordField from "../../../../components/form-controls/PasswordField";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4),
    position: "relative",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: "center",
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
    position: "absolute",
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const classes = useStyles();
  const schema = yup
    .object()
    .shape({
      fullname: yup
        .string()
        .required("Please enter your full name")
        .test(
          "should has at least two words",
          "Please enter at least two words",
          (value) => {
            return value.split(" ").length >= 2;
          }
        ),
      email: yup
        .string()
        .required("Please enter your email")
        .email("Please enter a valid email address "),
      password: yup
        .string()
        .required("Please enter yours password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\\.])[A-Za-z\d@$!%*?&\\.]{8,}$/,
          "Please enter a valid password"
        ),
      retypePassword: yup
        .string()
        .required("Please retype your password")
        .oneOf([yup.ref("password")], "Password dose not match"),
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    formState: { isSubmitting  },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = async (values) => {
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
        Create An Account
      </Typography>
      <form onSubmit={handleSubmit((d) => handleSubmitForm(d))}>
        <InputField
          register={register}
          control={control}
          errors={errors}
          name="fullname"
          label="Full Name"
        />
        <InputField
          register={register}
          control={control}
          errors={errors}
          name="email"
          label="Email"
        />
        <PasswordField
          register={register}
          control={control}
          errors={errors}
          name="password"
          label="Password"
        />
        <PasswordField
          control={control}
          errors={errors}
          name="retypePassword"
          label="Retype Password"
        />
        <Button
          size="large"
          disabled={isSubmitting}
          type="submid"
          fullWidth
          className={classes.submit}
          variant="contained"
        >
          CREATE AN ACCOUNT
        </Button>
      </form>
    </div>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default RegisterForm;
