import { Link } from 'react-router-dom';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

interface ModalProps {
  products: Product[];
  onClose: () => void;
}
const FoundProductsModal: React.FC<ModalProps> = ({ products, onClose }) => {
  return (
    <div className="absolute z-10 inset-0 top-12">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Found Products</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li
                key={product._id}
                className="border-b py-4 px-2 flex gap-4 hover:bg-gray-100"
              >
                <Link to={`/product/${product._id}`} onClick={onClose}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${product._id}`} onClick={onClose}>
                    <h3 className="text-lg font-medium">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="mt-2 font-semibold text-gray-700">
                    ${product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default FoundProductsModal;
