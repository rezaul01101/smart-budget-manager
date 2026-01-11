import { Check, X } from "lucide-react";
import { useAccountListQuery } from "../../redux/api/accountApi";
import * as LucideIcons from "lucide-react";
import { ledgerColorClasses } from "../../constants/constants";

interface AccountModalProps {
  isOpen: boolean;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}

const AccountModal = ({ setFormData, isOpen, onClose }: AccountModalProps) => {
  if (!isOpen) return null;

  const { data: accounts, isLoading } = useAccountListQuery({});

  const handleAddAccount = (item: any) => {
    if (!item?.id) return;

    setFormData((prev: any) => ({
      ...prev,
      accountId: item?.id,
      account: item,
    }));
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
                  Select Account
                </h2>
                <p className="text-sm text-gray-400">Select Account</p>
              </div>
            </div>
            <button
              onClick={handleAddAccount}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <Check className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 ">
            {accounts?.data?.map((item: any) => {
              type IconName = keyof typeof LucideIcons;
              const iconName = item?.icon as IconName;
              const IconComponent = (LucideIcons[iconName] ||
                LucideIcons.HelpCircle) as React.ComponentType<{
                className: string;
              }>;
              const colorClass =
                ledgerColorClasses[item?.color] || ledgerColorClasses.green;
              return (
                <div onClick={()=>handleAddAccount(item)}
                  className={`rounded-xl py-2 px-3 md:p-6 border ${colorClass} transition-all hover:scale-105  cursor-pointer relative`}
                >
                  <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
                    <div
                      className={`w-8 md:w-16 h-8 md:h-16 rounded-full flex items-center justify-center ${
                        item?.color?.includes("yellow")
                          ? "bg-yellow-500"
                          : item?.color?.includes("blue")
                          ? "bg-blue-500"
                          : item?.color?.includes("orange")
                          ? "bg-orange-500"
                          : item?.color?.includes("purple")
                          ? "bg-purple-500"
                          : item?.color?.includes("pink")
                          ? "bg-pink-500"
                          : item?.color?.includes("emerald")
                          ? "bg-emerald-500"
                          : item?.color?.includes("teal")
                          ? "bg-teal-500"
                          : item?.color?.includes("cyan")
                          ? "bg-cyan-500"
                          : "bg-green-500"
                      }`}
                    >
                      <IconComponent className="w-4 md:w-8 h-4 md:h-8 text-white" />
                    </div>
                    <h3 className="text-white max-w-22 md:max-w-27.5 truncate font-normal text-xs md:text-base text-center">
                      {item?.name}
                    </h3>
                    <p className="text-white font-semibold text-sm md:text-xl">
                      ৳{item?.balance > 0 ? item?.balance?.toLocaleString() : 0}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
