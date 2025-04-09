import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import { Pencil, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  _id: number;
  username: string;
  email: string;
  createdAt: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUsername(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData: Partial<User> = {};
      if (editedUsername !== user?.username) userData.username = editedUsername;
      if (editedEmail !== user?.email) userData.email = editedEmail;

      if (editedEmail == user?.email && editedUsername == user?.username) {
        toast.error('No changes made to the profile.');
        return;
      }

      const response = await axiosInstance.patch(
        `/user/update/${user?._id}`,
        userData
      );

      if (response.status === 200) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Error updating profile. Please try again later.');
      }
    } catch (error) {
      toast.error('Error updating profile. Please try again later.');
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.data;
        if (response.status === 200) {
          setUser(data);
          setEditedUsername(data.username);
          setEditedEmail(data.email);
        } else {
          console.error('Error fetching profile:', data.message);
        }
      } catch (error) {
        console.error('Server error:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    user && (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-gradient-to-br from-blue-50 to-white w-full shadow-lg rounded-2xl p-8 mb-8 max-w-3xl mx-auto border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              User Profile
            </h1>
            <button className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200">
              <Pencil
                className="w-6 h-6 text-blue-500 hover:text-blue-700"
                onClick={handleIsEditing}
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-inner border-4 border-white">
              <UserCircle className="w-20 h-20 text-blue-400" />
            </div>

            <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-600 mb-1">
                  Username
                </h2>
                <input
                  value={editedUsername}
                  disabled={!isEditing}
                  onChange={handleChangeUsername}
                  type="text"
                  className={`
                    w-full text-xl font-medium
                    ${
                      isEditing
                        ? 'border-2 border-blue-300 text-blue-700 rounded-lg p-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all'
                        : 'text-black bg-transparent border-none p-0 focus:ring-0'
                    }
                    disabled:opacity-100 disabled:cursor-default
                  `}
                />
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-600 mb-1">
                  Email
                </h2>
                <input
                  value={editedEmail}
                  disabled={!isEditing}
                  onChange={handleChangeEmail}
                  type="email"
                  className={`
                    w-full text-xl font-medium
                    ${
                      isEditing
                        ? 'border-2 border-blue-300 rounded-lg p-2 bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all'
                        : 'text-blue-600 bg-transparent border-none p-0 focus:ring-0'
                    }
                    disabled:opacity-100 disabled:cursor-default
                  `}
                />
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-600 mb-1">
                  Member Since
                </h2>
                <p className="text-lg text-gray-700">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className={
                    isEditing
                      ? 'px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
                      : 'hidden'
                  }
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
