import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} My Store. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
