import { Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import MarketPlace from './pages/MarketPlace';
import Category from './pages/Category';
import AddProduct from './pages/AddProduct';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import UserProduct from './pages/UserProduct';
import ProductPage from './pages/ProductPage';
import { CartProvider } from './context/CartContext';
import CategoryProduct from './pages/CategoryProduct';
import Settings from './pages/Settings';
import EditProduct from './pages/EditProduct';
import Footer from './components/Footer';
import { AuthProvider } from './hooks/AuthContext';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={isLoggedIn ? <MarketPlace /> : <Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user-products" element={<UserProduct />} />
          <Route path="/product/:id/edit" element={<EditProduct />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
