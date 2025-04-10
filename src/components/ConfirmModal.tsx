interface ConfirmModalProps {
  confirmDelete: () => void;
  setShowConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  confirmDelete,
  setShowConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          Confirm Deletion
        </h3>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={confirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={setShowConfirm}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
