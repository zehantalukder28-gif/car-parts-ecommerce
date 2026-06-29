import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/logo.png'; // Importing your asset directly

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Parts', href: '/products' },
      { name: 'Brakes', href: '/products?category=brakes' },
      { name: 'Suspension', href: '/products?category=suspension' },
      { name: 'Engine', href: '/products?category=engine' },
      { name: 'Wheels & Tires', href: '/products?category=wheels' },
      { name: 'Exhaust Systems', href: '/products?category=exhaust' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Returns', href: '/returns' },
      { name: 'Warranty Info', href: '/warranty' },
      { name: 'Installation Guides', href: '/guides' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  };

  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-200">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Logo" 
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:rotate-6" 
              />
              <span className="text-xl font-black text-slate-900 italic tracking-tighter uppercase">
                APEXAUTO<span className="text-cyan-500">.</span>
              </span>
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Your trusted source for premium automotive performance parts. We carry only the best brands with expert support and fast shipping.
            </p>
            <div className="space-y-3 font-medium">
              <a href="tel:1-800-AUTO-PARTS" className="flex items-center gap-3 text-xs text-slate-600 hover:text-cyan-600 transition-colors">
                <Phone className="w-4 h-4 text-cyan-500" />
                1-800-AUTO-PARTS
              </a>
              <a href="mailto:support@apexauto.com" className="flex items-center gap-3 text-xs text-slate-600 hover:text-cyan-600 transition-colors">
                <Mail className="w-4 h-4 text-cyan-500" />
                support@apexauto.com
              </a>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                123 Performance Dr, City, ST 12345
              </div>
            </div>
          </div>

          {/* Map Loop Columns */}
          {['shop', 'support', 'company', 'legal'].map((sectionKey) => (
            <div key={sectionKey}>
              <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-4">
                {sectionKey}
              </h4>
              <ul className="space-y-2.5">
                {footerLinks[sectionKey as keyof typeof footerLinks].map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter & Socials Bottom Stack */}
        <div className="mt-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-md">
            <h4 className="text-slate-900 font-bold text-sm mb-1">Subscribe to our newsletter</h4>
            <p className="text-xs text-slate-500">Get the latest performance diagnostic logs and event entries directly.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors w-full sm:w-64"
            />
            <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* System Logs & Legal Disclaimer */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span>© {currentYear} ApexAuto. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-mono text-[10px]">SYSTEM STATUS: <span className="text-emerald-500 animate-pulse">OPTIMAL</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((SocialIcon, idx) => (
              <a key={idx} href="#" className="w-8 h-8 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:border-cyan-500/20 transition-all">
                <SocialIcon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}