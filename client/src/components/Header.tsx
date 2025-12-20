import { useState, useEffect } from "react";
import { Wallet, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center py-4 md:py-6">
        <button className="flex items-center space-x-2 group cursor-pointer">
          <div className="relative">
            <Wallet className="w-8 h-8 text-orange-500 transform group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-orange-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Smart Budget Manager
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-full py-2 px-3 shadow-lg">
          <Link
            to="/"
            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700/60 rounded-full px-5 py-2 transition-all duration-300 font-medium"
          >
            Home
          </Link>
          {["Features", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700/60 rounded-full px-5 py-2 transition-all duration-300 font-medium"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            to={"/login"}
            className="cursor-pointer hidden sm:block bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-xl">
          <nav className="flex flex-col p-4 space-y-2">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800/60 rounded-lg px-4 py-3 transition-all duration-300 font-medium"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-2 text-left"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
