import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="bg-gray-100 py-6 mt-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>

          <div className="mt-2">
            {isLoggedIn ? (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/settings/terms" className="hover:text-gray-900">
                  Terms
                </Link>
                <Link to="/settings/privacy" className="hover:text-gray-900">
                  Privacy
                </Link>
                <Link to="/settings/contact" className="hover:text-gray-900">
                  Contact
                </Link>
              </div>
            ) : (
              <p className="text-gray-600">
                Please log in to access more options.
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
