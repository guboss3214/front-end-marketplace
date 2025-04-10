import { Link, Route, Routes } from 'react-router-dom';
import Account from './Account';
import Privacy from './Privacy';
import Notifications from './Notifications';
import { useEffect, useState } from 'react';
import axiosInstance from '../lib/axios';
import Terms from '../components/Terms';
import Contact from '../components/Contact';
import { Menu, X } from 'lucide-react';

interface User {
  _id: string;
}

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fetchUser = async () => {
    const response = await axiosInstance.get('/profile');
    setUser(response.data.user);
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="md:hidden bg-gray-800 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside
        className={`bg-gray-800 text-white p-4 space-y-4 w-full md:w-64 md:block ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <h2 className="text-xl font-bold hidden md:block">Settings</h2>
        <nav>
          <ul className="space-y-2" onClick={() => setMenuOpen(false)}>
            <li>
              <Link
                to={`/settings/account/${user?._id}`}
                className="block p-2 rounded hover:bg-gray-700"
              >
                Account
              </Link>
            </li>
            <li>
              <Link
                to="/settings/contact"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/settings/privacy"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to="/settings/notifications"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Notifications
              </Link>
            </li>
            <li>
              <Link
                to="/settings/terms"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-gray-500 text-center max-w-md">
                  This is the settings page. Here you can manage your account
                  information, privacy settings, and notifications.
                </p>
              </div>
            }
          />
          <Route path="account/:id" element={<Account />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
};

export default Settings;
