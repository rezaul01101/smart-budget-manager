import { ChevronDown, Wallet, Plus } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router";
import LedgerCard from "../../components/LedgerCard";

// const periods = ["Monthly", "Weekly", "Yearly"];

const Dashboard = () => {
  // const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [expenseOpen, setExpenseOpen] = useState(true);
  const [incomeOpen, setIncomeOpen] = useState(true);
  const [totalIncomeAmountTransactions, setTotalIncomeAmountTransactions] = useState(0);
  const [totalExpenseAmountTransactions, setTotalExpenseAmountTransactions] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-4">
      <div className="space-y-6 col-span-2">
        <div className="bg-[#1a2332] rounded-lg p-3 md:p-6 border border-gray-800">
          <button
            onClick={() => setExpenseOpen(!expenseOpen)}
            className="w-full flex items-center justify-between mb-6 group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Expense
              </h3>
              <span className="text-2xl md:text-3xl font-bold text-orange-500">
                ৳{totalExpenseAmountTransactions?.toLocaleString()}
              </span>
            </div>
            <ChevronDown
              className={`cursor-pointer w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all transform ${
                expenseOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {expenseOpen && <LedgerCard type="expense" setTotalExpenseAmountTransactions={setTotalExpenseAmountTransactions} />}
        </div>

        <div className="bg-[#1a2332] rounded-lg p-4 md:p-6 border border-gray-800">
          <button
            onClick={() => setIncomeOpen(!incomeOpen)}
            className="w-full flex items-center justify-between mb-6 group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Income
              </h3>
              <span className="text-2xl md:text-3xl font-bold text-green-500">
                ৳{totalIncomeAmountTransactions?.toLocaleString()}
              </span>
            </div>
            <ChevronDown
              className={`cursor-pointer w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all transform ${
                incomeOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {incomeOpen && <LedgerCard type="income" setTotalIncomeAmountTransactions={setTotalIncomeAmountTransactions} />}
        </div>
      </div>
      {/* <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div> */}
    </div>
  );
};

export default Dashboard;
