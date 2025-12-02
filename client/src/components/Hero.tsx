import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className="py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left space-y-8">
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium mb-4 animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>Now with AI-powered insights</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tighter">
            Take Control of Your{' '}
            <span className="bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
              Finances
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Effortlessly manage your money, track spending, and reach your financial goals
            with our intuitive web app powered by smart analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
            to={'/login'}
              className="cursor-pointer group bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-8 rounded-full text-lg inline-flex items-center justify-center shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#"
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-semibold py-4 px-8 rounded-full text-lg inline-flex items-center justify-center border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start space-x-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">$2M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Money Saved</div>
            </div>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -inset-4 bg-linear-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>

          <div className="relative bg-linear-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-800/40 backdrop-blur-xl rounded-3xl aspect-[4/3] flex items-center justify-center group cursor-pointer shadow-2xl border border-white/50 dark:border-gray-700/50 overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-amber-500/10"></div>

            <img
              src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Smart Budget Manager Dashboard Preview"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'opacity-40 scale-110' : 'opacity-20'
              }`}
            />

            <div
              className={`relative bg-white/30 dark:bg-black/30 p-8 rounded-full backdrop-blur-md border border-white/50 dark:border-white/20 transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
              }`}
            >
              <Play className="w-16 h-16 text-white fill-white drop-shadow-2xl" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/50 dark:border-gray-700/50 transform transition-all duration-500 translate-y-full group-hover:translate-y-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Savings</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$2,450</div>
                </div>
                <div className="text-green-500 text-sm font-semibold bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                  +23%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
