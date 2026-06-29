import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Check, Truck, Shield, RotateCcw, Minus, Plus, Cpu, Activity, Gauge } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'compatibility'>('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-900 font-mono space-y-4 px-4 text-center">
        <div className="text-2xl font-black text-red-500 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
          _ERROR: COMPONENT_NOT_FOUND
        </div>
        <p className="text-slate-500 max-w-md">The requested specification data could not be retrieved from our telemetry servers.</p>
        <Link to="/products" className="mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-md">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 text-slate-900 relative overflow-hidden">
      {/* High-Tech Background Ambient Light Grid */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Dynamic Product Info Header / Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-cyan-600 transition-colors">Core</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link to="/products" className="hover:text-cyan-600 transition-colors">Catalog</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-500 select-none">ID: {product.id}</span>
        </div>

        {/* 1. ASYMMETRIC SPEC DASHBOARD GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT COLUMN: NEON HORIZON FRAME (Takes 5 Columns) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="relative rounded-3xl p-3 bg-white backdrop-blur-md border border-slate-200 group hover:border-cyan-500/30 transition-all duration-500 shadow-sm"
            >
              {/* Laser Line Accents */}
              <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
              
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=800'; }}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Quick Diagnostic Data Strip below Image */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between font-mono text-[10px] text-slate-500 shadow-sm">
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-600" />
                <span>INTEGRITY: 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                <span>SPEC: FACTORY_PASSED</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CORE TECH SPEC SHEET (Takes 7 Columns) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <span className="inline-block text-xs font-black tracking-widest text-cyan-700 uppercase bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-md mb-4">
                {product.brand} ENGINE TIER
              </span>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                {product.name}
              </h1>
            </div>

            {/* Price & Telemetry Stamps Grid Row */}
            <div className="grid sm:grid-cols-3 gap-4 border-y border-slate-200 py-6 items-center">
              <div className="sm:col-span-1">
                <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">MSRP VALUATION</span>
                <div className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 tracking-tight">
                  ${product.price.toLocaleString()}
                </div>
              </div>
              
              <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <Gauge className="w-4 h-4 text-cyan-600" />
                <div>
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">SYS_RATING</span>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                    {product.rating} / 5.0 
                    <div className="flex text-cyan-500">
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                <Activity className="w-4 h-4 text-cyan-600" />
                <div>
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">LOGGED_FEEDBACK</span>
                  <span className="text-xs font-bold text-slate-900 block mt-0.5">{product.reviews} Entries</span>
                </div>
              </div>
            </div>

            {/* Core Overview Description */}
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              {product.description}
            </p>

            {/* Dynamic Interactive Order Interface Configuration */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-1 shrink-0">
                <button 
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                  className="p-3 text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono font-bold text-sm text-slate-900">{quantity}</span>
                <button 
                  type="button"
                  onClick={() => setQuantity(quantity + 1)} 
                  className="p-3 text-slate-500 hover:text-cyan-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                type="button"
                onClick={() => { for(let i=0; i<quantity; i++) addToCart(product); }}
                className="flex-1 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 text-sm uppercase tracking-wider"
              >
                Commit Order Initialization
              </button>
            </div>

            {/* Glassmorphic Technical Parameters Tabs */}
            <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
              <div className="flex bg-slate-50 border-b border-slate-200 p-1 gap-1">
                {(['description', 'specs', 'compatibility'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 font-mono text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                      activeTab === tab 
                        ? 'bg-white text-cyan-700 border border-slate-200 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-6 min-h-32 text-xs text-slate-600 leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeTab === 'description' && (
                      <p>{product.description} Engineered with premium alloys to support extreme thermostatic changes inside racing system frameworks.</p>
                    )}
                    {activeTab === 'specs' && (
                      <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
                        <div className="border-b border-slate-200 pb-2"><span className="text-slate-500">COMPONENT_ID:</span> <span className="text-slate-900">SYS-{product.id}0X</span></div>
                        <div className="border-b border-slate-200 pb-2"><span className="text-slate-500">BRAND_INDEX:</span> <span className="text-slate-900">{product.brand}</span></div>
                        <div className="border-b border-slate-200 pb-2"><span className="text-slate-500">CATEGORY_CLASS:</span> <span className="text-slate-900">{product.category}</span></div>
                        <div className="border-b border-slate-200 pb-2"><span className="text-slate-500">CALIBRATION:</span> <span className="text-slate-900">READY</span></div>
                      </div>
                    )}
                    {activeTab === 'compatibility' && (
                      <div className="space-y-2">
                        <p className="text-slate-500 font-mono text-[11px]">&gt; COMPATIBLE WITH VEHICLES DETECTED IN LOGS:</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {['BMW M4 Coupe', 'Porsche 911 GT3', 'Audi RS6 Avant', 'Toyota Supra MK5'].map((car) => (
                            <span key={car} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-slate-900 font-mono text-[10px] uppercase">
                              {car}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* High-End Logistics Logistics Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
              {[ 
                { icon: Truck, label: 'Express Carrier', desc: 'Free over $199' }, 
                { icon: Shield, label: 'Tech Warranty', desc: '12 Month Integrity' }, 
                { icon: RotateCcw, label: 'Secure Returns', desc: '30-Day Window' } 
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-10 h-10 bg-white border border-slate-200 group-hover:border-cyan-500/30 rounded-xl flex items-center justify-center mb-3 transition-colors shadow-sm">
                    <item.icon className="w-5 h-5 text-cyan-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider block mb-0.5">{item.label}</span>
                  <span className="text-[10px] text-slate-500 block">{item.desc}</span>
                </div>
              ))}
            </div>

          </motion.div>
        </div>

        {/* 2. DYNAMIC RELATED PRODUCTS SECTION */}
        <div className="mt-24 border-t border-slate-200 pt-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
                Related <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Components</span>
              </h2>
              <p className="text-slate-500 text-xs font-mono mt-1">&gt; CROSS-REFERENCING ALTERNATIVE SYSTEM TIERS</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}