import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Pencil } from 'lucide-react';

interface CardProps {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  category: string;
  hideDefaultButton?: boolean;
  optionalButton?: React.ReactNode;
}

const ProductCard: React.FC<CardProps> = ({
  id,
  img,
  name,
  description,
  price,
  category,
  hideDefaultButton = false,
  optionalButton,
}) => {
  const location = useLocation();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart({
      _id: id,
      name,
      price,
      image: img,
      quantity: 1,
    });
  };

  return (
    <div className="relative flex flex-col bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow max-h-96">
      {location.pathname === '/user-products' && (
        <div className="absolute top-3 right-3 z-10">
          <Link to={`/product/${id}/edit`}>
            <Pencil className="h-8 w-8 bg-blue-600 text-white p-1.5 rounded-md hover:bg-blue-700 transition-colors" />
          </Link>
        </div>
      )}

      <Link to={`/product/${id}`} className="block h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
          src={img}
          alt={name}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${id}`} className="mb-2">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-2">
            {name}
          </h5>
        </Link>

        <div className="flex items-center mb-2">
          <span className="mb-2 px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
            {category}
          </span>
        </div>

        <p className="mb-3 text-gray-700 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-green-600">
            ${price.toFixed(2)}
          </span>

          <div className="flex gap-2">
            {optionalButton}

            {!hideDefaultButton && (
              <button
                onClick={handleAddToCart}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to Cart
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
