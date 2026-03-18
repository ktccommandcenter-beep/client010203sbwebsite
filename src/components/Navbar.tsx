import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { NAVIGATION } from '../constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-void/94 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <a href="/" className="flex items-center">
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=2048" 
                alt="ZADDY" 
                className="h-8 md:h-10 invert"
              />
            </a>

            <div className="hidden md:flex items-center gap-6">
              {NAVIGATION.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-[12px] font-medium tracking-[0.08em] text-sub hover:text-white transition-colors uppercase flex items-center gap-2"
                >
                  {item.name}
                  {item.name.includes('Health') && (
                    <span className="text-[8px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-mono tracking-normal">
                      COMING SOON
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="/account" className="text-sub hover:text-white transition-colors">
              <User size={20} />
            </a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-sub hover:text-white transition-colors relative"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-gold text-void text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-void border-b border-border px-6 py-8 flex flex-col gap-6"
            >
              {NAVIGATION.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  className="text-[18px] font-medium text-white uppercase flex items-center justify-between"
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item.name}
                  {item.name.includes('Health') && (
                    <span className="text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded-full font-mono tracking-normal">
                      COMING SOON
                    </span>
                  )}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-void/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-surface border-l border-border z-[70] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[24px] font-serif uppercase tracking-widest">Your System</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-sub hover:text-white">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center text-center">
                <ShoppingBag size={48} className="text-border mb-6" />
                <p className="text-sub mb-8">Your system is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary w-full"
                >
                  Start Optimization
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
