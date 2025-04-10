import { useEffect, useState } from 'react';
import categories from '../../data/categories';
import useMaxPrice from '../hooks/useMaxPrice';

interface FiltersProps {
  onFilterChange: (filters: {
    category: string;
    priceRange: [number, number];
  }) => void;
  categoryOptions?: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  categoryOptions,
}) => {
  const [category, setCategory] = useState(categoryOptions || 'All Category');
  const maxPrice = useMaxPrice();
  const [price, setPrice] = useState<[number, number]>([0, maxPrice]);

  const handleSubmit = () => {
    onFilterChange({
      category,
      priceRange: price,
    });
  };

  useEffect(() => {
    setPrice([0, maxPrice]);
  }, [maxPrice]);

  return (
    <div className="shadow-xl border p-4 border-gray-200 rounded-lg lg:w-72 xl:w-80 sm:p-4 lg:pr-2">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="w-full border p-2 rounded"
        >
          <option value={categoryOptions}>{categoryOptions}</option>
          {categories.categories.map((cat) => (
            <option key={cat.id} value={cat.value.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Price Range</label>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500">Min Price</label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="1000"
              value={price[0]}
              onChange={(e) => setPrice([+e.target.value, price[1]])}
              className="w-full"
            />
            <input
              type="number"
              value={price[0]}
              onChange={(e) =>
                setPrice([Math.min(+e.target.value, price[1]), price[1]])
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">Max Price</label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="1000"
              value={price[1]}
              onChange={(e) => setPrice([price[0], +e.target.value])}
              className="w-full"
            />
            <input
              type="number"
              value={price[1]}
              onChange={(e) =>
                setPrice([price[0], Math.max(+e.target.value, price[0])])
              }
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        <div className="text-sm mt-2">
          Selected Range: ${price[0].toLocaleString()} - $
          {price[1].toLocaleString()}
        </div>

        <div className="w-full flex justify-between mt-4">
          <button
            onClick={() => {
              setPrice([0, maxPrice]);
              setCategory('all');
              onFilterChange({
                category: 'All Categories',
                priceRange: [0, maxPrice],
              });
            }}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Reset
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
