import { Users, Award, Globe, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Happy Customers', value: '50,000+' },
  { icon: Award, label: 'Industry Awards', value: '15+' },
  { icon: Globe, label: 'Countries', value: '120+' },
  { icon: TrendingUp, label: 'Growth Rate', value: '300%' },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
            <span>About Us</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            Building Your Financial Future
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We are a team of financial experts and tech enthusiasts dedicated to making money
            management simple and accessible for everyone. Our mission is to empower you with the
            tools and knowledge to achieve financial freedom.
          </p>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            With cutting-edge technology and user-centric design, we've helped thousands of people
            take control of their finances and build the life they deserve. Join us on this journey
            to a more secure future.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <Icon className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="pt-4">
            <a
              href="#"
              className="inline-flex items-center text-orange-500 dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors group"
            >
              Learn more about our story
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
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
        </div>

        <div className="order-1 md:order-2 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-2xl"></div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 dark:border-gray-700/50 transform transition-all duration-500 hover:scale-[1.02]">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Diverse team collaborating in modern office"
              className="w-full h-auto object-cover aspect-[4/3]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 border-2 border-white dark:border-gray-900"
                      ></div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      Trusted by 50,000+ users
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Join our growing community
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
