import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, Product, updateProduct } from '../../api';
import { useQuery } from 'react-query';

import { Box, TextField, Button, Typography } from '@mui/material';

import { message } from 'antd';
import { Formik, FieldArray } from 'formik';

import * as yup from 'yup';
import { AxiosError } from 'axios';
import { Nav } from './Nav';
import { EditFields } from './EditFields';
import { Loading } from '../../components/Loading';

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
});

const EditProduct = () => {
  const { product_id = '' } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ['admin:product', product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>Error {(error as AxiosError).message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  const handleSubmit = async (values: Partial<Product>) => {
    console.log('submitted');
    message.loading({ content: 'Loading... ', key: 'product_update' });

    try {
      await updateProduct(values, product_id);

      message.success({
        content: 'The product successfully updated',
        key: 'product_update',
        duration: 2,
      });
    } catch (e) {
      message.error('The product does not update.');
    }
  };

  return (
    <div>
      <Nav />
      <Box>
        <Typography variant="h5">Edit</Typography>
        <Formik
          initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            photos: data.photos,
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

              {/* Submit Button */}
              <Button
                color="success"
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
                style={{ marginTop: '20px' }}
              >
                Update
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default EditProduct;
