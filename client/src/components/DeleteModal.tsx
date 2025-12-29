import { AlertCircle } from "lucide-react";

function DeleteModal({ onClose, handleDelete }: { onClose: () => void, handleDelete: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#1a2332] rounded-xl w-full max-w-md p-6 shadow-xl">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 mx-auto mb-4">
          <AlertCircle className="text-orange-500 w-6 h-6" />
        </div>

        {/* Title */}
        <h2 className="text-white text-lg font-semibold text-center">
          Delete Transaction?
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm text-center mt-2">
          This action cannot be undone. Are you sure you want to delete this item?
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer flex-1 rounded-lg border border-gray-600 text-gray-300 py-2 hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="cursor-pointer flex-1 rounded-lg bg-orange-500 text-white py-2 hover:bg-orange-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;
