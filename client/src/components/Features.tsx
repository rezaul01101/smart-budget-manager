import {
  PieChart,
  TrendingUp,
  Target,
  BarChart3,
  Shield,
  Zap,
  Bell,
  Smartphone,
} from 'lucide-react';

const features = [
  {
    icon: PieChart,
    title: 'Smart Budgeting',
    description: 'Create budgets that work for you and track your progress in real-time.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: TrendingUp,
    title: 'Expense Tracking',
    description: 'Automatically categorize transactions to see where your money goes.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Target,
    title: 'Goal Setting',
    description: 'Set and track financial goals, from saving for a vacation to a down payment.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: BarChart3,
    title: 'Financial Reports',
    description: 'Get detailed reports and insights to make smarter financial decisions.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and protected with industry-leading security.',
    color: 'from-red-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Instant Sync',
    description: 'Real-time synchronization across all your devices and platforms.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified about unusual spending, bills, and budget limits.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Access your finances anywhere with our responsive design.',
    color: 'from-teal-500 to-green-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
          <span>Features</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
          Everything You Need
        </h2>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover the powerful tools that will help you master your money and build a brighter
          financial future.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-amber-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div
                  className={`inline-flex p-4 bg-linear-to-br ${feature.color} rounded-xl mb-5 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-orange-500 dark:text-orange-400 font-medium text-sm inline-flex items-center">
                    Learn more
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <a
          href="#"
          className="inline-flex items-center bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-105"
        >
          Explore All Features
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
