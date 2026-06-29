import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck, Shield, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  const subtotal = totalPrice;
  const shipping = subtotal >= 199 ? 0 : 19.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md bg-white border border-slate-200 p-8 rounded-3xl shadow-sm"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center border border-slate-200">
            <ShoppingBag className="w-12 h-12 text-slate-300" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h1>
          <p className="text-slate-500 mb-8">Looks like you haven't added any parts to your cart yet.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold font-heading text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-cyan-500/30 transition-all"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.id}`} className="text-slate-900 font-bold hover:text-cyan-600 transition-colors line-clamp-1">
                    {item.name}
                  </Link>
                  <p className="text-sm text-slate-500 mt-1 font-medium">${item.price.toLocaleString()} each</p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-slate-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors bg-white hover:bg-red-50 rounded-lg border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium rounded-xl border border-slate-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6 font-medium">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-500 font-bold' : 'text-slate-900'}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (est.)</span>
                  <span className="text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-slate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 199 && (
                <div className="mb-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-600 font-medium">
                    Add <span className="text-cyan-600 font-bold">${(199 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              <button className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mb-4 shadow-lg shadow-cyan-500/20">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/products"
                className="block text-center text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                  <Truck className="w-4 h-4 text-cyan-500" />
                  <span>Free shipping on orders $199+</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                  <Shield className="w-4 h-4 text-cyan-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}