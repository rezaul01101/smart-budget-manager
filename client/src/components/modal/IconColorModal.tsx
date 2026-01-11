import {
  Briefcase,
  BriefcaseMedical,
  Bus,
  Check,
  Clapperboard,
  Droplet,
  Handshake,
  Heart,
  House,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  X,
} from "lucide-react";
import type { AccountFormData, LedgerFormData } from "../../interfaces/interface";

interface IconColorModalProps<T extends LedgerFormData | AccountFormData> {
  isOpen: boolean;
  type: string;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onClose: () => void;
}

const IconColorModal = <T extends LedgerFormData | AccountFormData>({
  formData,
  setFormData,
  isOpen,
  type,
  onClose,
}: IconColorModalProps<T>) => {
  if (!isOpen) return null;

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
  { name: "House", icon: House },
  { name: "Clapperboard", icon: Clapperboard },
  { name: "Handshake", icon: Handshake },
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
                  {type === "icon" ? "Icon" : "Color"}
                </h2>
                <p className="text-sm text-gray-400">
                  Select {type === "icon" ? "Icon" : "Color"}
                </p>
              </div>
            </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
              >
                <Check className="w-6 h-6" />
              </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-5 md:grid-cols-7 gap-3  md:max-h-full overflow-y-auto">
            {type === "icon"
              ? availableIcons.map((iconOption) => {
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
                })
              : availableColors.map((colorOption) => (
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
      </div>
    </div>
  );
};

export default IconColorModal;
