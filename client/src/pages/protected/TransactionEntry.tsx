import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { useCreateTransactionMutation } from "../../redux/api/transactionApi";
import { useSingleLedgerQuery } from "../../redux/api/ledgerApi";
import AccountModal from "../../components/modal/AccountModal";
import type { AccountType } from "../../interfaces/interface";

const TransactionEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [createTransaction, { isLoading, error }] =
    useCreateTransactionMutation();
  const { data: ledger } = useSingleLedgerQuery(Number(id));

  const categoryName = searchParams.get("ledger") || "";
  const categoryType = searchParams.get("type") || "expense";

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    subLedgerId: Number(undefined),
    accountId: Number(undefined),
    account: {} as AccountType,
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        amount: Number(formData?.amount),
        date: formData?.date,
        description: formData?.description,
        ledgerId: Number(id),
        subLedgerId: formData?.subLedgerId,
      };
      const res = await createTransaction(data).unwrap();
      if (res) {
        navigate(-1);
      }
    } catch (err) {
      console.error("Login failed:", error, err);
    }
  };

  const handleAccountClick = () => {
    setOpenAccountModal(true);
  };

  const balance = categoryType === "income" ? formData?.account?.balance + Number(formData?.amount) : formData?.account?.balance - Number(formData?.amount)

  return (
    <>
      <AccountModal
        formData={formData}
        setFormData={setFormData}
        isOpen={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
      />
      <div className="bg-[#1a2332] rounded-lg p-2 pb-3 md:p-4 border border-gray-800">
        <div className="p-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Add {categoryName}{" "}
                  {categoryType === "income" ? "Income" : "Expense"}
                </h2>
                <p className="text-sm text-gray-400">
                  Add a transaction to your records
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[80%]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                    ৳
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="w-full bg-gray-800/50 text-white pl-8 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className=" gap-4">
                <div className="flex items-center gap-2 justify-between text-white">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pay From
                  </label>
                  <span className="text-orange-500">৳ {balance ? balance?.toFixed(2) : "0.00"}</span>
                </div>
                <button
                  type="button"
                  onClick={handleAccountClick}
                  className={`p-2 rounded-lg border transition-all cursor-pointer border-orange-500 bg-orange-500/10 text-white min-w-[200px]`}
                >
                  {formData?.account?.name || "Select Account"}
                  {/* {IconComponent && (
                    <IconComponent className="w-6 h-6 text-white mx-auto" />
                  )} */}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sub Ledger
                </label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-1 md:max-h-full overflow-y-auto">
                  {ledger?.data?.subLedgers?.map(
                    (
                      subLedger: { name: string; id: number },
                      index: number
                    ) => (
                      <button
                        key={index}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            subLedgerId: Number(subLedger.id),
                          });
                        }}
                        type="button"
                        className={`cursor-pointer py-2 rounded-lg border-1 transition-all bg-orange-500/10 
                         ${
                           formData.subLedgerId === Number(subLedger.id)
                             ? "border-orange-500 bg-orange-500/10"
                             : "border-gray-700 hover:border-gray-600"
                         }
                        `}
                      >
                        <p className="text-white text-xs text-center">
                          {subLedger.name}
                        </p>
                      </button>
                    )
                  )}
                  {/* <button
                    type="button"
                    onClick={handleSubLedgerClick}
                    className={`cursor-pointer py-2 rounded-lg border-1 transition-all bg-orange-500/10 flex items-center justify-center`}
                  >
                    <Plus className="w-5 h-5 text-white text-xs" />
                  </button> */}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-24 resize-none"
                  placeholder="Add notes about this transaction..."
                />
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
                  className="cursor-pointer flex-1 px-6 py-3 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionEntry;
