import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import categoryApi from "../../../api/categoryApi";
import uploadApi from "../../../api/uploadApi";
import InputField from "../../../components/form-controls/InputField";
import SelectField from "../../../components/form-controls/SelectField";
import TextareaField from "../../../components/form-controls/TextareaField";
import ImageProduct from "./ImageProduct";
import { useDispatch, useSelector } from "react-redux";
import callbackSlice from "../../../redux/callback";
import productsApi from "../../../api/ProductsApi";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "500px",
    border: ` 1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(3, 2),
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(3),
  },
  submit: {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
    letterSpacing: "2px",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    marginTop: theme.spacing(2),
  },
  title: {
    "&&&": {
      padding: "20px 0",
      fontWeight: "bold ",
      letterSpacing: "2px",
    },
  },
}));

function CreateProductFrom(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [urlImg, setUrlImg] = React.useState({});
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [urlEdit, setUrlEdit] = React.useState({});
  const [type,setType] = React.useState({});
  React.useEffect(() => {
    (async () => {
      try {
        if (id) {
          setLoading(true);
          const res = await productsApi.getProductById(id);
          setUrlEdit(res.images);
          setProduct(res);
          setUrlImg(res.images);
          setLoading(false);
        } else {
          return;
        }
      } catch (err) {
        navigate("/notfound");
      }
    })();
  }, [id]);

  React.useEffect(() => {
    const getUrlExtension = (url) => {
      return url
        ?.split(/[#?]/)[0]
        ?.split(".")
        ?.pop()
        ?.trim();
    }
    const getFile = async () => {
      var imgExt = getUrlExtension(urlEdit.url);
      const response = await fetch(urlEdit.url);
      const blob = await response.blob();
      const file = new File([blob], "profileImage." + imgExt, {
        type: blob.type,
      });
      console.log(file)
      setType(file);
    };
    if(urlEdit){
      getFile();
    }
  },[urlEdit])
  // get category
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await categoryApi.getAllCategory();
        setCategory(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  //set defaul value
  React.useEffect(() => {
    if(product?.category){
      reset({
        title: product?.title,
        price: product?.price,
        description: product?.description,
        category: product?.category,
        images: [type] || {},
      });
    }
  }, [urlEdit,type,category]);

  const schema = yup
    .object()
    .shape({
      images: yup
        .mixed()
        .test("required", "Please select a file", (value) => {
          return  value && value.length;
        })
        .test("fileSize", "The file too large", (value) => {
          console.log(value && value[0]?.size <= 1000000)
          return value && value[0]?.size <= 1000000;
        })
        .test("fileType", "File format is incorrect", (value) => {
          return (
            value[0]?.type === "image/jpeg" || value[0]?.type === "image/png"
          );
        }),
      title: yup.string().required("Please enter Tilte"),
      description: yup.string().required("Please enter Description"),
      price: yup
        .number()
        .required("Please enter Price")
        .min(1, "Minimum value is 1")
        .typeError("Amount must be a number"),
      category: yup.string().required("Please enter Category"),
    })
    .required();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      images: {},
      title: "",
      price: 1,
      description: "",
      category: category[0]?.name || "",
    },
    resolver: yupResolver(schema),
  });


  if (loading) {
    return (
      <Container>
        <CircularProgress style={{ display: "flex", margin: "20px auto" }} />
      </Container>
    );
  }
  const handleSubmitForm = async (value) => {
    try {
      if (id) {
        setLoading(true);
        const newValue = { ...value };
        if (urlImg) {
          newValue.images = urlImg;
        } else {
          newValue.images = urlEdit;
        }
        await productsApi.updateProduct(id, newValue,user.token);
        await uploadApi.destroyImg(
          { public_id: urlEdit.public_id },
          user.token
        );
        setUrlImg({});
        setLoading(false);
        navigate("/product");
      } else {
        setLoading(true);
        const newValue = { ...value };
        newValue.images = urlImg;
        await productsApi.createProduct(newValue,user.token);
        setUrlImg({});
        setLoading(false);
        navigate("/product");
      }
    } catch (err) {
      enqueueSnackbar(err.toString(), { variant: "error" });
    }
  };

  // handleImgChange

  const onChangeImg = async (values) => {
    try {
      let formData = new FormData();
      formData.append("file", values.target.files[0]);
      setLoading(true);
      const res = await uploadApi.upload(formData, user.token);
      setUrlImg(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleDeleteImg = async () => {
    try {
      if (id) {
        if (urlImg.url === urlEdit.url) {
          setUrlImg({});
        } else {
          setLoading(true);
          await uploadApi.destroyImg(
            { public_id: urlImg.public_id },
            user.token
          );
          reset({ images: {} });
          setUrlImg({});
          setLoading(false);
        }
      } else {
        setLoading(true);
        await uploadApi.destroyImg({ public_id: urlImg.public_id }, user.token);
        reset({ images: {} });
        setUrlImg({});
        setLoading(false);
      }
    } catch (err) {}
  };
  return (
    <Box component={Paper}>
      <Container>
        <Typography
          className={classes.title}
          align="center"
          component="h4"
          variant="h4"
        >
          {id ? "EDIT PRODUCT" : "CREATE PRODUCT"}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <ImageProduct url={urlImg} handleDeleteImg={handleDeleteImg} />
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Box className={classes.form}>
              {isSubmitting ? <LinearProgress /> : false}
              <form
                style={{ display: "flex", flexDirection: "column", flex: "1" }}
                onSubmit={handleSubmit((d) => handleSubmitForm(d))}
              >
                <InputField
                  control={control}
                  errors={errors}
                  name="title"
                  label="Title"
                />
                <InputField
                  control={control}
                  errors={errors}
                  name="price"
                  label="Price"
                />
                <TextareaField
                  control={control}
                  errors={errors}
                  name="description"
                />
                <SelectField
                  control={control}
                  errors={errors}
                  name="category"
                  label="Category"
                  data={category}
                />
                <FormControl variant="standard" error={!!errors["img"]}>
                  <label htmlFor="images">
                    <input
                      style={{ display: "none" }}
                      id="images"
                      name="images"
                      type="file"
                      {...register("images", {
                        onChange: (e) => onChangeImg(e),
                      })}
                    />
                    <Fab
                      color="secondary"
                      size="small"
                      component="span"
                      aria-label="add"
                      variant="extended"
                    >
                      <AddCircleOutlineOutlinedIcon /> Upload photo
                    </Fab>
                  </label>
                  <FormHelperText>{errors["images"]?.message}</FormHelperText>
                </FormControl>
                <Button className={classes.submit} type="submit">
                  SubMit
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CreateProductFrom;
