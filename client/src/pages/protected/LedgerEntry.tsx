import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  BriefcaseMedical,
  House,
  Clapperboard,
  Handshake,
} from "lucide-react";
import {
  useCreateLedgerMutation,
  useSingleLedgerQuery,
  useUpdateLedgerMutation,
} from "../../redux/api/ledgerApi";
import type { LedgerFormData } from "../../interfaces/interface";

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
  { name: "BriefcaseMedical", icon: BriefcaseMedical },
  { name: "House", icon: House},
  { name: "Clapperboard", icon: Clapperboard},
  { name: "Handshake", icon: Handshake},
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

const LedgerEntry = () => {
  const hasInitialized = useRef(false);

  const navigate = useNavigate();
  const { ledgerId } = useParams();
  const isEditMode = Boolean(ledgerId);

  //Api call
  const [createLedger, { isLoading: isCreating, error }] =
    useCreateLedgerMutation();

  const [updateLedger, { isLoading: isUpdating }] = useUpdateLedgerMutation();

  const [formData, setFormData] = useState<LedgerFormData>({
    name: "",
    type: "EXPENSE",
    icon: "Wallet",
    color: "yellow",
  });

  const { data: ledger } = useSingleLedgerQuery(ledgerId!, {
    skip: !isEditMode,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let res;
      if (isEditMode) {
        res = await updateLedger({
          id: Number(ledgerId),
          ...formData,
        }).unwrap();
      } else {
        res = await createLedger(formData).unwrap();
      }
      if (res) {
        navigate(isEditMode ? -2 : -1);
      }
    } catch (err) {
      console.error("Ledger Create failed:", error, err);
    }

    setFormData({
      name: "",
      type: "EXPENSE",
      icon: "Wallet",
      color: "yellow",
    });
  };

  useEffect(() => {
    // Only run if we have data, we are in edit mode, and we haven't filled the form yet
    if (isEditMode && ledger && !hasInitialized.current) {
      // Use a functional update or wrap in a microtask to move it out of the sync render flow
      const timer = setTimeout(() => {
        setFormData({
          name: ledger?.data?.name || "",
          type: ledger?.data?.type === "INCOME" ? "INCOME" : "EXPENSE",
          icon: ledger?.data?.icon || "Wallet",
          color: ledger?.data?.color || "yellow",
        });
        hasInitialized.current = true;
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [ledger, isEditMode]);

  return (
    <>
      <div className="bg-[#1a2332] rounded-lg p-2 pb-3 md:p-4 border border-gray-800">
        <div className="p-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(ledger?.data ? -2 : -1)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {isEditMode ? "Edit Ledger" : "Add New Ledger"}
                </h2>
                <p className="text-sm text-gray-400">
                  Set up a new ledger to track your money easily
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[80%]">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-xs font-normal text-gray-300 mb-2">
                  Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "EXPENSE" })
                    }
                    className={`p-2 rounded-lg border-1 transition-all cursor-pointer ${
                      formData.type === "EXPENSE"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-white">Expense</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "INCOME" })}
                    className={`p-2 rounded-lg border-1 transition-all cursor-pointer ${
                      formData.type === "INCOME"
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-white">Income</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-5 md:grid-cols-9 gap-3 max-h-[100px] md:max-h-full overflow-y-auto">
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
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 max-h-[100px] md:max-h-full overflow-y-auto">
                  {availableColors.map((colorOption) => (
                    <button
                      key={colorOption.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color: colorOption.value })
                      }
                      className={`cursor-pointer py-3 rounded-lg border-1 transition-all ${
                        formData.color === colorOption.value
                          ? "border-white"
                          : "border-transparent hover:border-gray-600"
                      } bg-${colorOption.value}-900/30`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-${colorOption.value}-500 mx-auto`}
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
                  onClick={() => navigate(isEditMode ? -2 : -1)}
                  className="cursor-pointer flex-1 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" cursor-pointer flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  {isEditMode
                    ? isUpdating
                      ? "Updating..."
                      : "Update"
                    : isCreating
                    ? "Creating..."
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LedgerEntry;
