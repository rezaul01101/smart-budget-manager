import { useNavigate } from "react-router-dom";
import { useTransactionListQuery } from "../../redux/api/transactionApi";
import { ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { TransactionType } from "../../interfaces/interface";

const Expense = () => {
  const navigate = useNavigate();

  const {
    data: transactions,
    isLoading,
    error,
  } = useTransactionListQuery(`?type=expense`);
  return (
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
                Expense
              </h2>
              <p className="text-sm text-gray-400">Monitor your spending</p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4  overflow-y-auto">
        {isLoading && <p className="text-gray-400">Loading transactions...</p>}
        {error && <p className="text-red-500">Error loading transactions.</p>}
        {transactions?.data && transactions?.data?.length === 0 && (
          <p className="text-gray-400">No transactions found.</p>
        )}
        {transactions?.data &&
          transactions?.data?.map((transaction:TransactionType) => {
            type IconName = keyof typeof LucideIcons;

            const iconName = transaction?.ledger?.icon as IconName;
            const IconComponent = (LucideIcons[iconName] ||
              LucideIcons.HelpCircle) as React.ComponentType<{
              className: string;
            }>;
            return (
              <div key={transaction.id}>
                <div className="space-y-3">
                  <div
                    key={transaction.id}
                    className="bg-gray-800/30 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer hover:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <IconComponent className={`w-4 md:w-4 h-4 md:h-4 text-white`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">
                            {transaction?.ledger?.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {transaction.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`font-bold ${
                            transaction?.ledger?.type =="INCOME"
                              ? "text-green-500"
                              : "text-orange-500"
                          }`}
                        >
                          {transaction?.ledger?.type =="INCOME" ? "+" : "-"}৳
                          {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction?.date.split("T")[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Expense;
