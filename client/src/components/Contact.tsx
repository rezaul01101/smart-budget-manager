import { useState } from 'react';
import { Send, Mail, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isFocused, setIsFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium">
          <span>Contact</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
          Get In Touch
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Send us a message and we'll
          respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('name')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Jane Doe"
                  className={`w-full rounded-xl border-2 ${
                    isFocused === 'name'
                      ? 'border-orange-500 dark:border-orange-500'
                      : 'border-gray-200 dark:border-gray-700'
                  } bg-white/50 dark:bg-gray-700/50 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-3 px-4 transition-all duration-300`}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="jane.doe@example.com"
                  className={`w-full rounded-xl border-2 ${
                    isFocused === 'email'
                      ? 'border-orange-500 dark:border-orange-500'
                      : 'border-gray-200 dark:border-gray-700'
                  } bg-white/50 dark:bg-gray-700/50 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-3 px-4 transition-all duration-300`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setIsFocused('message')}
                onBlur={() => setIsFocused(null)}
                placeholder="Tell us how we can help you..."
                rows={5}
                className={`w-full rounded-xl border-2 ${
                  isFocused === 'message'
                    ? 'border-orange-500 dark:border-orange-500'
                    : 'border-gray-200 dark:border-gray-700'
                } bg-white/50 dark:bg-gray-700/50 focus:ring-0 focus:outline-none text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 py-3 px-4 transition-all duration-300 resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 transform hover:scale-[1.02] inline-flex items-center justify-center group"
            >
              Send Message
              <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl group">
            <div className="bg-linear-to-br from-orange-500 to-amber-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
            <a
              href="mailto:hello@Smart Budget Manager.com"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              hello@Smart Budget Manager.com
            </a>
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl group">
            <div className="bg-linear-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
            <a
              href="tel:+1234567890"
              className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
            >
              +1 (234) 567-890
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
