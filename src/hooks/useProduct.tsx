import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

function useProduct() {
  const deleteProduct = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.data;
      if (response.status === 200) {
        toast.success(data.message);
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteProduct };
}

export default useProduct;
