import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  CreditCard,
  X,
  PlusCircleIcon,
  Landmark,
  List
} from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Wallet, label: 'Transactions', path: '/transactions' },
  { icon: TrendingUp, label: 'Income', path: '/income' },
  { icon: CreditCard, label: 'Expenses', path: '/expenses' },
  { icon: PlusCircleIcon, label: 'Add Ledger', path: '/add-ledger' },
  { icon: Landmark, label: 'Add Account', path: '/add-account' },
  { icon: List, label: 'Account List', path: '/account-list' },
  // { icon: PieChart, label: 'Reports', path: '/reports' },
  // { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-[#1a2332] border-r border-gray-800 transition-all duration-300 flex flex-col z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="md:p-6 py-2 px-6 flex items-center justify-between">
          <Link to={'/'} className="flex items-center gap-2 cursor-pointer">
            <Wallet className="md:w-8 md:h-8 w-5 h-5 text-orange-500" />
            <span className="text-white font-bold text-lg ">Smart Budget</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="md:w-5 md:h-5 w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 md:gap-4 px-4 py-1 md:py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="md:w-5 md:h-5 w-4 h-4 shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
