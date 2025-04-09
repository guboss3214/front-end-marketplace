import {
  Search,
  User,
  PlusCircle,
  ChartColumnStacked,
  ShoppingCart,
  Store,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import FoundProductsModal from './FoundProductsModal';
import CartModal from './CartModal';
import { useCart } from '../context/CartContext';
import axiosInstance from '../lib/axios';
import { useAuth } from '../hooks/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
}

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const { isLoggedIn } = useAuth();
  const { cart } = useCart();
  const [cartModal, setCartModal] = useState(false);
  const [foundProducts, setFoundProducts] = useState([]);

  const searchProducts = async (search: string) => {
    if (search.trim() === '') {
      setFoundProducts([]);
      setIsModalOpen2(false);
      return;
    }
    try {
      const response = await axiosInstance.get('/products', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.data;
      if (response.status === 200) {
        const filteredProducts = data.filter((product: Product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        console.log(filteredProducts);
        setFoundProducts(filteredProducts);
        setIsModalOpen2(filteredProducts.length > 0);
      } else {
        console.error('Failed to fetch products:', data.message);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const navigate = useNavigate();

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleCartModal = () => setCartModal((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsModalOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-4 gap-4 shadow-lg bg-white">
      <Link
        to={isLoggedIn ? '/marketplace' : '/'}
        className="flex items-center gap-2 text-2xl font-bold text-blue-600"
      >
        <Store className="text-blue-600" />
        MarketPlace
      </Link>

      {isLoggedIn ? (
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search product..."
            onChange={(e) => {
              searchProducts(e.target.value.trim());
            }}
            className="relative w-full p-2 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isModalOpen2 && (
            <FoundProductsModal
              products={foundProducts}
              onClose={() => setIsModalOpen2(false)}
            />
          )}
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 shadow-lg text-blue-600 rounded-full hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="flex items-center gap-6">
          <div className="relative">
            <ShoppingCart
              className="text-blue-600 hover:text-blue-700 hover:cursor-pointer"
              onClick={toggleCartModal}
              size={24}
            />
            <span className="absolute bottom-4 left-5 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
              {cart.length}
            </span>
            {cartModal && (
              <CartModal isOpen={cartModal} onClose={toggleCartModal} />
            )}
          </div>
          <Link
            to="/category"
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <ChartColumnStacked /> Categories
          </Link>
          <Link
            to="/add-product"
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
          >
            <PlusCircle size={20} /> Add Product
          </Link>

          <User
            onClick={toggleModal}
            className="text-gray-600 hover:text-blue-600 hover:cursor-pointer"
            size={28}
          />
          {isModalOpen && <Modal onClose={toggleModal} logout={handleLogout} />}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
