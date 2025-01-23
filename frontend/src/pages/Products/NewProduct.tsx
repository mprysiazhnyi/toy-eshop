import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, TextField, Grid2, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik, FieldArray } from 'formik';
import { message } from 'antd';
import { postProduct } from '../../api';
import * as yup from 'yup';

const editScheme = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().min(5).required(),
  price: yup.string().required(),
});

interface FormValues {
  title: string;
  description: string;
  price: string;
  photos: string[];
}

function NewProduct() {
  const queryClient = useQueryClient();
  const newProductMutation = useMutation(postProduct, {
    onSuccess: () => queryClient.invalidateQueries('admin:products'),
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
        <Typography variant="h4">Add New Product</Typography>
        <Formik
          initialValues={{
            title: '',
            description: '',
            price: '',
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
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={2}>
                <Grid2 size={8}>
                  <TextField
                    label="Title"
                    name="title"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                    disabled={isSubmitting}
                  />
                </Grid2>
                <Grid2 size={8}>
                  <TextField
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    disabled={isSubmitting}
                  />
                </Grid2>
                <Grid2 size={8}>
                  <TextField
                    label="Price"
                    name="price"
                    fullWidth
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    disabled={isSubmitting}
                  />
                </Grid2>
                <Grid2 size={8}>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos.map((photo, index) => (
                          <Grid2 container key={index} spacing={2}>
                            <Grid2 size={8}>
                              <TextField
                                name={`photos.${index}`}
                                value={photo}
                                onChange={handleChange}
                                fullWidth
                                disabled={isSubmitting}
                              />
                            </Grid2>
                            <Grid2 size={4}>
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => arrayHelpers.remove(index)}
                                disabled={isSubmitting}
                              >
                                Remove
                              </Button>
                            </Grid2>
                          </Grid2>
                        ))}
                        <Button
                          variant="outlined"
                          onClick={() => arrayHelpers.push('')}
                          disabled={isSubmitting}
                        >
                          Add a Photo
                        </Button>
                      </div>
                    )}
                  />
                </Grid2>
                <Grid2 size={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Add Product
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default NewProduct;
