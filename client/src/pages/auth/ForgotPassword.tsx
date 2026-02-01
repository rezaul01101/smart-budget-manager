import { useState, useRef } from "react";
import { Mail, ArrowLeft, CheckCircle, Loader, KeyRound, Eye, EyeOff } from "lucide-react";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useUpdatePasswordMutation,
} from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Step = "email" | "otp" | "resetPassword" | "success";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [updatePassword] = useUpdatePasswordMutation();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await forgotPassword({ email: email }).unwrap();
      toast.success("OTP sent successfully");
      setTimeout(() => {
        setIsLoading(false);
        setStep("otp");
      }, 1500);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only the last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace - focus previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextEmptyIndex = newOtp.findIndex((val) => val === "");
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      const res = await verifyOtp({ email, otp: otpValue }).unwrap();
      if (res.success) {
        toast.success("OTP verified successfully");
        setTimeout(() => {
          setIsLoading(false);
          setStep("resetPassword");
        }, 1500);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Invalid OTP");
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    const otpValue = otp.join("");

    try {
      setIsLoading(true);
      const data={
        email:email,
        password:newPassword,
        otp:otpValue

      }
      const res = await updatePassword(data).unwrap();
      if (res.success) {
        toast.success("Password reset successfully");
        setTimeout(() => {
          setIsLoading(false);
          setStep("success");
        }, 1500);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      await forgotPassword({ email: email }).unwrap();
      toast.success("OTP resent successfully");
      setOtp(["", "", "", "", "", ""]);
      setIsLoading(false);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Failed to resend OTP");
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-2xl"></div>

        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50 dark:border-gray-700/50 space-y-8">
          {step === "email" && (
            <>
              <div className="text-center space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Reset Password
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter your email address and we'll send you a code to reset
                  your password
                </p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div
                    className={`relative flex items-center border-2 rounded-xl transition-all duration-300 ${
                      isFocused
                        ? "border-orange-500 dark:border-orange-500 bg-white/80 dark:bg-gray-700/80"
                        : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
                    }`}
                  >
                    <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder="your@email.com"
                      className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-12 pr-4 py-3"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center group"
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 w-5 h-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>Send OTP</>
                  )}
                </button>
              </form>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Login</span>
                </button>
              </div>
            </>
          )}

          {step === "otp" && (
            <>
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-full">
                    <KeyRound className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Enter OTP
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We've sent a 6-digit code to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white break-all">
                    {email}
                  </span>
                </p>
              </div>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                    Enter 6-digit code
                  </label>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-xl bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:bg-white/80 dark:focus:bg-gray-700/80 transition-all duration-300 text-gray-900 dark:text-white"
                        required
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center group"
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>Verify OTP</>
                  )}
                </button>
              </form>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="w-full cursor-pointer text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  Resend OTP
                </button>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackToEmail}
                    disabled={isLoading}
                    className="flex-1 cursor-pointer bg-white/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => console.log("Back to Login")}
                    className="flex-1 cursor-pointer bg-white/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Login
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "resetPassword" && (
            <>
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-4 rounded-full">
                    <KeyRound className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Set New Password
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Create a new password for your account
                </p>
              </div>

              <form onSubmit={handlePasswordReset} className="space-y-5">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="relative flex items-center border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 rounded-xl focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all duration-300">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 rounded-xl focus-within:border-orange-500 dark:focus-within:border-orange-500 transition-all duration-300">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3"
                      required
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center group"
                >
                  {isLoading ? (
                    <>
                      <Loader className="mr-2 w-5 h-5 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    <>Reset Password</>
                  )}
                </button>
              </form>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("otp")}
                  disabled={isLoading}
                  className="flex-1 cursor-pointer bg-white/80 dark:bg-gray-700/50 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              </div>
            </>
          )}

          {step === "success" && (
            <>
              <div className="flex justify-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-full">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Password Reset Successful!
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your password has been reset successfully. You can now login with your new password.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full bg-gradient-to-r cursor-pointer from-orange-500 to-amber-500 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
