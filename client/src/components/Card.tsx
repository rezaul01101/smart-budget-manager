import * as LucideIcons from "lucide-react";

import {
  ledgerColorClasses
} from "../constants/constants";

const Card = ({ item }: { item?: any }) => {
  type IconName = keyof typeof LucideIcons;
  const iconName = item?.icon as IconName;
  const IconComponent = (LucideIcons[iconName] ||
    LucideIcons.HelpCircle) as React.ComponentType<{ className: string }>;
  const colorClass =
    ledgerColorClasses[item?.color] || ledgerColorClasses.green;
  return (
    <>
      <div
        className={`rounded-xl py-2 px-3 md:p-6 border ${colorClass} transition-all hover:scale-105  cursor-pointer relative`}
      >
        <div className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <div
            className={`w-8 md:w-16 h-8 md:h-16 rounded-full flex items-center justify-center ${
              item?.color?.includes("yellow")
                ? "bg-yellow-500"
                : item?.color?.includes("blue")
                ? "bg-blue-500"
                : item?.color?.includes("orange")
                ? "bg-orange-500"
                : item?.color?.includes("purple")
                ? "bg-purple-500"
                : item?.color?.includes("pink")
                ? "bg-pink-500"
                : item?.color?.includes("emerald")
                ? "bg-emerald-500"
                : item?.color?.includes("teal")
                ? "bg-teal-500"
                : item?.color?.includes("cyan")
                ? "bg-cyan-500"
                : "bg-green-500"
            }`}
          >
            <IconComponent className="w-4 md:w-8 h-4 md:h-8 text-white" />
          </div>
          <h3 className="text-white max-w-22 md:max-w-27.5 truncate font-normal text-xs md:text-base text-center">
            {item?.name}
          </h3>
          <p className="text-white font-semibold text-sm md:text-xl">
            ৳{item?.balance > 0 ? item?.balance?.toLocaleString() : 0}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;
