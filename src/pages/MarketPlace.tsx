import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import axiosInstance from '../lib/axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface FilterOptions {
  category: string;
  priceRange: [number, number];
}

const MarketPlace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/products');

      if (response.status === 200) {
        const data = await response.data;
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];

    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="w-full flex flex-col lg:flex-row">
      <Filters
        onFilterChange={handleFilterChange}
        categoryOptions="All Categories"
      />

      <div className="w-full lg:flex-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl text-gray-600 font-bold p-2 sm:p-4">
          Marketplace
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="p-2 sm:p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                img={product.image}
                description={product.description}
                price={product.price}
                category={product.category}
                optionalButton={null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-lg sm:text-xl lg:text-2xl mt-8 sm:mt-12 lg:mt-16">
            No products found
          </div>
        )}
      </div>
    </main>
  );
};

export default MarketPlace;
