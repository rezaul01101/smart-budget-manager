import {
  LayoutDashboard,
  Wallet,
  TrendingUp,
  CreditCard,
  // BarChart3
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const mobileMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Wallet, label: 'Transactions', path: '/transactions' },
  { icon: TrendingUp, label: 'Income', path: '/income' },
  { icon: CreditCard, label: 'Expenses', path: '/expenses' },
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
              `flex flex-col items-center justify-center py-3 px-4 flex-1 transition-colors ${
                isActive
                  ? 'text-orange-500 border-t-2 border-orange-500'
                  : 'text-gray-400 hover:text-white'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
