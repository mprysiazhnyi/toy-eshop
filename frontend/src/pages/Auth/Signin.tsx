import React from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import { fetchLogin } from '../../api';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validations = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('This field is required'),
  password: yup
    .string()
    .min(10, 'Your password must be at least 10 characters long.')
    .required(),
});
function Signin() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      general: '',
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        navigate('/profile');
      } catch (e: any) {
        console.log(e);
        bag.setErrors({
          general: e.response.data.message,
        });
      }
    },
  });

  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingTop={10}
      >
        <Box width="400px">
          <Typography variant="h5" align="center" gutterBottom>
            Signin
          </Typography>
          <Box>
            {formik.errors.general && (
              <Alert severity="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  marginTop: 3,
                }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Signin;
