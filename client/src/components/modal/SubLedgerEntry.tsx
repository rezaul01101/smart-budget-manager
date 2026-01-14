import { Check, X } from "lucide-react";
import type { LedgerFormData } from "../../interfaces/interface";
import { useState } from "react";

interface SubLedgerModalProps {
  isOpen: boolean;
  setFormData: React.Dispatch<React.SetStateAction<LedgerFormData>>;
  onClose: () => void;
}

const SubLedgerModal = ({
  setFormData,
  isOpen,
  onClose,
}: SubLedgerModalProps) => {
  const [subLedgerName, setSubLedgerName] = useState("");
  if (!isOpen) return null;

  const handleAddSubLedger = () => {
    if (!subLedgerName.trim()) return;

    setFormData((prev) => ({
      ...prev,
      subLedger: [...(prev.subLedger ?? []), subLedgerName.trim()],
    }));
    setSubLedgerName("");
    onClose();
  };

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
                  Sub Ledger
                </h2>
                <p className="text-sm text-gray-400">Add Sub Ledger</p>
              </div>
            </div>
            <button
              onClick={handleAddSubLedger}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <Check className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Sub Ledger Name
            </label>
            <input
              type="text"
              required
              value={subLedgerName}
              onChange={(e) => setSubLedgerName(e.target.value)}
              className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Groceries"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubLedgerModal;
