import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from '../components/ConfirmModal';
import axiosInstance from '../lib/axios';
import { useParams, useNavigate } from 'react-router-dom';

const Account = () => {
  const { id } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/user/delete/${id}`);
      toast.success('Account deleted successfully!');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Account Settings</h2>
      <p className="text-gray-600 mt-2">Manage your account details below.</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium text-red-600">Delete Account</h3>
        <p className="text-gray-600 mt-1">
          Deleting your account is irreversible. All your data will be lost.
        </p>
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition"
        >
          Delete My Account
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          confirmDelete={confirmDelete}
          setShowConfirm={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Account;
