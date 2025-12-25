import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";
import { useUserRegisterMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import SuccessComponent from "./components/SuccessComponent";

export default function Register() {
  const navigate = useNavigate();
  const [register, { isLoading, error }] = useUserRegisterMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        email: formData?.email,
        password: formData?.password,
        name: formData?.fullName,
      };
      const res = await register(data).unwrap();
      if (res) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Login failed:", error, err);
    }
    console.log("Registering user:", formData);
  };

  const passwordStrength =
    formData.password.length > 0
      ? Math.min(formData.password.length / 8, 100) * 100
      : 0;

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0  opacity-40"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join Smart Budget Manager and start managing your finances
            </p>
          </div>

          {success ? (
            <SuccessComponent />
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div
                  className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
                    isFocused === "fullName"
                      ? "border-orange-500 dark:border-orange-500 bg-white/80 dark:bg-gray-700/80"
                      : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
                  }`}
                >
                  <User className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("fullName")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="John Doe"
                    className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 pr-4 py-3"
                    required
                  />
                </div>
              </div>

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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength < 33
                            ? "bg-red-500"
                            : passwordStrength < 66
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {passwordStrength < 33
                        ? "Weak password"
                        : passwordStrength < 66
                        ? "Medium password"
                        : "Strong password"}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div
                  className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
                    isFocused === "confirmPassword"
                      ? "border-orange-500 dark:border-orange-500 bg-white/80 dark:bg-gray-700/80"
                      : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
                  }`}
                >
                  <Lock className="absolute left-4 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setIsFocused("confirmPassword")}
                    onBlur={() => setIsFocused(null)}
                    placeholder="••••••••"
                    className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 pr-12 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle
                      className={`w-4 h-4 ${
                        formData.password === formData.confirmPassword
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        formData.password === formData.confirmPassword
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formData.password === formData.confirmPassword
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </span>
                  </div>
                )}
              </div>

              <label className="flex items-start space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer mt-0.5"
                  required
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors leading-relaxed">
                  I agree to the{" "}
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
                </span>
              </label>

              <button
                type="submit"
                disabled={formData.password !== formData.confirmPassword}
                className="cursor-pointer w-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account" : "Sign Up"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400">
                Already have an account?
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer w-full bg-white/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-semibold py-4 px-6 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
