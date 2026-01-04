import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";
import { useUserLoginMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/features/authSlice";
import { setUserInfo } from "../../redux/features/user/userSlice";
import { decodedToken } from "../../utils/jwt";
import type { ApiError } from "../../interfaces/interface";

export default function Login() {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };
      const res = await userLogin(data).unwrap();
      dispatch(setAccessToken(res.data.accessToken));
      dispatch(setUserInfo(decodedToken(res.data.accessToken)));
      if(res.data.accessToken){
        localStorage.setItem("isLoggedOut", "false");
      }

      window.location.reload();
    } catch (err: ApiError | unknown) {
      setErrorMessage(
        (err as ApiError)?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl"></div>

        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account to access your dashboard
            </p>
            {errorMessage && (
              <div className="text-left bg-red-300 p-2 rounded-md">
                <p className="text-red-700 text-left mb-0">{errorMessage}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div
                className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
                  isFocused === "email"
                    ? "border-orange-500 dark:border-orange-500 bg-white/80 dark:bg-gray-700/80"
                    : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
                }`}
              >
                <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused("email")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 pr-4 py-3"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div
                className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
                  isFocused === "password"
                    ? "border-orange-500 dark:border-orange-500 bg-white/80 dark:bg-gray-700/80"
                    : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
                }`}
              >
                <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused("password")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="••••••••"
                  className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 pr-12 py-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <Eye className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] inline-flex items-center justify-center group"
            >
              Sign In
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400">
                New to Smart Budget Manager?
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="w-full block text-center bg-white/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-semibold py-4 px-6 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isLoading ? "Creating Account" : "Create Account"}
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          By signing in, you agree to our{" "}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
