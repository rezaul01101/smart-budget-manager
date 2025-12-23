import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UtensilsCrossed,
  Bus,
  Droplet,
  Sparkles,
  ShoppingBag,
  Heart,
  Briefcase,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useCreateLedgerMutation } from "../../redux/api/ledgerApi";

const availableIcons = [
  { name: "Wallet", icon: Wallet },
  { name: "UtensilsCrossed", icon: UtensilsCrossed },
  { name: "Bus", icon: Bus },
  { name: "Droplet", icon: Droplet },
  { name: "Sparkles", icon: Sparkles },
  { name: "ShoppingBag", icon: ShoppingBag },
  { name: "Heart", icon: Heart },
  { name: "Briefcase", icon: Briefcase },
  { name: "TrendingUp", icon: TrendingUp },
];

const availableColors = [
  { name: "Yellow", value: "yellow" },
  { name: "Blue", value: "blue" },
  { name: "Orange", value: "orange" },
  { name: "Purple", value: "purple" },
  { name: "Pink", value: "pink" },
  { name: "Emerald", value: "emerald" },
  { name: "Teal", value: "teal" },
  { name: "Cyan", value: "cyan" },
  { name: "Green", value: "green" },
];

const AddLedger = () => {
  const [createLedger, { isLoading, error }] = useCreateLedgerMutation();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE",
    icon: "Wallet",
    color: "blue",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createLedger(formData).unwrap();
      if (res){
        navigate(-1);
      }
    } catch (err) {
      console.error("Ledger Create failed:", error, err);
    }

    setFormData({
      name: "",
      type: "EXPENSE",
      icon: "Wallet",
      color: "blue",
    });
  };

  return (
    <div className="min-h-screen bg-[#0f1419] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Add Ledger
            </h1>
          </div>
        </div>

        <div className="bg-[#1a2332] rounded-lg p-6 md:p-8 border border-gray-800 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">
            Create New Ledger
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ledger Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Groceries"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "EXPENSE" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type === "EXPENSE"
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <p className="text-white font-semibold">Expense</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "INCOME" })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type === "INCOME"
                      ? "border-green-500 bg-green-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <p className="text-white font-semibold">Income</p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Icon
              </label>
              <div className="grid grid-cols-5 md:grid-cols-9 gap-3">
                {availableIcons.map((iconOption) => {
                  const IconComponent = iconOption.icon;
                  return (
                    <button
                      key={iconOption.name}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, icon: iconOption.name })
                      }
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        formData.icon === iconOption.name
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <IconComponent className="w-6 h-6 text-white mx-auto" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {availableColors.map((colorOption) => (
                  <button
                    key={colorOption.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, color: colorOption.value })
                    }
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                      formData.color === colorOption.value
                        ? "border-white"
                        : "border-transparent hover:border-gray-600"
                    } bg-${colorOption.value}-900/30`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full bg-${colorOption.value}-500 mx-auto`}
                    />
                    <p className="text-white text-xs mt-2 text-center">
                      {colorOption.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cursor-pointer flex-1 px-6 py-3 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" cursor-pointer flex-1 px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                {isLoading ? "Creating" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLedger;
