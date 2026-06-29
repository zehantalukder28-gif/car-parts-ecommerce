import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Award, Star, Quote, ChevronRight, Percent, Package, MessageCircle, X, Send, Disc, Gauge } from 'lucide-react';
import VehicleSearch from '../components/VehicleSearch';
import ProductCard from '../components/ProductCard';
import { products, categories, reviews } from '../data/products';

/* USING YOUR LOCAL ASSETS */
import carImage from '../assets/car.png';
import heroBgImage from '../assets/hero-bg.jpg'; 

export default function HomePage() {
  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const [chatOpen, setChatOpen] = useState(false);
  
  // ADD THIS EXACT LINE HERE TO FIX THE CHAT INPUT COMPILER ERROR
  const [activePerk, setActivePerk] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveAgent, setIsLiveAgent] = useState(false);

  // Auto-replies system for standard troubleshooting
  const triggerAutoReply = (question: string, answer: string) => {
    if (isTyping) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text: question }]);
    setIsTyping(true);
    
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
      setIsTyping(false);
    }, 750);
  };

  // Manual messages processing
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userText = chatInput.replace(/<[^>]*>/g, '');
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm sorry, I couldn't find a direct fix for that specific performance metric. Would you like to connect to a live engineer?";
      
      if (isLiveAgent) {
        botResponse = "All engineers are currently assisting with performance setups. Your diagnostic request is queued.";
      }

      setChatMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  // Parallax setup for the Hero Section
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen bg-white text-slate-900 relative">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section ref={targetRef} className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-visible bg-neutral-950 pt-32 pb-40">
        
        {/* Background Layer: Real Car Driving Video */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
          <div className="absolute inset-0 bg-neutral-950/70 z-10 pointer-events-none" />
          <iframe 
            src="https://www.youtube.com/embed/WSYDXlGVlhg?autoplay=1&mute=1&loop=1&playlist=WSYDXlGVlhg&controls=0&showinfo=0&modestbranding=1&disablekb=1&playsinline=1"
            className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[1920px] min-h-[1080px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-60"
            allow="autoplay; encrypted-media"
          />
        </div>





        {/* Floating HUD Car Parts - Right (Performance Gauge) */}
        <motion.div 
          className="absolute right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block opacity-30 mix-blend-screen"
          animate={{ rotate: -360, y: [20, -20, 20] }}
          transition={{ rotate: { duration: 30, ease: "linear", repeat: Infinity }, y: { duration: 7, ease: "easeInOut", repeat: Infinity } }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-blue-500 rounded-full opacity-20"></div>
            <Gauge className="w-96 h-96 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" strokeWidth={0.5} />
          </div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px]" />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center mt-[-40px]">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/40 border border-blue-800 rounded-full text-blue-400 text-sm font-semibold mb-8 backdrop-blur-sm"
          >
            <span>New Arrivals — Up to 30% Off</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-black tracking-tighter uppercase mb-6 leading-[0.85] text-white"
          >
            Precision <br />
            <span className="metallic-shimmer drop-shadow-[0_2px_15px_rgba(37,99,235,0.3)]">
              Performance
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-base sm:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed"
          >
            Transform your ride with top-tier automotive parts. Expert support, fast shipping, and unbeatable prices on the brands you trust.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-14"
          >
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(37,99,235,0.2)] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/products?sale=true"
              className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white font-semibold rounded-xl border border-neutral-800 transition-all hover:border-blue-500/50 backdrop-blur-md"
            >
              <Percent className="w-5 h-5 text-blue-500" />
              View Deals
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 border-t border-neutral-800 pt-6"
          >
            <div className="flex -space-x-3">
              <img src="https://i.pravatar.cc/100?img=11" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover" />
              <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover" />
              <img src="https://i.pravatar.cc/100?img=15" className="w-10 h-10 rounded-full border-2 border-neutral-900 object-cover" />
            </div>
            <div className="text-center sm:text-left">
              <span className="text-white text-sm font-bold block">50K+ Happy Customers</span>
              <div className="flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-blue-500 fill-current" />)}
                <span className="text-neutral-400 text-xs font-medium ml-1">4.9/5 Average</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Vehicle Search Bar */}
        <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-40 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            <VehicleSearch />
          </motion.div>
        </div>
      </section>

      {/* 3. BRAND TICKER MARQUEE */}
      <section className="pt-28 pb-6 overflow-hidden border-y border-slate-200 bg-slate-50/50">
        <div className="relative">
          <div className="brand-ticker">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex items-center shrink-0">
                {['BREMBO', 'BILSTEIN', 'AKRAPOVIČ', 'VORTECH', 'RAYS', 'KW', 'APR', 'MISHIMOTO', 'BREMBO', 'BILSTEIN', 'AKRAPOVIČ', 'VORTECH', 'RAYS', 'KW', 'APR', 'MISHIMOTO'].map((brand, idx) => (
                  <span key={`${setIdx}-${idx}`} className="flex items-center gap-6 px-6">
                    <span className="text-sm sm:text-base font-black tracking-[0.2em] text-slate-300 hover:text-cyan-600/60 transition-colors duration-300 whitespace-nowrap uppercase">{brand}</span>
                    <span className="text-cyan-500/30 text-lg">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SECTION - DYNAMIC HORIZONTAL SCROLL CAROUSEL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Precision Systems</h2>
              <p className="text-slate-500 text-sm mt-2">Engineered powertrain and chassis components.</p>
            </div>
            {/* Custom Horizontal Navigation Interaction Targets */}
            <div className="flex gap-2">
              <button 
                onClick={() => document.getElementById('carousel-track')?.scrollBy({ left: -320, behavior: 'smooth' })}
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 rounded-xl flex items-center justify-center transition-colors font-mono text-sm"
              >
                &lt;
              </button>
              <button 
                onClick={() => document.getElementById('carousel-track')?.scrollBy({ left: 320, behavior: 'smooth' })}
                className="w-10 h-10 bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 rounded-xl flex items-center justify-center transition-colors font-mono text-sm"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Clean overflow scroll boundary track container */}
          <div 
            id="carousel-track"
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 pr-12 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((category) => (
              <div key={category.name} className="w-70 sm:w-[320px] shrink-0 snap-start">
                <Link
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative block overflow-hidden rounded-2xl aspect-3/4 bg-slate-100 border border-slate-200 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-1 tracking-tight">{category.name}</h3>
                    <p className="text-xs text-slate-300 font-mono">{category.count} SPEC COMPONENTS</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. DYNAMIC CAR IMPRESSION */}
      <section className="relative w-full py-24 overflow-hidden bg-slate-50 border-y border-slate-200 my-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-cyan-500/10 blur-[120px] rounded-full z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/3 mb-10 md:mb-0 z-20">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              Precision <span className="text-cyan-600">Engineered</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-slate-600 text-lg leading-relaxed"
            >
              Our parts don't just fit. They perform. Experience the difference of true automotive excellence with precision dynamics.
            </motion.p>
          </div>
          <div className="md:w-2/3 relative w-full flex items-center justify-end">
            <div className="absolute bottom-4 left-10 right-0 h-1 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent blur-sm" />
            <motion.img
              src={carImage} 
              alt="Performance Sports Car"
              className="relative z-10 w-full max-w-xl h-auto object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.5)]"
              initial={{ x: 250, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ type: "spring", stiffness: 45, damping: 15 }}
            />
          </div>
        </div>
      </section>

      {/* 5. PROMO EVENT */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="rotating-border-container shadow-2xl"
          >
            {/* The rotating gradient line */}
            <div className="rotating-border-glow" />

            {/* The actual content box */}
            <div className="rotating-border-content p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-[60px] z-0" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] z-0" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-4">
                    <Clock className="w-4 h-4" /> Limited Time Event
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">Summer Performance Sale</h3>
                  <p className="text-slate-300 text-lg">Use code <span className="text-cyan-600 font-mono bg-slate-100 border border-slate-200 px-2 py-1 rounded">SUMMER40</span> at checkout.</p>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
                  <Link to="/products?sale=true" className="relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-colors block">
                    Access Deals
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        {/* ADDED WRAPPER MATRIX FOR EQUAL LAYOUT SCALING & ZOOM ALIGNMENT */}
        <div className="max-w-7xl mx-auto">
          
          {/* RESTORED AND BALANCED CONTENT HEADING */}
          <div className="flex items-center justify-between mb-10 border-b border-slate-200 pb-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter sm:text-5xl">
                Best <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Sellers</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">Top-rated configurations built by real drivers.</p>
            </div>
            <Link to="/products?sort=bestselling" className="hidden md:inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 transition-colors text-sm">
              View All Catalog <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ASYMMETRIC GRID SYSTEM CONTAINER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, index) => (
              <div 
                key={product.id}
                className={`transition-all duration-500 hover:-translate-y-2 group relative rounded-2xl border border-slate-200 bg-white hover:border-cyan-500/30 p-2 shadow-xl hover:shadow-[0_20px_40px_rgba(6,182,212,0.08)] ${
                  index % 2 === 1 ? 'lg:translate-y-6' : ''
                }`}
              >
                {/* Decorative High-Tech Grid Corner Line */}
                <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. ASYMMETRIC BENTO TRUST PERKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Header Title with premium badge & gradient */}
          <div className="mb-14 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-3 select-none">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
              Performance Assurance
            </div>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter sm:text-5xl">
              The ApexAuto <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600">Standard</span>
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Uncompromising quality and speed in every transaction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {/* Large Feature Card: Express Logistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 bg-white border border-slate-200/80 rounded-3xl p-10 relative overflow-hidden group hover:border-cyan-500/40 hover:-translate-y-1.5 transition-all duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.06)] flex flex-col justify-between"
            >
              {/* Radial gradient background hover glow */}
              <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 w-[350px] h-[350px] bg-radial from-cyan-400/10 to-transparent rounded-full blur-3xl opacity-60 group-hover:opacity-100 group-hover:from-cyan-400/15 transition-all duration-500" />
              
              {/* High-tech grid overlay in background */}
              <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none" 
                   style={{ 
                     backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', 
                     backgroundSize: '24px 24px' 
                   }} 
              />
              
              {/* Technical Code telemetry badge */}
              <div className="absolute top-8 right-10 font-mono text-[9px] text-slate-400/80 tracking-widest uppercase pointer-events-none select-none flex items-center gap-2">
                <span>[ STATUS: ACTIVE_LOGISTICS ]</span>
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              </div>

              <div>
                <div className="w-16 h-16 bg-linear-to-tr from-cyan-50 to-blue-50/50 border border-cyan-100/80 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-105 group-hover:border-cyan-200 transition-all duration-300">
                  <Truck className="w-8 h-8 text-cyan-600 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">Express Logistics</h3>
                <p className="text-slate-500 text-lg max-w-lg leading-relaxed">
                  Free priority shipping on all orders over <span className="text-cyan-600 font-bold">$199</span>. Our global distribution network ensures your parts arrive before race day.
                </p>
              </div>

              {/* Bottom status line */}
              <div className="pt-6 border-t border-slate-100 font-mono text-[10px] text-slate-400 flex items-center gap-4">
                <span className="flex items-center gap-1"><span className="text-cyan-500">✔</span> Priority Processing</span>
                <span className="flex items-center gap-1"><span className="text-cyan-500">✔</span> Real-time Telemetry Tracking</span>
              </div>
            </motion.div>

            {/* Small Top Card: Secure Checkout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 relative overflow-hidden group hover:border-blue-500/40 hover:-translate-y-1.5 transition-all duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.06)] flex flex-col justify-between"
            >
              {/* Radial gradient background hover glow */}
              <div className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 w-[250px] h-[250px] bg-radial from-blue-400/10 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-100 group-hover:from-blue-400/15 transition-all duration-500" />

              {/* Holographic background icon */}
              <div className="absolute bottom-6 right-6 text-slate-100 group-hover:text-blue-500/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out pointer-events-none">
                <Shield className="w-28 h-28 stroke-[0.75]" />
              </div>

              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-linear-to-tr from-blue-50 to-indigo-50/50 border border-blue-100/80 rounded-xl flex items-center justify-center shadow-xs group-hover:border-blue-200 transition-all duration-300">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-mono text-[8px] text-slate-400 tracking-wider bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded uppercase">[ TLS_1.3_SECURE ]</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10 uppercase tracking-tight">Secure Checkout</h3>
                <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Military-grade encrypted transaction network protecting your payment credentials.</p>
              </div>
            </motion.div>

            {/* Small Bottom Card: Expert Engineering */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200/80 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/40 hover:-translate-y-1.5 transition-all duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)] flex flex-col justify-between"
            >
              {/* Radial gradient background hover glow */}
              <div className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/3 w-[250px] h-[250px] bg-radial from-amber-400/10 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-100 group-hover:from-amber-400/15 transition-all duration-500" />

              {/* Holographic background icon */}
              <div className="absolute bottom-6 right-6 text-slate-100 group-hover:text-amber-500/5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out pointer-events-none">
                <Award className="w-28 h-28 stroke-[0.75]" />
              </div>

              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-linear-to-tr from-amber-50 to-orange-50/50 border border-amber-100/80 rounded-xl flex items-center justify-center shadow-xs group-hover:border-amber-200 transition-all duration-300">
                  <Award className="w-6 h-6 text-amber-600" />
                </div>
                <span className="font-mono text-[8px] text-slate-400 tracking-wider bg-slate-100 border border-slate-200/60 px-1.5 py-0.5 rounded uppercase">[ ENG_SUPPORT_24x7 ]</span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10 uppercase tracking-tight">Expert Engineering</h3>
                <p className="text-sm text-slate-500 relative z-10 leading-relaxed">Certified diagnostic support technicians available 24/7 for custom track builds.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. NEW ARRIVALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">New Arrivals</h2>
              <p className="text-slate-500 mt-1">The latest additions to our catalog</p>
            </div>
            <Link to="/products?sort=newest" className="hidden md:inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 transition-colors">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
      

      {/* 9. REVIEWS - HIGH CONTRAST STRUCTURAL LAYOUT */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 border-t border-slate-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Header Column - Freeing up the layout box */}
            <div className="lg:sticky lg:top-28 space-y-4">
              <span className="text-xs font-black tracking-widest text-cyan-700 uppercase bg-cyan-50 border border-cyan-200 px-3 py-1.5 rounded-full">Telemetry Log</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Driver <br />Verified.</h2>
              <p className="text-slate-600 text-sm max-w-xs leading-relaxed">Real performance metrics and tracking diagnostics logged directly by automotive enthusiasts.</p>
            </div>

            {/* Right Review Cards Grid (Asymmetrical Layout) */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-linear-to-br from-white to-slate-50 border border-slate-200 p-8 rounded-2xl relative group hover:border-cyan-500/20 transition-all duration-300 ${
                    index === 1 ? 'sm:translate-y-6' : ''
                  }`}
                >
                  <Quote className="w-8 h-8 text-slate-200 group-hover:text-cyan-500/20 transition-colors mb-4" />
                  <p className="text-slate-700 text-sm mb-6 font-medium leading-relaxed">"{review.text}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                      <div className="text-[11px] text-cyan-500 font-mono">{review.date}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 10. CTA UPGRADE SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 md:p-16 shadow-sm">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-cyan-500/5 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Ready to Upgrade Your Ride?</h2>
              <p className="text-slate-600 text-lg mb-10">Join thousands of satisfied customers who trust ApexAuto for their performance needs.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/25"><Package className="w-5 h-5" /> Browse All Parts</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

     {/* 11. INTERACTIVE LIVE CHAT EMBED */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="w-85 h-115 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4"
            >
              {/* Header Container */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isLiveAgent ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500 animate-pulse'}`} />
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      {isLiveAgent ? 'Live Tech Engineer' : 'ApexAuto Assistant'}
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {isLiveAgent ? 'Connected to Support Network' : 'Automated Troubleshooting'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="w-4 h-4" /></button>
              </div>

              {/* Message History Feed */}
              <div className="flex-1 p-4 overflow-y-auto text-xs space-y-3 flex flex-col">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl max-w-[85%] text-slate-700 self-start">
                  Welcome to ApexAuto Support! Pick an option below or describe your custom performance issue.
                </div>

                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl max-w-[85%] border ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-50 border-cyan-200 text-slate-900 self-end' 
                        : 'bg-white border-slate-200 text-slate-700 self-start shadow-sm'
                    }`}
                  >
                    {msg.text}
                    
                    {/* Live chat alternative bridge action block */}
                    {msg.text.includes("connect to a live engineer?") && !isLiveAgent && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsLiveAgent(true);
                          setChatMessages((prev) => [...prev, { sender: 'bot', text: "Routing session to live engineering queue... Please stand by." }]);
                        }}
                        className="mt-2 block w-full text-center bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-1.5 rounded-lg transition-colors text-[10px]"
                      >
                        Connect to Live Chat
                      </button>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="text-slate-500 italic text-[10px] self-start ml-1 animate-pulse">Processing data...</div>
                )}
              </div>

              {/* Preset Troubleshooting Buttons */}
              {!isLiveAgent && (
                <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {[
                    { q: "🔍 Part Fitment Check", a: "To verify fitment parameters, please use our vehicle selector widget on the homepage. For non-standard engine blocks, email details to support@apexauto.com." },
                    { q: "📦 Tracking Status", a: "Orders drop within 24 hours. A confirmation payload with link strings is systematically dispatched directly to your contact address info on file." },
                    { q: "🔧 Performance Error Code", a: "If an automated fault fires after assembly, isolate structural connectors. Disconnecting battery ground for 15 minutes clears system caching conflicts." }
                  ].map((faq) => (
                    <button
                      key={faq.q}
                      type="button"
                      onClick={() => triggerAutoReply(faq.q, faq.a)}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-cyan-600 text-[10px] px-2.5 py-1 rounded-full transition-colors text-left shadow-sm"
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Form Fields */}
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={isLiveAgent ? "Message live technician..." : "Type a custom message..."} 
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-cyan-500 shadow-sm" 
                />
                <button type="submit" className="bg-cyan-500 p-2 rounded-xl text-white hover:bg-cyan-400 transition-colors shadow-sm">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full shadow-[0_4px_20px_rgba(6,182,212,0.4)] flex items-center justify-center transition-transform hover:scale-105"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

    </div>
  );
}