import { Wallet, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Cookie Policy', 'Licenses'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'Github' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700/50 mt-20 pt-16 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
        <div className="col-span-2">
          <div className="flex items-center space-x-2 mb-4 group cursor-pointer">
            <div className="relative">
              <Wallet className="w-8 h-8 text-orange-500 transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-orange-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              FinTrack
            </span>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            Empowering individuals to take control of their financial future with smart, intuitive
            tools.
          </p>

          <div className="flex space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-500 dark:hover:border-orange-500 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{category}</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-200 dark:border-gray-700/50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FinTrack. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </a>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
