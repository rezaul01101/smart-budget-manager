import { Bell, Search, User, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useUserLogoutMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken } from "../../redux/features/authSlice";
import type { RootState } from "../../redux/store";


interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [logout, { isLoading }] = useUserLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const handleLogout = async () => {
    try {
      localStorage.setItem("isLoggedOut", "true");
      await logout({}).unwrap();

      // clear client-side auth
      dispatch(clearAccessToken());
      setShowUserMenu(false);

      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-[#1a2332] border-b border-gray-800 px-4 md:px-6 md:py-4 py-0 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors shrink-0"
        >
          <Menu className="md:w-5 md:h-5 w-4 h-4" />
        </button>

        <div className="flex-1 hidden sm:block max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors shrink-0">
            <Bell className="md:w-5 md:h-5 w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 md:gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors shrink-0 cursor-pointer"
            >
              <div className="md:w-8 md:h-8 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                <User className="md:w-5 md:h-5 w-4 h-4 text-white" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-white">{userInfo?.name}</p>
                <p className="text-xs text-gray-400">{userInfo?.email}</p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                <button className="cursor-pointer w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="cursor-pointer w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center gap-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
