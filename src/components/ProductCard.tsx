import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useRef, useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Map mouse position to rotation angle (-8deg to 8deg)
    const rY = (mouseX / (width / 2)) * 8;
    const rX = -(mouseY / (height / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 25 }}
      animate={{
        opacity: 1,
        rotateX: rotateX,
        rotateY: rotateY,
        y: rotateX !== 0 || rotateY !== 0 ? -8 : 0,
        scale: rotateX !== 0 || rotateY !== 0 ? 1.02 : 1,
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        opacity: { delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }}
      className="group relative bg-white rounded-2xl border border-slate-100 hover:border-cyan-500/40 overflow-hidden transition-colors duration-300 shadow-sm hover:shadow-[0_25px_50px_-15px_rgba(6,182,212,0.15)]"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.originalPrice && (
          <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded-md shadow-lg shadow-cyan-500/25">
            SALE
          </span>
        )}
        {!product.inStock && (
          <span className="px-2 py-1 bg-slate-100/80 backdrop-blur-sm text-slate-500 text-xs font-bold rounded-md border border-slate-200">
            SOLD OUT
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-3 right-3 z-20 w-8 h-8 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-cyan-600 hover:border-cyan-400 transition-all opacity-0 group-hover:opacity-100 shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Container with Slide-Up Cart Button */}
      <div className="relative aspect-4/5 overflow-hidden bg-slate-50">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600';
            }}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          />
          {/* Light gradient overlay at bottom to make the button pop */}
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* The Slide-up Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
          <button
            onClick={(e) => {
              e.preventDefault(); 
              addToCart(product);
            }}
            disabled={!product.inStock}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed rounded-xl flex items-center justify-center gap-2 text-white font-bold transition-all shadow-lg shadow-cyan-500/25"
          >
            <ShoppingCart className="w-5 h-5" />
            {product.inStock ? 'Quick Add' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="text-xs text-cyan-400 font-bold tracking-wider uppercase mb-1">
          {product.brand}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-slate-900 font-medium mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating) ? 'text-cyan-500 fill-cyan-500' : 'text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-neutral-500 font-medium">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100 group-hover:border-cyan-500/10 transition-colors duration-300">
          <span className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors duration-300">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-500 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}