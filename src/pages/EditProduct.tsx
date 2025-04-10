import { useNavigate, useParams } from 'react-router-dom';
import categories from '../../data/categories';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  user: string;
}

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState('Electronics');
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | string>('');

  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const productData: Partial<Product> = {};

      if (name !== productInfo?.name) productData.name = name;
      if (description !== productInfo?.description)
        productData.description = description;
      if (price !== productInfo?.price.toString())
        productData.price = parseFloat(price);
      if (category !== productInfo?.category) productData.category = category;
      if (image !== productInfo?.image) {
        if (image instanceof File) {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', 'ml_default');

          const response = await axios.post(
            import.meta.env.VITE_CLOUDINARY_URL,
            formData
          );

          productData.image = response.data.secure_url;
        } else {
          productData.image = image;
        }
      }

      await axiosInstance.patch(`/products/${id}`, productData);
      toast.success('Product updated successfully!');
      navigate('/marketplace');
    } catch (error) {
      toast.error('Error updating product!');
      console.error('Error updating product:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get('/products');
        const products: Product[] = response.data;
        const product = products.find((p) => p._id === id);
        if (product) {
          setProductInfo(product);
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price.toString());
          setCategory(product.category);
          setImage(product.image);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div className="p-2 sm:p-4">
      <div className="max-w-xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-xl md:rounded-2xl">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
          Edit Product
        </h2>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex justify-center items-center mt-2 md:mt-4">
              <img
                src={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                alt={productInfo?.name}
                className={
                  productInfo?.image
                    ? 'w-48 h-48 md:w-80 md:h-80 object-cover rounded-lg'
                    : 'hidden'
                }
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 w-full border rounded-lg p-1.5 md:p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="mt-2 w-full border rounded-lg p-1.5 md:p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              className="mt-2 w-full border rounded-lg p-1.5 md:p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="mt-2 w-full border rounded-lg p-1.5 md:p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-2 w-full border rounded-lg p-1.5 md:p-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {categories.categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1.5 md:py-2 px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
