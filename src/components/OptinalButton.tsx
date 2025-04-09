const OptinalButton = ({
  handleDeleteProduct,
  productId,
}: {
  handleDeleteProduct: (productId: string) => void;
  productId: string;
}) => {
  return (
    <button
      onClick={() => handleDeleteProduct(productId)}
      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300"
    >
      Delete
    </button>
  );
};

export default OptinalButton;
