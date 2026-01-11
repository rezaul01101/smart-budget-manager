import { ChevronDown, Plus } from "lucide-react";

import { useState } from "react";
import { useAccountListQuery } from "../../redux/api/accountApi";
import Card from "../../components/Card";
import { Link } from "react-router";

// const periods = ["Monthly", "Weekly", "Yearly"];

const AccountList = () => {
  const { data: accounts, isLoading } = useAccountListQuery({});
 
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
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 ">
            {accounts?.data?.map((account: any, index: number) => {
              return <Card key={index} item={account} />;
            })}
            <div
              className={`bg-gray-800 border-gray-900  rounded-xl py-2 px-3 md:p-6 border transition-all hover:scale-105  cursor-pointer relative flex justify-center items-center`}
            >
              <Link
                to={`/add-account`}
                className="flex flex-col items-center justify-center gap-2 md:gap-4"
              >
                <div
                  className={`w-8 md:w-16 h-8 md:h-16 rounded-full flex items-center justify-center bg-gray-500`}
                >
                  <Plus className="w-4 md:w-8 h-4 md:h-8 text-white" />
                </div>
                <h3 className="text-white max-w-22 md:max-w-27.5 truncate font-normal text-xs md:text-base text-center">
                  Add Account
                </h3>
              </Link>
            </div>
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
