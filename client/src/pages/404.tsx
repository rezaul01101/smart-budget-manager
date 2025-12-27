
import { ArrowLeft,  } from 'lucide-react';
import { Link } from 'react-router';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans selection:bg-orange-500/30">
      {/* Header - Replicated from your design */}
   

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-75 h-75 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="z-10 text-center max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6">
            Error 404
          </div>
          
          <h1 className="text-7xl md:text-9xl font-extrabold mb-4 tracking-tighter">
            Lost in <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">Space?</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
            It seems this transaction doesn't exist. The page you're looking for might have been moved, deleted, or never existed in your budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           
            <Link to="/" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#161B28] hover:bg-[#1E2535] border border-gray-800 py-4 px-8 rounded-2xl font-semibold transition-all">
              <ArrowLeft size={20} />
              Go Back
            </Link>
          </div>
        </div>

        {/* Decorative Grid - Optional */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-size-[50px_50px] [background-image:linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]"></div>
      </main>

      {/* Footer minimal */}
      <footer className="py-10 text-center text-gray-500 text-sm border-t border-gray-900">
        © 2024 Smart Budget Manager. Keep your finances on track.
      </footer>
    </div>
  );
};

export default NotFoundPage;