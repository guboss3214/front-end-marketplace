import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import useProduct from '../hooks/useProduct';
import axiosInstance from '../lib/axios';
import OptinalButton from '../components/OptinalButton';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  category: string;
}

const UserProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { deleteProduct } = useProduct();

  const fetchProducts = useCallback(async () => {
    if (!userId) return;

    const token = localStorage.getItem('token');
    try {
      const response = await axiosInstance.get(`/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const productsData = await response.data;
        setProducts(productsData);
      } else {
        console.log(response.statusText);
        setError(response.statusText);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
    }
  }, [userId]);

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }

      try {
        const response = await axiosInstance.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.data;
        if (response.status === 200) {
          setUserId(data.user._id);
        } else {
          setError(data.message || 'Error fetching user profile');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user profile');
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center min-h-screen">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id}
            id={`${product._id}`}
            name={product.name}
            img={product.image}
            description={product.description}
            price={product.price}
            category={product.category}
            hideDefaultButton={true}
            optionalButton={
              <OptinalButton
                handleDeleteProduct={handleDeleteProduct}
                productId={product._id}
              />
            }
          />
        ))
      ) : (
        <p>You don't have any products</p>
      )}
    </div>
  );
};

export default UserProduct;
