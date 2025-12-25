import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SuccessComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center space-y-4 py-8">
      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Account Created!
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-sm">
        Your account has been successfully created. You’ll be redirected to the
        login page shortly.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="cursor-pointer mt-4 bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-orange-500/40 transition-all"
      >
        Go to Login
      </button>
    </div>
  );
};

export default SuccessComponent;
