import { Link } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
  logout: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, logout }) => {
  return (
    <div className="absolute right-2 top-20 z-10">
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-4">
          <li>
            <Link
              to="/profile"
              onClick={onClose}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition"
            >
              Profile
            </Link>
            <Link
              to="/user-products"
              onClick={onClose}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition"
            >
              My products
            </Link>
            <Link
              to="/settings"
              onClick={onClose}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition"
            >
              Settings
            </Link>
          </li>
        </ul>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
