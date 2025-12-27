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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 md:gap-4">
            {/* <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#1a2332] text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select> */}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">
              This Month
            </h2> */}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/add-ledger"}
              className="p-2 md:px-4 md:py-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="hidden md:inline text-white font-semibold">
                Add Ledger
              </span>
            </Link>
            <div className="p-2 md:p-3 rounded-lg bg-gray-800">
              <Wallet className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            </div>
          </div>
        </div>

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
