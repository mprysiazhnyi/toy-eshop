import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, FieldArray } from 'formik';
import { message } from 'antd';
import { postProduct } from '../../api';
import * as yup from 'yup';
import { Nav } from './Nav';
import { EditFields, FormValues } from './EditFields';

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
});

const NewProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin:products');
      queryClient.invalidateQueries('products');
      navigate('/admin/products');
    },
  });

  const handleSubmit = async (values: FormValues, bag: any) => {
    console.log(values);
    message.loading({ content: 'Loading...', key: 'product_update' });

    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };

    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        message.success({
          content: 'Product added successfully',
          key: 'product_update',
          duration: 2,
        });
      },
    });
  };

  return (
    <div>
      <Nav />
      <Box>
        <Typography variant="h5" mb={2}>
          Add New Product
        </Typography>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '' as any,
            photos: [],
          }}
          validationSchema={editScheme}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <Box component="form" onSubmit={handleSubmit}>
              <EditFields
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                values={values}
                isSubmitting={isSubmitting}
                handleBlur={handleBlur}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '20px' }}
              >
                Add Product
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default NewProduct;
