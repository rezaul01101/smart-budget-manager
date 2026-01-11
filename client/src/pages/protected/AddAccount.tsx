import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { AccountFormData } from "../../interfaces/interface";
import IconColorModal from "../../components/modal/IconColorModal";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ElementType } from "react";
import { useCreateAccountMutation, useSingleAccountQuery, useUpdateAccountMutation } from "../../redux/api/accountApi";

const AddAccount = () => {
  const [openIconColorModal, setOpenIconColorModal] = useState(false);
  const [modalType, setModalType] = useState("icon");
  const hasInitialized = useRef(false);

  const navigate = useNavigate();
  const { ledgerId } = useParams();
  const isEditMode = Boolean(ledgerId);

  //Api call
  const [createAccount, { isLoading: isCreating, error }] =
    useCreateAccountMutation();

  const [updateAccount, { isLoading: isUpdating }] = useUpdateAccountMutation();

  const [formData, setFormData] = useState<AccountFormData>({
    name: "",
    type: "BANK",
    icon: "Landmark",
    color: "orange",
    balance: 0,
    description: "",
  });

  const { data: account } = useSingleAccountQuery(ledgerId!, {
    skip: !isEditMode,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      let res;
      if (isEditMode) {
        res = await updateAccount({
          id: Number(ledgerId),
          ...formData,
        }).unwrap();
      } else {
        res = await createAccount(formData).unwrap();
      }
      if (res) {
        navigate(isEditMode ? -2 : -1);
      }
    } catch (err) {
      console.error("Ledger Create failed:", error, err);
    }

    setFormData({
      name: "",
      type: "BANK",
      icon: "Landmark",
      color: "orange",
      balance: 0,
      description: "",
    });
  };

  useEffect(() => {
    if (isEditMode && account && !hasInitialized.current) {
      const timer = setTimeout(() => {
        setFormData({
          name: account?.data?.name || "",
          type: account?.data?.type || "BANK",
          icon: account?.data?.icon || "Landmark",
          color: account?.data?.color || "orange",
          balance: account?.data?.balance || 0,
          description: account?.data?.description || "",
        });
        hasInitialized.current = true;
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [account, isEditMode]);

  const handleIconClick = () => {
    setOpenIconColorModal(true);
    setModalType("icon");
  };

  const handleColorClick = () => {
    setOpenIconColorModal(true);
    setModalType("color");
  };



  const IconComponent = LucideIcons[
    formData.icon as keyof typeof LucideIcons
  ] as ElementType<LucideProps>;
  return (
    <>
      <IconColorModal
        formData={formData}
        setFormData={setFormData}
        type={modalType}
        isOpen={openIconColorModal}
        onClose={() => setOpenIconColorModal(false)}
      />
      <div className="bg-[#1a2332] rounded-lg p-2 pb-3 md:p-4 border border-gray-800">
        <div className="p-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(account?.data ? -2 : -1)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  {isEditMode ? "Edit Account" : "Add New Account"}
                </h2>
                <p className="text-sm text-gray-400">
                  Set up a new account to track your money easily
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[80%]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Bank Account, Cash, Saving Account etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Initial Balance
                </label>
                <input
                  type="number"
                  required
                  value={formData.balance}
                  onChange={(e) =>
                    setFormData({ ...formData, balance: Number(e.target.value) })
                  }
                  className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., 1000"
                />
              </div>

              <div>
                <label className="block text-xs font-normal text-gray-300 mb-2">
                  Type
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "BANK" })
                    }
                    className={`p-2 rounded-lg border-1 transition-all cursor-pointer ${
                      formData.type === "BANK"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-white">Bank</p>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "CASH" })
                    }
                    className={`p-2 rounded-lg border-1 transition-all cursor-pointer ${
                      formData.type === "CASH"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-white">Cash</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "SAVINGS" })}
                    className={`p-2 rounded-lg border-1 transition-all cursor-pointer ${
                      formData.type === "SAVINGS"
                        ? "border-green-500 bg-green-500/10"
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-white">Savings</p>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Icon
                </label>
                <button
                  type="button"
                  onClick={handleIconClick}
                  className={`p-2 rounded-lg border-1 transition-all cursor-pointer border-orange-500 bg-orange-500/10`}
                >
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 text-white mx-auto" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-4 justify-between">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Color
                </label>
                <div onClick={() => {}}>
                  <button
                    type="button"
                    onClick={handleColorClick}
                    className={`cursor-pointer py-3 px-2 rounded-lg border-1 transition-all border-orange-500 bg-orange-500/10`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-${formData.color}-500 mx-auto`}
                    />
                  </button>
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

export default AddAccount;
