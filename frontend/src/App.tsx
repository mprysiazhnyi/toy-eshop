import './App.css';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Basket from './pages/Basket/Basket';
import Error404 from './pages/Errors/Error404';
import ProtectedProfile from './pages/Protected/ProtectedProfile';
import ProtectedAdmin from './pages/Protected/ProtectedAdmin';
import Orders from './pages/Admin/Orders';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductDetail from './pages/Admin/AdminProductDetail';
import NewProduct from './pages/Products/NewProduct';

const App: FC = () => {
  return (
    <>
      <Navbar />
      <div id="content">
        <Routes>
          <Route path="/" index element={<Products />} />
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
              <Route path=":product_id" element={<AdminProductDetail />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
