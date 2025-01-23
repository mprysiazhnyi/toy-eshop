import React from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../contexts/AuthContext';
import { fetchRegister } from '../../api';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import * as yup from 'yup';

const validations = yup.object().shape({
  email: yup.string().email('Geçerli bir email girin').required('zorunlu alan'),
  password: yup
    .string()
    .min(10, 'Parolanız en az 10 karakter olmalıdır.')
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Parolanız uyuşmuyor')
    .required(),
});

function Signup() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      general: '',
    },
    validationSchema: validations,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse);
      } catch (e: any) {
        bag.setErrors({ general: e.response.data.message });
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
          <Typography variant="h4" align="center" gutterBottom>
            Signup
          </Typography>
          <Box my={2}>
            {formik.errors.general && (
              <Alert severity="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={2}>
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
              <TextField
                fullWidth
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                }
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ marginTop: 3 }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Signup;
