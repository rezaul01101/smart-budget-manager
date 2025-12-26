import * as LucideIcons from "lucide-react";

import { Link } from "react-router";
import { useLedgerListQuery } from "../redux/api/ledgerApi";
import type { LedgerType } from "../interfaces/interface";
import {
  ledgerColorClasses,
  transactionListColorClasses,
} from "../constants/constants";

const LedgerCard = ({ type }: { type: string }) => {
  const { data: ledgers, isLoading, error } = useLedgerListQuery(type);
  if (isLoading) return <p className="text-center p-10">Loading ledgers...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Error loading data.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {ledgers?.data?.ledgers?.map((ledger: LedgerType, index: number) => {
        type IconName = keyof typeof LucideIcons;

        const iconName = ledger.icon as IconName;
        const IconComponent = (LucideIcons[iconName] ||
          LucideIcons.HelpCircle) as React.ComponentType<{ className: string }>;
        const colorClass =
          ledgerColorClasses[ledger.color] || ledgerColorClasses.green;
        const ledgerListIconColorClass =
          transactionListColorClasses[ledger.color] ||
          transactionListColorClasses.green;

        return (
          <div
            key={index}
            className={`rounded-xl p-4 md:p-6 border ${colorClass} transition-all hover:scale-105  cursor-pointer relative`}
          >
            <Link
              to={`/transaction-entry/${ledger.id}?ledger=${
                ledger.name
              }&type=${ledger.type.toLowerCase()}`}
              className="flex flex-col items-center justify-center gap-4"
            >
              <div
                className={`w-8 md:w-16 h-8 md:h-16 rounded-full flex items-center justify-center ${
                  ledger?.color.includes("yellow")
                    ? "bg-yellow-500"
                    : ledger?.color.includes("blue")
                    ? "bg-blue-500"
                    : ledger?.color.includes("orange")
                    ? "bg-orange-500"
                    : ledger?.color.includes("purple")
                    ? "bg-purple-500"
                    : ledger?.color.includes("pink")
                    ? "bg-pink-500"
                    : ledger?.color.includes("emerald")
                    ? "bg-emerald-500"
                    : ledger?.color.includes("teal")
                    ? "bg-teal-500"
                    : ledger?.color.includes("cyan")
                    ? "bg-cyan-500"
                    : "bg-green-500"
                }`}
              >
                <IconComponent className="w-4 md:w-8 h-4 md:h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm md:text-base text-center">
                {ledger.name}
              </h3>
              <p className="text-white font-bold text-lg md:text-2xl">
                ৳{ledger?.amount.toLocaleString()}
                {/* ${ledger?.amount.toLocaleString()} */}
              </p>
            </Link>
            <div
              className={`absolute top-2 right-2 w-7 h-7 text-white rounded-sm  flex items-center justify-center cursor-pointer ${ledgerListIconColorClass}`}
            >
              <Link
                to={`/ledger/${ledger.id}/transactions?ledger=${ledger.name}&type=${ledger.type.toLowerCase()}`}
                className=" transition-all"
              >
                <LucideIcons.List className="w-5 h-5 " />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LedgerCard;
