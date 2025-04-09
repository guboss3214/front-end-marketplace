import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../../data/categories';
import axiosInstance from '../lib/axios';

type Category = {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
};

type CategoryCount = {
  _id: string;
  count: number;
};

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState<CategoryCount[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/count');
        const data = response.data;
        setCategoryCount(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    setCategories(
      categoriesData.categories.map((category) => ({
        id: category.id,
        name: category.name,
        image: category.image,
        description: category.description,
        link: category.link,
      }))
    );
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Categories</h1>

      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/category/${category.link}`}
            key={category.id}
            className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:bg-blue-100 transition"
          >
            <div className="text-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold text-gray-700">
                {category.name}
              </h2>
              <p className="text-gray-500">{category.description}</p>
              {categoryCount.map(
                (cat) =>
                  cat._id === `${category.name}` && (
                    <p className="text-gray-500">Products: {cat.count}</p>
                  )
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
