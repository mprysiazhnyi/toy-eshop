import { Box, Button, TextField } from '@mui/material';
import { FieldArray } from 'formik';
import React from 'react';
import { FormikProps } from 'formik/dist/types';

export interface FormValues {
  title: string;
  description: string;
  price: number;
  photos: string[];
}

export const EditFields = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
  isSubmitting,
}: Pick<
  FormikProps<FormValues>,
  | 'errors'
  | 'touched'
  | 'handleChange'
  | 'handleBlur'
  | 'values'
  | 'isSubmitting'
>) => {
  return (
    <>
      <TextField
        label="Title"
        name="title"
        margin="normal"
        fullWidth
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
        disabled={isSubmitting}
      />

      <TextField
        label="Description"
        name="description"
        margin="normal"
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

      <TextField
        label="Price"
        name="price"
        margin="normal"
        fullWidth
        value={values.price}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.price && Boolean(errors.price)}
        helperText={touched.price && errors.price}
        disabled={isSubmitting}
      />

      <FieldArray
        name="photos"
        render={(arrayHelpers) => (
          <div>
            {values.photos.map((photo, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  name={`photos.${index}`}
                  value={photo}
                  onChange={handleChange}
                  fullWidth
                  disabled={isSubmitting}
                />

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => arrayHelpers.remove(index)}
                  disabled={isSubmitting}
                  style={{ marginLeft: '10px' }}
                >
                  Remove
                </Button>
              </Box>
            ))}
            <Button
              color="secondary"
              variant="contained"
              onClick={() => arrayHelpers.push('')}
              style={{ marginTop: '10px' }}
            >
              Add a Photo
            </Button>
          </div>
        )}
      />
    </>
  );
};
