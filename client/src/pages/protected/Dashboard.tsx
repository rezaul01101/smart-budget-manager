import { ChevronDown } from "lucide-react";

import { useState } from "react";
import LedgerCard from "../../components/LedgerCard";
import MonthYearPickerModal from "../../components/modal/MonthYearPickerModal";

const Dashboard = () => {
  const [expenseOpen, setExpenseOpen] = useState(true);
  const [incomeOpen, setIncomeOpen] = useState(true);
  const [totalIncomeAmountTransactions, setTotalIncomeAmountTransactions] =
    useState(0);
  const [totalExpenseAmountTransactions, setTotalExpenseAmountTransactions] =
    useState(0);

  // Month/Year picker state
  const [openMonthYearModal, setOpenMonthYearModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const monthQuery = `month=${new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    year: "numeric",
  })}`;
  const [selectedMonthYear, setSelectedMonthYear] = useState(monthQuery);

  const formatDate = () => {
    const date = new Date(selectedYear, selectedMonth, 1);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const filterByMonthYear = () => {
    setOpenMonthYearModal(false);
    const date = new Date(selectedYear, selectedMonth, 1);
    const forDb: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      year: "numeric",
    };
    const query =  `month=${date.toLocaleDateString("en-US", forDb)}`;
    setSelectedMonthYear(query);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-4">
      <div className="flex justify-center items-center w-full">
        <button
          onClick={() => setOpenMonthYearModal(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <h4 className="text-white font-semibold">{formatDate()}</h4>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </button>
        {/* <p className="text-white text-sm">{formatDate()}</p> */}
      </div>
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
          {expenseOpen && (
            <LedgerCard
              query={`type=expense&${selectedMonthYear}`}
              setTotalExpenseAmountTransactions={
                setTotalExpenseAmountTransactions
              }
            />
          )}
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
          {incomeOpen && (
            <LedgerCard
              query={`type=income&${selectedMonthYear}`}
              setTotalIncomeAmountTransactions={
                setTotalIncomeAmountTransactions
              }
            />
          )}
        </div>
      </div>
      {/* <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div> */}

      <MonthYearPickerModal
        isOpen={openMonthYearModal}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
        onClose={() => setOpenMonthYearModal(false)}
        onApply={filterByMonthYear}
      />
    </div>
  );
};

export default Dashboard;
