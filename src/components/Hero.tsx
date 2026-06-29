import { motion } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Star } from 'lucide-react';

export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden bg-neutral-950">
        
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611821064430-0d4022026859?q=80&w=2070&auto=format&fit=crop")' }} // Replace with your car image
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-transparent z-10" />

        {/* Main Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 mt-[-10vh]">
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950" />
              <div className="w-8 h-8 rounded-full bg-neutral-600 border-2 border-neutral-950" />
              <div className="w-8 h-8 rounded-full bg-neutral-500 border-2 border-neutral-950" />
            </div>
            <div className="flex text-cyan-400 ml-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-neutral-300 text-sm font-medium">Trusted by 50K+ enthusiasts</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 uppercase"
          >
            Precision <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Performance
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10"
          >
            Transform your ride with top-tier automotive parts. Expert support, fast shipping, and unbeatable prices on the brands you trust.
          </motion.p>
        </div>
      </div>

      {/* Floating Horizontal Vehicle Selector */}
      <div className="relative z-30 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-4"
        >
          <div className="shrink-0 mr-4 hidden md:block">
            <h3 className="text-white font-bold text-lg">Find Parts</h3>
            <p className="text-cyan-500 text-xs uppercase tracking-wider">Select Vehicle</p>
          </div>
          
          <div className="w-full flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-neutral-950 border border-neutral-800 text-white py-3 px-4 rounded-xl focus:border-cyan-500 outline-none text-sm cursor-pointer">
                <option>Select Make</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-neutral-950 border border-neutral-800 text-white py-3 px-4 rounded-xl focus:border-cyan-500 outline-none text-sm cursor-pointer">
                <option>Select Model</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-neutral-950 border border-neutral-800 text-white py-3 px-4 rounded-xl focus:border-cyan-500 outline-none text-sm cursor-pointer">
                <option>Select Year</option>
              </select>
              <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shrink-0">
            <Search className="w-4 h-4" />
            Search
          </button>
        </motion.div>
      </div>

      {/* Live Chat Floating Action Button */}
      <button className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-neutral-950 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center transition-transform hover:scale-110 group">
        <MessageCircle className="w-6 h-6" />
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-800">
          Chat with an Expert
        </span>
      </button>
    </>
  );
}