import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageModal from '../components/ImageModal';
import { useCart } from '../context/CartContext';
import axiosInstance from '../lib/axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  user: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [displayProduct, setDisplayProduct] = useState<Product | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get('/products');
        const products: Product[] = response.data;
        const product = products.find((p) => p._id === id);
        if (product) {
          setDisplayProduct(product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!displayProduct?.user) return;

      try {
        const response = await axiosInstance.get(
          `/user/userinfo/${displayProduct.user}`
        );
        if (response.status === 200) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUserData(null);
      }
    };

    if (displayProduct) {
      fetchUser();
    }
  }, [displayProduct]);

  const openFullscreen = (imgUrl: string) => {
    setSelectedImage(imgUrl);
    setIsModalOpen(true);
  };

  const closeFullscreen = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!displayProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Image Section */}
          <div className="lg:w-1/2">
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden h-full flex items-center justify-center p-6 cursor-pointer"
              onClick={() => openFullscreen(displayProduct.image)}
            >
              <img
                src={displayProduct.image}
                alt={displayProduct.name}
                className="max-h-[500px] w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-8 h-full flex flex-col">
              <div className="flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {displayProduct.name}
                </h1>

                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-green-600">
                    ${displayProduct.price.toFixed(2)}
                  </span>
                  {displayProduct.category && (
                    <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {displayProduct.category}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  {displayProduct.description}
                </p>

                {/* Seller Information */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Seller Information
                  </h3>
                  {userData ? (
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Name:</span>{' '}
                        {userData.username || 'N/A'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Contact:</span>{' '}
                        {userData.email || 'N/A'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Seller information not available
                    </p>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8">
                <button
                  onClick={() =>
                    addToCart({
                      _id: displayProduct._id,
                      name: displayProduct.name,
                      price: displayProduct.price,
                      image: displayProduct.image,
                      quantity: 1,
                    })
                  }
                  className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage}
        onClose={closeFullscreen}
      />
    </div>
  );
};

export default ProductPage;
