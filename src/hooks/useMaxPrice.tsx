import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';

const useMaxPrice = () => {
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const response = await axiosInstance.get('/products');
        const maxPrice = Math.max(
          ...response.data.map((product: { price: number }) => product.price)
        );
        setMaxPrice(maxPrice);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMaxPrice();
  }, []);

  return maxPrice;
};

export default useMaxPrice;
