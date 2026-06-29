import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Grid3X3, LayoutList, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [brandExpanded, setBrandExpanded] = useState(true);

  const brands = [...new Set(products.map(p => p.brand))];
  const maxProductPrice = Math.max(...products.map(p => p.price));

  // Track active filter count
  const activeFilterCount = (selectedBrands.length > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
    setActiveCategory('All');
    setSortBy('featured');
  };

  // SEARCH AND FILTER LOGIC
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    
    // 1. Search Query Filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) || 
        p.category.toLowerCase().includes(searchQuery)
      );
    }
    
    // 2. Category Filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }
    
    // 3. Brand Filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // 4. Price Filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // 5. Sorting
    if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
    
    return filtered;
  }, [activeCategory, selectedBrands, priceRange, sortBy, searchParams]);

  /* ── Filter Sidebar Content (reused for desktop & mobile) ── */
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setPriceExpanded(!priceExpanded)}
          className="w-full flex items-center justify-between p-4 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <span>Price Range</span>
          {priceExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        <AnimatePresence>
          {priceExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-cyan-700 font-mono font-bold">
                    ${priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-slate-500">to</span>
                  <span className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-cyan-700 font-mono font-bold">
                    ${priceRange[1].toLocaleString()}
                  </span>
                </div>

                {/* Min slider */}
                <div>
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Min Price</label>
                  <input
                    type="range"
                    min={0}
                    max={maxProductPrice}
                    step={50}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val < priceRange[1]) setPriceRange([val, priceRange[1]]);
                    }}
                    className="w-full mt-1"
                  />
                </div>

                {/* Max slider */}
                <div>
                  <label className="text-[10px] text-neutral-500 uppercase tracking-wider font-medium">Max Price</label>
                  <input
                    type="range"
                    min={0}
                    max={maxProductPrice}
                    step={50}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val > priceRange[0]) setPriceRange([priceRange[0], val]);
                    }}
                    className="w-full mt-1"
                  />
                </div>

                {/* Quick Price Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Under $500', range: [0, 500] as [number, number] },
                    { label: '$500–$2K', range: [500, 2000] as [number, number] },
                    { label: '$2K–$5K', range: [2000, 5000] as [number, number] },
                    { label: 'All', range: [0, 10000] as [number, number] },
                  ].map(preset => (
                    <button
                      key={preset.label}
                      onClick={() => setPriceRange(preset.range)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Brand Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setBrandExpanded(!brandExpanded)}
          className="w-full flex items-center justify-between p-4 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <span>Brand</span>
          <div className="flex items-center gap-2">
            {selectedBrands.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 bg-cyan-50 text-cyan-700 rounded-md font-bold">
                {selectedBrands.length}
              </span>
            )}
            {brandExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
          </div>
        </button>
        <AnimatePresence>
          {brandExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-1">
                {brands.map(brand => {
                  const count = products.filter(p => p.brand === brand).length;
                  const isSelected = selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all group ${
                        isSelected
                          ? 'bg-cyan-50 border border-cyan-200 text-slate-900'
                          : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-cyan-500 border-cyan-500'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}>
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{brand}</span>
                      </div>
                      <span className={`text-xs font-mono ${isSelected ? 'text-cyan-600' : 'text-slate-400'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear All */}
      {activeFilterCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={clearAllFilters}
          className="w-full py-3 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 bg-white text-sm font-medium transition-all shadow-sm"
        >
          Clear All Filters
        </motion.button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-2">Performance<span className="text-cyan-500">.</span></h1>
            <p className="text-slate-500 font-medium">BROWSE OUR EXCLUSIVE INVENTORY OF COMPONENTS</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', ...categories.map(c => c.name)].map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl flex flex-wrap items-center justify-between border border-slate-200 gap-4 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                filtersOpen
                  ? 'bg-cyan-50 border-cyan-200 text-cyan-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-cyan-500 text-white text-[10px] rounded-full flex items-center justify-center font-black">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none hover:border-slate-300 text-slate-900 transition-colors"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Results count */}
            <span className="text-xs text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> of {products.length} products
            </span>
          </div>

          <div className="flex bg-white p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Filter Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">

          {/* Desktop Filter Sidebar */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="hidden lg:block shrink-0 overflow-hidden"
              >
                <div className="w-[280px] sticky top-24">
                  <FilterContent />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <LayoutGroup>
              <motion.div layout className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
            
            {/* IMPROVED EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">No products found</h2>
                <p className="text-slate-500 mb-8">Try adjusting your search terms or filters.</p>
                <button 
                  onClick={() => {
                    clearAllFilters();
                    navigate('/products');
                  }} 
                  className="px-6 py-2 bg-cyan-500 text-white font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                >
                  Clear Search & Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl border-r border-slate-200 p-6 flex flex-col lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <FilterContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}