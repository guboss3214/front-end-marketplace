import { Link } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
  logout: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, logout }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-20 flex justify-center items-center pt-20 sm:pt-0"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 sm:p-6 w-[90vw] max-w-xs sm:max-w-sm rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
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

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
