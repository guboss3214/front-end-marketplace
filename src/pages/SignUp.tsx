import { User, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundVideo from '../../public/video/background.mp4';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error('All fields are required');
      setError('All fields are required');
      return;
    }
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/u.test(email);
    if (!isEmailValid) {
      toast.error('Invalid email address');
      return;
    }

    setIsLoading(true);

    const userData = { username, email, password };

    try {
      const response = await axiosInstance.post('/register', userData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Registration successful');
        navigate('/marketplace');
      } else {
        throw new Error('No token received from server');
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          'An error occurred during registration';
        toast.error(errorMessage);
        setError(errorMessage);
      } else {
        toast.error('An unexpected error occurred');
        setError('An unexpected error occurred');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative z-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign Up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login.
              </Link>
            </p>
          </div>
        </form>
      </div>

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default SignUp;
