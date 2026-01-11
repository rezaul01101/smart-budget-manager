import { ChevronDown } from "lucide-react";

import { useState } from "react";
import { useAccountListQuery } from "../../redux/api/accountApi";
import Card from "../../components/Card";

// const periods = ["Monthly", "Weekly", "Yearly"];

const AccountList = () => {
  const { data: accounts, isLoading } = useAccountListQuery({});
  console.log(accounts);
  const [incomeOpen, setIncomeOpen] = useState(true);

  isLoading ? <p>Loading...</p> : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-4">
      <div className="space-y-6 col-span-2">
        <div className="bg-[#1a2332] rounded-lg p-4 md:p-6 border border-gray-800">
          <button
            onClick={() => setIncomeOpen(!incomeOpen)}
            className="w-full flex items-center justify-between mb-6 group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Accounts
              </h3>
              <span className="text-2xl md:text-3xl font-bold text-green-500">
                {/* ৳{totalIncomeAmountTransactions?.toLocaleString()} */}
              </span>
            </div>
            <ChevronDown
              className={`cursor-pointer w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all transform ${
                incomeOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4">
            {accounts?.data?.map((account: any, index: number) => {
              return <Card key={index} item={account} />;
            })}
          </div>

          {/* {incomeOpen && <LedgerCard type="income" setTotalIncomeAmountTransactions={setTotalIncomeAmountTransactions} />} */}
        </div>
      </div>
      {/* <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div> */}
    </div>
  );
};

export default AccountList;
