import './App.css';
import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Basket from './pages/Basket/Basket';
import Error404 from './pages/Errors/Error404';
import ProtectedProfile from './pages/Protected/ProtectedProfile';
import ProtectedAdmin from './pages/Protected/ProtectedAdmin';
import Orders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/AdminProducts';
import EditProduct from './pages/Admin/EditProduct';
import NewProduct from './pages/Admin/NewProduct';
import { Box, Typography } from '@mui/material';
import { Footer } from './components/Footer';
import ScrollToTop from './ScrollToTop';

const App: FC = () => {
  return (
    <>
      {' '}
      <Box
        bgcolor={'#F0DACD'}
        display={'flex'}
        justifyContent={'space-between'}
        px={4}
        py={2}
      >
        <Typography color={'primary'}>Do you need help?</Typography>
        <Typography color={'primary'}>
          Get 10% off now: Subscribe to the newsletter
        </Typography>

        <Typography color={'primary'}>Delivery information</Typography>
      </Box>
      <Navbar />
      <div id="content">
        <ScrollToTop /> {/* This will ensure scroll resets */}
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<ProtectedProfile />} />
          <Route path="/admin">
            <Route index element={<ProtectedAdmin />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path=":product_id" element={<EditProduct />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
