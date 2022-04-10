import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/form-controls/QuantityFiled';


function AddToCartForm({ onSubmit = null }) {
  const schema = yup
    .object()
    .shape({
      quantity: yup
        .number()
        .min(1, 'Minimum value is 1').typeError('Amount must be a number')
        .required('Please enter quantity')
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors,isSubmitting },
    } = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmitAdd = (values) => {
    if (onSubmit) onSubmit(values);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(a => handleSubmitAdd(a))}>
        <QuantityField errors={errors} control={control} name="quantity"  label="Quantity" />
        <Button
          size="large"
          disabled={isSubmitting}
          type="submid"
          style={{width: '200px'}}
          variant="contained"
          color="primary"
        >
          ADD TO CART
        </Button>
      </form>
    </div>
  );
} 

export default AddToCartForm;
