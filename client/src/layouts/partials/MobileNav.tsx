import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  PlusCircleIcon,
  Landmark,
  // BarChart3
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const mobileMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Wallet, label: 'Transactions', path: '/transactions' },
  { icon: PlusCircleIcon, label: 'Ledger', path: '/add-ledger', styles: 'text-orange-500' },
  // { icon: TrendingUp, label: 'Income', path: '/income' },
  { icon: CreditCard, label: 'Expenses', path: '/expenses' },
  { icon: Landmark, label: 'Accounts', path: '/account-list'},
  // { icon: BarChart3, label: 'Reports', path: '/reports' },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1a2332] border-t border-gray-800 md:hidden z-40">
      <div className="flex items-center justify-around">
        {mobileMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-2 px-2 flex-1 transition-colors ${item.styles} ${
                isActive
                  ? 'text-orange-500 border-t-2 border-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <item.icon className="w-4 h-4" />
            <span className="text-[10px] mt-1 font-normal">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
