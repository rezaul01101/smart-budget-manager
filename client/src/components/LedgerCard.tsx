import * as LucideIcons from "lucide-react";

import { Link } from "react-router";
import { useLedgerListQuery } from "../redux/api/ledgerApi";
import type { LedgerType } from "../interfaces/interface";

const LedgerCard = () => {
  const { data: ledgers, isLoading, error } = useLedgerListQuery({});

  if (isLoading) return <p className="text-center p-10">Loading ledgers...</p>;
  if (error)
    return <p className="text-center p-10 text-red-500">Error loading data.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {ledgers?.data?.map((ledger: LedgerType, index: number) => {
        type IconName = keyof typeof LucideIcons;

        const iconName = ledger.icon as IconName;
        const IconComponent = (LucideIcons[iconName] ||
          LucideIcons.HelpCircle) as React.ComponentType<{ className: string }>;

        return (
          <Link
            key={index}
            to={"/transaction-entry?category=" + ledger.name + "&type=" + ledger.type.toLowerCase()}
            className={`rounded-xl p-4 md:p-6 border transition-all hover:scale-105 bg-${ledger?.color}-900/30 border-${ledger?.color}-800  cursor-pointer`}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className={`w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center ${
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
                <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-white" />
              </div>
              <h3 className="text-white font-semibold text-sm md:text-base text-center">
                {ledger.name}
              </h3>
              <p className="text-white font-bold text-lg md:text-2xl">
                $323
                {/* ${ledger?.amount.toLocaleString()} */}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default LedgerCard;
