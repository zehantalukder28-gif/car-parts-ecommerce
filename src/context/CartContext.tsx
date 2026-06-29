import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products } from '../data/products';

export interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Immutable baseline price dictionary to prevent client-side tampering
const BASELINE_PRICES: Record<number, number> = products.reduce((acc, p) => {
  acc[p.id] = p.price;
  return acc;
}, {} as Record<number, number>);

// Helper to validate, clamp, and sanitize cart items (especially when loading from localStorage)
const sanitizeCartItems = (rawItems: any[]): CartItem[] => {
  if (!Array.isArray(rawItems)) return [];
  const sanitized: CartItem[] = [];
  
  for (const item of rawItems) {
    if (!item || typeof item !== 'object') continue;
    const baseProduct = products.find(p => p.id === Number(item.id));
    if (!baseProduct) continue;
    
    const quantity = Math.max(1, Math.floor(Number(item.quantity) || 1));
    sanitized.push({
      id: baseProduct.id,
      name: baseProduct.name,
      brand: baseProduct.brand,
      price: baseProduct.price,
      originalPrice: baseProduct.originalPrice,
      image: baseProduct.image,
      quantity,
    });
  }
  
  return sanitized;
};

export function CartProvider({ children }: { children: ReactNode }) {
  // Load and sanitize items from localStorage on initialization
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('apexauto_cart');
      if (stored) {
        const parsed = JSON.parse(stored);
        return sanitizeCartItems(parsed);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
    }
    return [];
  });

  // Persist items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('apexauto_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: Math.max(1, Math.floor(Number(i.quantity) || 1) + 1) } 
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    // Ensure quantity is parsed as a valid integer and is >= 1
    const parsedQuantity = Math.floor(Number(quantity));
    
    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setItems(prev => prev.map(i => 
      i.id === id ? { ...i, quantity: parsedQuantity } : i
    ));
  };

  // Defensively calculate total quantities and verified totals using baseline prices
  const totalItems = items.reduce((sum, item) => {
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    return sum + qty;
  }, 0);

  const totalPrice = items.reduce((sum, item) => {
    const qty = Math.max(1, Math.floor(Number(item.quantity) || 1));
    const price = BASELINE_PRICES[item.id] ?? item.price;
    return sum + price * qty;
  }, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}