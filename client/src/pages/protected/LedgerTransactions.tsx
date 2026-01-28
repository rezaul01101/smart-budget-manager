import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  useDeleteTransactionMutation,
  useTransactionListQuery,
} from "../../redux/api/transactionApi";
import { ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { TransactionType } from "../../interfaces/interface";
import { useState } from "react";
import DeleteModal from "../../components/DeleteModal";
import { useDeleteLedgerMutation } from "../../redux/api/ledgerApi";
import { motion } from "framer-motion";
import GlobalDeleteModal from "../../components/modal/GlobalDeleteModal";
import toast from "react-hot-toast";

const LedgerTransactions = () => {
  const [transactionDeletableId, setTransactionDeletableId] = useState<
    string | number | null
  >(null);
  const [globalDeleteModalOpen, setGlobalDeleteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ledgerName = searchParams.get("ledger") || "";
  //   const categoryType = searchParams.get("type") || "expense";
  const { ledgerId } = useParams<{ ledgerId: string }>();
  const [deleteLedger] = useDeleteLedgerMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const {
    data: transactions,
    isLoading,
    error,
  } = useTransactionListQuery(`?ledgerid=${ledgerId}`);

  const handleDelete = async () => {
    try {
      const isDelete = await deleteLedger(Number(ledgerId));
      if (isDelete) {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGlobalDelete = async () => {
    setGlobalDeleteModalOpen(false);
    try {
      toast.promise(deleteTransaction(Number(transactionDeletableId)), {
        loading: "Deleting...",
        success: <b>Transaction deleted!</b>,
        error: <b>Could not delete.</b>,
      });
    } catch (error) {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <>
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
                <h2 className="text-sm md:text-2xl font-semibold text-white">
                  {ledgerName}
                </h2>
                <p className="text-sm text-gray-400">Transaction History</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/edit-ledger/${ledgerId}`}
                className="rounded-lg bg-orange-500 flex items-center justify-center w-6 h-6 md:w-8 md:h-8"
              >
                <LucideIcons.Pen className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </Link>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="rounded-lg bg-red-300 hover:bg-red-500 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 cursor-pointer"
              >
                <LucideIcons.Trash2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-4  overflow-y-auto">
          {isLoading && (
            <p className="text-gray-400">Loading transactions...</p>
          )}
          {error && <p className="text-red-500">Error loading transactions.</p>}
          {transactions?.data && transactions?.data?.length === 0 && (
            <p className="text-gray-400">No transactions found.</p>
          )}
          {transactions?.data &&
            transactions?.data?.map((transaction: TransactionType) => {
              // const before = 2750;
              // const after = 2630;

              type IconName = keyof typeof LucideIcons;

              const iconName = transaction?.ledger?.icon as IconName;
              const IconComponent = (LucideIcons[iconName] ||
                LucideIcons.HelpCircle) as React.ComponentType<{
                className: string;
              }>;
              return (
                <div
                  className="relative overflow-hidden rounded-xl"
                  key={transaction.id}
                >
                  {/* ACTION BUTTONS (Behind card) */}
                  <div className="absolute right-0 top-0 h-full flex z-0">
                    <button
                      onClick={() => console.log("Edit", transaction.id)}
                      className="w-20 bg-blue-500 text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setGlobalDeleteModalOpen(true);
                        setTransactionDeletableId(transaction.id);
                      }}
                      className="w-20 bg-red-500 text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {/* SWIPEABLE CARD */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: -160, right: 0 }}
                    dragElastic={0.15}
                    className="relative z-10 bg-[#1b2432] rounded-xl px-3 py-2 border border-gray-700/60"
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">
                            {transaction?.date.split("T")[0]}
                          </p>

                          <h4 className="text-white font-semibold text-sm">
                            {transaction?.ledger?.name}
                            {transaction?.subLedger
                              ? `-(${transaction?.subLedger?.name})`
                              : ""}
                          </h4>

                          <p className="text-sm text-gray-400 leading-snug">
                            {transaction.description}
                          </p>
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex flex-col items-end justify-between h-full text-right">
                        <div className="text-xs text-gray-400">
                          <div className="text-white text-sm font-semibold capitalize">
                            {transaction?.account?.name}
                          </div>
                        </div>

                        <div className="my-1">
                          <p
                            className={`font-semibold text-sm ${
                              transaction?.ledger?.type === "INCOME"
                                ? "text-green-500"
                                : "text-orange-500"
                            }`}
                          >
                            {transaction?.ledger?.type === "INCOME" ? "+" : "-"}
                            ৳{Math.abs(transaction.amount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteModal
          handleDelete={handleDelete}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
      {globalDeleteModalOpen && (
        <GlobalDeleteModal
          handleGlobalDelete={handleGlobalDelete}
          onClose={() => setGlobalDeleteModalOpen(false)}
        />
      )}
    </>
  );
};

export default LedgerTransactions;
