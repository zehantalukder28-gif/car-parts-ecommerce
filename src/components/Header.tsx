import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Phone, User, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import logo from '../assets/logo.png';

interface HeaderProps {
  isScrolled: boolean;
}

export default function Header({ isScrolled }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchFocused(false);
      searchInputRef.current?.blur();
    }
  };

  const liveResults = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navCategories = ['Brakes', 'Suspension', 'Engine', 'Wheels', 'Exhaust', 'Cooling'];

  return (
    <>
      {/* 1. TOP BAR — Slide-down entrance */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white border-b border-slate-200 py-1.5 px-4 hidden md:block"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-cyan-500" />
              1-800-AUTO-PARTS
            </span>
            <span>Free Shipping on Orders $199+</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/track" className="hover:text-slate-900 transition-colors duration-200">Track Order</Link>
            <Link to="/help" className="hover:text-slate-900 transition-colors duration-200">Help Center</Link>
            <Link to="/deals" className="text-cyan-600 font-bold hover:text-cyan-500 transition-colors duration-200">Today's Deals</Link>
          </div>
        </div>
      </motion.div>

      {/* 2. MAIN HEADER — with scroll-shrink and glow line */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-200'
        }`}
      >
        {/* Animated glow line at bottom on scroll */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.4) 30%, rgba(6,182,212,0.6) 50%, rgba(6,182,212,0.4) 70%, transparent 100%)',
          }}
        />

        <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>

          {/* Left: Menu + Logo */}
          <div className="flex-1 flex justify-start items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-slate-900 hover:text-cyan-600 transition-colors duration-200 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="group flex items-center gap-3 relative">
              {/* Logo glow pulse on hover */}
              <div className="absolute -inset-2 bg-cyan-500/0 group-hover:bg-cyan-500/10 rounded-full blur-xl transition-all duration-500" />
              <motion.img
                src={logo}
                alt="Logo"
                className={`object-contain relative z-10 transition-all duration-500 ${
                  isScrolled ? 'w-8 h-8' : 'w-10 h-10'
                }`}
                whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
              />
              <span className={`font-black text-slate-900 italic tracking-tighter hidden sm:block transition-all duration-500 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                APEXAUTO<span className="text-cyan-500">.</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav with animated underlines */}
          <nav className="flex-1 hidden lg:flex justify-center gap-1">
            <Link
              to="/products"
              className="relative px-5 py-2 text-sm font-bold text-slate-900 hover:text-cyan-600 uppercase tracking-widest transition-colors duration-200 group"
            >
              SHOP ALL
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-3/4 h-0.5 bg-cyan-500 transition-all duration-300 rounded-full" />
            </Link>
          </nav>

          {/* Right: Search + User + Cart */}
          <div className="flex-1 flex justify-end items-center gap-3 sm:gap-4">
            {/* Animated expanding search bar */}
            <div className="relative flex items-center justify-end h-10 w-24 md:w-32">
              <form
                onSubmit={handleSearch}
                className={`flex items-center rounded-full border transition-all duration-400 overflow-hidden ${
                  searchFocused
                    ? 'absolute right-0 bg-slate-50 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] z-50'
                    : 'w-full relative bg-slate-100 border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`bg-transparent text-slate-900 text-xs px-4 py-2 focus:outline-none transition-all duration-400 ${
                    searchFocused ? 'w-40 md:w-52' : 'w-24 md:w-32'
                  }`}
                />
                <button type="submit" className="text-slate-400 hover:text-cyan-600 pr-3 transition-colors duration-200">
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Live Search Dropdown */}
              <AnimatePresence>
                {searchFocused && searchQuery.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl z-40 overflow-hidden"
                  >
                    {liveResults.length > 0 ? (
                      <div className="flex flex-col">
                        {liveResults.map((product) => (
                          <div
                            key={product.id}
                            onMouseDown={() => {
                              navigate(`/product/${product.id}`);
                              setSearchQuery('');
                              setSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors last:border-0"
                          >
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md border border-slate-200" />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                              <p className="text-[10px] text-cyan-600 font-mono">${product.price.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <p className="text-xs text-neutral-400">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/account"
              className="text-slate-500 hover:text-cyan-600 transition-colors duration-200 hidden sm:block"
            >
              <User className="w-5 h-5" />
            </Link>

            <Link to="/cart" className="relative text-slate-900 hover:text-cyan-600 transition-colors duration-200 group">
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-4.5 h-4.5 bg-cyan-500 text-[9px] text-white rounded-full flex items-center justify-center font-black shadow-lg shadow-cyan-500/30"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* 3. MOBILE SIDEBAR — Glassmorphism + staggered link animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-r border-slate-200 p-8 flex flex-col"
            >
              {/* Close + Logo */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                  <span className="text-lg font-black text-slate-900 italic tracking-tighter">
                    APEXAUTO<span className="text-cyan-500">.</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Links — Staggered */}
              <div className="flex flex-col gap-1 flex-1">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <Link
                    to="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-900 font-bold text-lg hover:bg-cyan-50 hover:text-cyan-600 transition-all group"
                  >
                    Shop All
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </motion.div>

                <div className="h-px bg-slate-200 my-2" />

                {navCategories.map((cat, idx) => (
                  <motion.div
                    key={cat}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                  >
                    <Link
                      to={`/products?category=${cat.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all group"
                    >
                      {cat}
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-6 border-t border-slate-200 space-y-3"
              >
                <a href="tel:1-800-AUTO-PARTS" className="flex items-center gap-3 text-xs text-slate-500 hover:text-cyan-600 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-500" />
                  1-800-AUTO-PARTS
                </a>
                <p className="text-[10px] text-slate-500">Free Shipping on Orders $199+</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}