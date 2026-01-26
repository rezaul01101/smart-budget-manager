import { X } from "lucide-react";

interface GlobalDeleteModalProps {
  handleGlobalDelete: () => void;
  onClose: () => void;
}

const GlobalDeleteModal = ({ handleGlobalDelete, onClose }: GlobalDeleteModalProps) => {

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <div className="bg-[#0f1419] w-full md:max-w-2xl md:rounded-lg rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0f1419] border-b border-gray-800 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Delete
                </h2>
                <p className="text-sm text-gray-400">Delete</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-3 flex flex-col items-center justify-center my-6">
          <h3 className="text-orange-500 text-xl md:text-2xl font-bold">Are you sure you want to delete this?</h3>
          <p className="text-white text-md md:text-base">This action cannot be undone.</p>
          <div className="flex items-center gap-4 mt-5">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 text-white bg-gray-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleGlobalDelete}
              className="p-2 rounded-lg hover:bg-gray-800 text-white bg-red-500 hover:text-white transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalDeleteModal;
