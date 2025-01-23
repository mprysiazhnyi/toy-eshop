import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct, Product, updateProduct } from '../../api';
import { useQuery } from 'react-query';

import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { Formik, FieldArray } from 'formik';

import { message } from 'antd';
import * as yup from 'yup';
import { AxiosError } from 'axios';

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
});

function AdminProductDetail() {
  const { product_id = '' } = useParams();

  const { isLoading, isError, data, error } = useQuery(
    ['admin:product', product_id],
    () => fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading</div>;
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
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="/admin">Home</Link>
          </li>
          <li>
            <Link to="/admin/orders">Order</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Box mt={10}>
        <Typography variant="h4">Edit</Typography>
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
              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  disabled={isSubmitting}
                  error={Boolean(touched.title && errors.title)}
                />
                {touched.title && errors.title && (
                  <FormHelperText error>{errors.title}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="description">Description</InputLabel>
                <Input
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  disabled={isSubmitting}
                  error={Boolean(touched.description && errors.description)}
                  multiline
                  rows={4}
                />
                {touched.description && errors.description && (
                  <FormHelperText error>{errors.description}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel htmlFor="price">Price</InputLabel>
                <Input
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  disabled={isSubmitting}
                  error={Boolean(touched.price && errors.price)}
                />
                {touched.price && errors.price && (
                  <FormHelperText error>{errors.price}</FormHelperText>
                )}
              </FormControl>

              <FieldArray
                name="photos"
                render={(arrayHelpers) => (
                  <div>
                    {values.photos &&
                      values.photos.map((photo, index) => (
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          mb={2}
                        >
                          <TextField
                            name={`photos.${index}`}
                            value={photo}
                            disabled={isSubmitting}
                            onChange={handleChange}
                            fullWidth
                          />
                          <Button
                            color="secondary"
                            variant="outlined"
                            onClick={() => arrayHelpers.remove(index)}
                            style={{ marginLeft: '10px' }}
                          >
                            Remove
                          </Button>
                        </Box>
                      ))}
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => arrayHelpers.push('')}
                      style={{ marginTop: '10px' }}
                    >
                      Add a Photo
                    </Button>
                  </div>
                )}
              />

              <Button
                color="primary"
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
}

export default AdminProductDetail;
