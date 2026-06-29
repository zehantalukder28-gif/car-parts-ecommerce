import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          <Header isScrolled={isScrolled} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-900 font-mono text-center px-4">
                  <h1 className="text-5xl font-black mb-4">404 - ROUTE OFFLINE</h1>
                  <p className="text-slate-500 mb-8 max-w-md">The requested module or service has not been deployed to the active environment.</p>
                  <Link to="/" className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20">
                    Return to Headquarters
                  </Link>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;