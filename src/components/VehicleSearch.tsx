import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Replaced window navigation
import { Search, ChevronDown, Car } from 'lucide-react';
import { vehicleMakes, vehicleModels, years } from '../data/products';

export default function VehicleSearch() {
  const navigate = useNavigate(); // Hook handles state-safe routing
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [isOpen, setIsOpen] = useState<string | null>(null);

  const models = make ? vehicleModels[make] || [] : [];

  const handleSearch = () => {
    if (make && model && year) {
      // FIXED: Uses client-side router memory instead of breaking the window stream
      navigate(`/products?make=${make.toLowerCase()}&model=${model.toLowerCase()}&year=${year}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/50"
    >
      <div className="flex items-center gap-3 mb-6">
        {/* FIXED THEME: Red badge box -> High contrast Cyan framing */}
        <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Find Parts For Your Vehicle</h3>
          <p className="text-xs text-slate-500">Select parameters to isolate compatible components</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Make Select */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(isOpen === 'make' ? null : 'make')}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-left flex items-center justify-between text-slate-900 hover:border-cyan-500/40 transition-colors text-sm"
          >
            <span className={make ? 'text-slate-900 font-medium' : 'text-slate-400'}>
              {make || 'Select Make'}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen === 'make' ? 'rotate-180 text-cyan-500' : ''}`} />
          </button>
          {isOpen === 'make' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/50 z-40 max-h-60 overflow-y-auto p-1.5"
            >
              {vehicleMakes.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMake(m);
                    setModel('');
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-600 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {m}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Model Select */}
        <div className="relative">
          <button
            type="button"
            onClick={() => make && setIsOpen(isOpen === 'model' ? null : 'model')}
            disabled={!make}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-left flex items-center justify-between text-slate-900 hover:border-cyan-500/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            <span className={model ? 'text-slate-900 font-medium' : 'text-slate-400'}>
              {model || 'Select Model'}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen === 'model' ? 'rotate-180 text-cyan-500' : ''}`} />
          </button>
          {isOpen === 'model' && models.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/50 z-40 max-h-60 overflow-y-auto p-1.5"
            >
              {models.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setModel(m);
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-600 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {m}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Year Select */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(isOpen === 'year' ? null : 'year')}
            className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-left flex items-center justify-between text-slate-900 hover:border-cyan-500/40 transition-colors text-sm"
          >
            <span className={year ? 'text-slate-900 font-medium' : 'text-slate-400'}>
              {year || 'Select Year'}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen === 'year' ? 'rotate-180 text-cyan-500' : ''}`} />
          </button>
          {isOpen === 'year' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl shadow-slate-200/50 z-40 max-h-60 overflow-y-auto p-1.5"
            >
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    setYear(y.toString());
                    setIsOpen(null);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-600 hover:text-cyan-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {y}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Search Action Target */}
        <button
          type="button"
          onClick={handleSearch}
          disabled={!make || !model || !year}
          className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed group shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 text-sm"
        >
          <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Search Track</span>
        </button>
      </div>
    </motion.div>
  );
}