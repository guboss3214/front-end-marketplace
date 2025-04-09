import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';

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

const CategoryProduct = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get(`/category/${category}`);
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [category]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...products];
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    setFilteredProducts(filtered);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full flex">
      <Filters onFilterChange={handleFilterChange} categoryOptions={category} />
      <div className="w-full">
        <div className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold">
            {category} - Products Found: {filteredProducts.length}
          </h1>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
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
          <div className="text-center text-2xl mt-10">No products found</div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
