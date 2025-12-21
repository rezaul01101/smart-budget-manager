/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "temporal-polyfill/global";
import "@schedule-x/theme-default/dist/index.css";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Wallet,
  UtensilsCrossed,
  Bus,
  Droplet,
  Sparkles,
  ShoppingBag,
  Heart,
  Briefcase,
  Heart as HeartAlt,
  TrendingUp,
  Plus,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router";

const expenseCategories = [
  {
    name: "Food & Drink",
    amount: 2250,
    icon: UtensilsCrossed,
    bgColor: "bg-yellow-900/30 border-yellow-800",
  },
  {
    name: "Transport",
    amount: 0,
    icon: Bus,
    bgColor: "bg-blue-900/30 border-blue-800",
  },
  {
    name: "Home Bills",
    amount: 0,
    icon: Droplet,
    bgColor: "bg-orange-900/30 border-orange-800",
  },
  {
    name: "Self-Care",
    amount: 0,
    icon: Sparkles,
    bgColor: "bg-purple-900/30 border-purple-800",
  },
  {
    name: "Shopping",
    amount: 0,
    icon: ShoppingBag,
    bgColor: "bg-pink-900/30 border-pink-800",
  },
  {
    name: "Health",
    amount: 720,
    icon: Heart,
    bgColor: "bg-emerald-900/30 border-emerald-800",
  },
];

const incomeCategories = [
  {
    name: "Salary",
    amount: 0,
    icon: Briefcase,
    bgColor: "bg-teal-900/30 border-teal-800",
  },
  {
    name: "Freelance",
    amount: 0,
    icon: HeartAlt,
    bgColor: "bg-cyan-900/30 border-cyan-800",
  },
  {
    name: "Investment",
    amount: 0,
    icon: TrendingUp,
    bgColor: "bg-green-900/30 border-green-800",
  },
];

const periods = ["Monthly", "Weekly", "Yearly"];

const Dashboard = () => {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendar = useCalendarApp({
    views: [
      // createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    theme: "shadcn",
    events: [
      {
        id: "1",
        title: "Event 1",
        start: Temporal.PlainDate.from("2025-12-21"),
        end: Temporal.PlainDate.from("2025-12-23"),
      },
    ],
    plugins: [eventsService],
  });

  useEffect(() => {
    // get all events
    eventsService.getAll();
  }, [eventsService]);

  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [expenseOpen, setExpenseOpen] = useState(true);
  const [incomeOpen, setIncomeOpen] = useState(true);

  const totalExpense = expenseCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );
  const totalIncome = incomeCategories.reduce(
    (sum, cat) => sum + cat.amount,
    0
  );

  const CategoryCard = ({
    category,
  }: {
    category: (typeof expenseCategories)[0];
  }) => (
    <Link
      to={''}
      className={`rounded-xl p-4 md:p-6 border transition-all hover:scale-105 ${category.bgColor} cursor-pointer`}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div
          className={`w-12 md:w-16 h-12 md:h-16 rounded-full flex items-center justify-center ${
            category.bgColor.includes("yellow")
              ? "bg-yellow-500"
              : category.bgColor.includes("blue")
              ? "bg-blue-500"
              : category.bgColor.includes("orange")
              ? "bg-orange-500"
              : category.bgColor.includes("purple")
              ? "bg-purple-500"
              : category.bgColor.includes("pink")
              ? "bg-pink-500"
              : category.bgColor.includes("emerald")
              ? "bg-emerald-500"
              : category.bgColor.includes("teal")
              ? "bg-teal-500"
              : category.bgColor.includes("cyan")
              ? "bg-cyan-500"
              : "bg-green-500"
          }`}
        >
          <category.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
        </div>
        <h3 className="text-white font-semibold text-sm md:text-base text-center">
          {category.name}
        </h3>
        <p className="text-white font-bold text-lg md:text-2xl">
          ${category.amount.toLocaleString()}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-3 md:gap-4">
      <div className="space-y-6 col-span-2">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 md:gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#1a2332] text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg md:text-2xl font-bold text-white whitespace-nowrap">
              This Month
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={'/add-ledger'}
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

        <div className="bg-[#1a2332] rounded-lg p-4 md:p-6 border border-gray-800">
          <button
            onClick={() => setExpenseOpen(!expenseOpen)}
            className="w-full flex items-center justify-between mb-6 group"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Expense
              </h3>
              <span className="text-2xl md:text-3xl font-bold text-orange-500">
                ${totalExpense.toLocaleString()}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all transform ${
                expenseOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {expenseOpen && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
              {expenseCategories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
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
                ${totalIncome.toLocaleString()}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white transition-all transform ${
                incomeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {incomeOpen && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {incomeCategories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <div>
        <ScheduleXCalendar calendarApp={calendar} />
      </div> */}
    </div>
  );
};

export default Dashboard;
