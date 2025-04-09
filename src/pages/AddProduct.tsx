import { useState } from 'react';
import categories from '../../data/categories';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import axiosInstance from '../lib/axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [image, setImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_URL,
        formData
      );
      if (response.status !== 200) {
        const errorData = await response.data;
        console.error('Error details:', errorData);
        throw new Error(errorData.error.message);
      }
      const data = await response.data;
      return data.secure_url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    try {
      const imageUrl = await uploadImageToCloudinary(image);

      const productData = {
        name,
        description,
        price: Number(price),
        category,
        image: imageUrl,
      };

      await axiosInstance.post('/products', productData);

      toast.success('Product added successfully!');
      navigate('/marketplace');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Failed to add product';
        toast.error(`Error: ${errorMessage}`);
        console.error('Submission error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Unexpected error:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Image
            </label>
            <div className="flex justify-center items-center mt-4">
              <img
                src={image ? URL.createObjectURL(image) : ''}
                alt="Product"
                className={
                  image ? 'w-80 h-80 object-cover rounded-lg' : 'hidden'
                }
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
