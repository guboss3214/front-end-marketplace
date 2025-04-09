import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundVideo from '../../public/video/background.mp4';
import toast from 'react-hot-toast';
import axiosInstance from '../lib/axios';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      if (response.status !== 200) {
        const errorData = await response.data;
        setError(`Login failed: ${errorData.message}`);
        toast.error(errorData.message);
        return;
      }

      const data = await response.data;

      localStorage.setItem('token', data.token);

      const redirectPath =
        localStorage.getItem('redirectPath') || '/marketplace';
      localStorage.removeItem('redirectPath');

      navigate(redirectPath);
      window.location.reload();
    } catch (error) {
      setError('Login failed');
      console.error('Login failed', error);
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
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Login to system
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="user@example.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
