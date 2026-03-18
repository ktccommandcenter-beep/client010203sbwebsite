import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import ProductCard from './components/ProductCard';
import SectionHeader from './components/SectionHeader';
import { Testimonials } from './components/Testimonials';
import { PRODUCTS } from './constants';
import { ArrowRight, Shield, Zap, Droplets, Activity, Brain, Heart, ChevronRight } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeDomain, setActiveDomain] = useState(0);

  const featuredLogos = [
    "https://www.zaddyproducts.com/cdn/shop/files/1_fd8d568f-54ab-48d7-8e86-aebf945b6bdd_1000x.png?v=1751602037",
    "https://www.zaddyproducts.com/cdn/shop/files/2_a08b49a1-b943-4cd4-bb9d-2163ae0645b7_1000x.png?v=1751602037",
    "https://www.zaddyproducts.com/cdn/shop/files/3_5fbf3890-a14d-49cc-8f7d-948b30a3dd8d_1000x.png?v=1751602038"
  ];

  const healthMetrics = [
    { value: "94", label: "RECOVERY SCORE", delta: "+12% from baseline", status: 'ok' as const },
    { value: "68", label: "RESTING HR", delta: "-4 bpm improvement", status: 'ok' as const },
    { value: "82", label: "FOCUS INDEX", delta: "+18% cognitive lift", status: 'ok' as const }
  ];

  const DOMAINS = [
    {
      id: 'skin',
      title: 'Zaddy Skin',
      subtitle: 'Dermal Defense',
      description: 'Clinical-grade protection against hormone disruptors and environmental stressors.',
      image: 'https://www.zaddyproducts.com/cdn/shop/files/3Z0A7367-Edit.jpg?v=1750746608&width=2048',
      color: 'text-skin',
      bg: 'bg-skin/10',
      href: '#skin'
    },
    {
      id: 'apparel',
      title: 'Zaddy Apparel',
      subtitle: 'Tactical Comfort',
      description: 'High-performance fabrics designed for the modern man who operates without excuses.',
      image: 'https://www.zaddyproducts.com/cdn/shop/files/IMG_4098_1000x.jpg?v=1746910966',
      color: 'text-apparel',
      bg: 'bg-apparel/10',
      href: '#apparel'
    },
    {
      id: 'health',
      title: 'Zaddy Health',
      subtitle: 'Internal Optimization',
      description: 'The next frontier of masculine performance. Bio-available formulas for systemic vitality.',
      image: 'https://www.zaddyproducts.com/cdn/shop/files/ChatGPT_Image_Nov_18_2025_10_00_35_AM_1000x.png?v=1763431253',
      color: 'text-health',
      bg: 'bg-health/10',
      href: '#health'
    }
  ];

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loading phase - extended for cinematic effect
    const loadTimer = setTimeout(() => setIsLoaded(true), 5000);
    
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    
    return () => {
      lenis.destroy();
      clearTimeout(loadTimer);
      clearInterval(slideTimer);
    };
  }, []);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Master Password Check
    if (passcodeInput === 'TredaeZaddy1234!@#$') {
      setIsAuthenticated(true);
      setAuthError(false);
      return;
    }
    
    // Temporary Client Password Check (Expires March 18, 2026 at 5:00 PM EST)
    if (passcodeInput === 'Bullard2026') {
      const expirationDate = new Date('2026-03-18T17:00:00-04:00');
      if (new Date() < expirationDate) {
        setIsAuthenticated(true);
        setAuthError(false);
        return;
      }
    }

    setAuthError(true);
    setPasscodeInput('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-void flex flex-col items-center justify-center selection:bg-gold selection:text-void font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center max-w-sm w-full px-6"
        >
          <img src="https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=2048" alt="ZADDY" className="w-48 mb-12 invert opacity-90" />
          
          <form onSubmit={handleAuthSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="passcode" className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/50 ml-1">Client Access Terminal</label>
              <input 
                id="passcode"
                type="password" 
                value={passcodeInput}
                onChange={(e) => { setPasscodeInput(e.target.value); setAuthError(false); }}
                placeholder="Enter Passcode..."
                className={`w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 transition-colors font-mono text-sm tracking-wider ${authError ? 'border-red-500/50 text-red-400' : ''}`}
                autoFocus
              />
              {authError && <p className="text-red-400/80 text-[10px] uppercase tracking-wider font-mono absolute -bottom-5 left-1">Invalid Passcode</p>}
            </div>
            
            <button 
              type="submit"
              className="mt-2 w-full bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 hover:border-gold/40 rounded-lg py-3 flex items-center justify-center gap-3 transition-all duration-300 font-display italic tracking-widest uppercase text-sm group"
            >
              Enter System
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void selection:bg-gold selection:text-void">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              transition: { duration: 3.5, ease: [0.43, 0.13, 0.23, 0.96] } 
            }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 1, 0.2],
                filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
              }}
              exit={{ 
                scale: 4,
                opacity: 0,
                filter: "blur(40px)",
                transition: { duration: 3, ease: "easeIn" }
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=512" 
                alt="ZADDY" 
                className="w-48 md:w-64 invert brightness-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full -z-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="noise-overlay" />
      <Navbar />
      
      {/* New Ferrari-style Hero Section with Scroll Expansion */}
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://storage.googleapis.com/store-screenapp-production/vid/69ba34576262acd5d799dc86/72d91e85-0228-40fc-8dd8-fbd3f1ad6640.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=GOOG1EINEQV5X2QGY62PSZMBMUR7IGGVLKNDB6ABP5GL6O6FKO76DWA2IE3SB%2F20260318%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260318T051416Z&X-Amz-Expires=604800&X-Amz-Signature=07c38d977bb0be5bc45199c5e033eff28ef4556363b7cf042ca89f2cfee326be&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%2272d91e85-0228-40fc-8dd8-fbd3f1ad6640.mp4%22%3B%20filename%2A%3D%20UTF-8%27%271c86aef6b37c468bb3de0fde3c940932.mp4%3B&response-content-type=video%2Fmp4&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        bgImageSrc="https://www.zaddyproducts.com/cdn/shop/files/ZADDY_NEW_PRODUCT_IMAGES_1000x.jpg?v=1751001479"
        logoSrc="https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=2048"
        date="ZADDY CORE SYSTEM"
        scrollToExpand="Initialize Sequence"
      >
        <div className="w-full flex justify-center pb-24">
           {/* Space under the hero before content flows naturally */}
        </div>
      </ScrollExpandMedia>

      {/* Brand Film Section - High Energy */}
      <section className="relative h-[80vh] bg-black overflow-hidden border-y border-border">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://storage.googleapis.com/aistudio-build-assets/zaddy-brand-film.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void" />
        <div className="container-custom relative z-10 h-full flex items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          >
            <h2 className="text-[64px] md:text-[120px] font-display leading-none mb-8 tracking-tighter">PROTECT. PROVIDE. <span className="text-gold">LEAD.</span></h2>
            <p className="font-mono text-[12px] tracking-[0.5em] text-white/50 uppercase">The Zaddy Standard</p>
          </motion.div>
        </div>
      </section>

      {/* Domain Focus - The Three Pillars */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen bg-void flex flex-col"
      >
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3">
          {DOMAINS.map((domain, i) => (
            <motion.a
              key={domain.id}
              href={domain.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2 }}
              className="group relative overflow-hidden border-r border-border/30 last:border-r-0 flex flex-col justify-end p-12 min-h-[60vh] lg:min-h-0"
            >
              {/* Background Image with Hover Effect */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={domain.image} 
                  alt={domain.title}
                  className="w-full h-full object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 ${domain.bg} mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="overflow-hidden mb-4">
                  <motion.div 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3"
                  >
                    <span className={`font-mono text-[10px] tracking-[0.4em] uppercase font-bold ${domain.color}`}>
                      Domain 0{i + 1}
                    </span>
                    <div className="w-8 h-[1px] bg-white/10" />
                    <span className="font-mono text-[8px] text-white/20 tracking-[0.2em] uppercase">VERIFIED_PROTOCOL</span>
                  </motion.div>
                </div>
                
                <h3 className="text-[48px] md:text-[84px] font-display leading-[0.75] mb-8 group-hover:text-gold transition-colors duration-500 tracking-tighter">
                  {domain.title}<span className="text-gold">.</span>
                </h3>

                <div className="space-y-4 mb-10 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 delay-100">
                  <p className="text-sub text-[16px] leading-relaxed max-w-xs font-light">
                    {domain.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {i === 0 && ['ISO-9001', 'CLINICAL', 'BIO-ACTIVE'].map(tag => (
                      <span key={tag} className="px-2 py-1 border border-white/10 text-[9px] font-mono tracking-widest text-white/40">{tag}</span>
                    ))}
                    {i === 1 && ['MODAL', 'ANTI-ODOR', 'STRETCH'].map(tag => (
                      <span key={tag} className="px-2 py-1 border border-white/10 text-[9px] font-mono tracking-widest text-white/40">{tag}</span>
                    ))}
                    {i === 2 && ['NOOTROPIC', 'RECOVERY', 'PEAK'].map(tag => (
                      <span key={tag} className="px-2 py-1 border border-white/10 text-[9px] font-mono tracking-widest text-white/40">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-white group-hover:text-gold transition-all duration-500">
                  <div className="w-12 h-[1px] bg-white/20 group-hover:bg-gold group-hover:w-20 transition-all duration-700" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Initialize System</span>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-12 right-12 font-display text-[120px] leading-none text-white/5 select-none group-hover:text-gold/10 transition-colors">
                0{i + 1}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.section>

      {/* Marquee */}
      <div className="bg-raise border-y border-border py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="font-mono text-[10px] tracking-[0.16em] text-gold uppercase">ALL-NATURAL • TESTOSTERONE-SAFE • SCIENCE-BACKED • ORGANIC INFUSED</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-gold uppercase">• NO HORMONE DISRUPTORS • NO PARABENS • NO BS • LUXURY GROOMING</span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-gold uppercase">• MASCULINE WELLNESS • ELITE MEN USE ZADDY •</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Story Section */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="section-padding bg-void relative overflow-hidden"
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-[48px] md:text-[72px] leading-none mb-8">ZADDY WASN'T BORN OUT OF <span className="font-display italic text-gold">TREND-CHASING.</span></h2>
              <p className="font-display italic text-gold text-[24px] mb-10">"It was born out of necessity."</p>
              <div className="max-w-2xl mx-auto">
                <p className="text-sub text-[18px] leading-relaxed mb-12 font-light">
                  The men's grooming industry is flooded with weak, outdated, and hormone-disrupting products that do more harm than good. Nearly 90% of skincare products contain endocrine disruptors that kill testosterone, raise estrogen, and strip men of their edge.
                </p>
                <p className="text-sub text-[18px] leading-relaxed mb-12 font-light">
                  So we built something better. Testosterone-protective. Clean. Potent. No BS. ZADDY isn't just a brand — it's a standard. A statement. A way of life.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-center">
                    <p className="text-[48px] font-display text-white leading-none mb-2">10+</p>
                    <p className="font-mono text-[10px] text-gold tracking-[0.2em] uppercase">Countries Conquered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[48px] font-display text-white leading-none mb-2">300+</p>
                    <p className="font-mono text-[10px] text-gold tracking-[0.2em] uppercase">Faces Upgraded</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[48px] font-display text-white leading-none mb-2">43K</p>
                    <p className="font-mono text-[10px] text-gold tracking-[0.2em] uppercase">Elite Community</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* Best Sellers - Moved down */}
      <motion.section 
        id="shop" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
        className="section-padding bg-void border-t border-border"
      >
        <div className="container-custom">
          <SectionHeader 
            title="The Core Collection"
            italic="Proven Efficiency."
            description="Our most requested formulas, engineered for immediate impact and long-term vitality. No fillers. No compromises."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured In */}
      <section className="py-12 bg-void border-y border-border">
        <div className="container-custom">
          <p className="text-center font-mono text-[11px] tracking-[0.2em] text-muted uppercase mb-8">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {featuredLogos.map((logo, i) => (
              <img key={i} src={logo} alt="Press Logo" className="h-6 md:h-8 object-contain invert" />
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Showcase - Skin (Ferrari Split Style) */}
      <motion.section 
        id="skin" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-depth flex flex-col lg:flex-row border-y border-border overflow-hidden"
      >
        <div className="lg:w-1/2 relative group overflow-hidden h-[60vh] lg:h-auto">
          <img 
            src="https://www.zaddyproducts.com/cdn/shop/files/3Z0A7367-Edit.jpg?v=1750746608&width=2048" 
            alt="Skin Vertical"
            className="split-banner-img mix-blend-luminosity opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-skin/10 mix-blend-overlay" />
          <div className="absolute top-12 left-12 z-20">
            <span className="micro-label text-skin">Vertical 01 / Zaddy Skin</span>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center p-12 md:p-24 relative">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-skin/30" />
              <span className="font-mono text-[10px] text-skin tracking-[0.4em] uppercase">Dermal Defense Protocol</span>
            </div>
            
            <h2 className="text-[64px] md:text-[96px] text-editorial mb-8">Zaddy <span className="text-gold italic">Skin.</span></h2>
            
            <p className="text-sub text-[18px] leading-relaxed mb-12 font-light">
              Men's skin is thicker, oilier, and more prone to irritation. Zaddy sharpens your edge daily with targeted delivery systems engineered for men's biology.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-skin">
                  <Shield size={18} />
                  <h4 className="text-white text-[14px] font-bold uppercase tracking-widest">Barrier Defense</h4>
                </div>
                <p className="text-sub text-[12px] pl-7">Protects against environmental stressors.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-skin">
                  <Zap size={18} />
                  <h4 className="text-white text-[14px] font-bold uppercase tracking-widest">Cellular Repair</h4>
                </div>
                <p className="text-sub text-[12px] pl-7">Accelerates skin regeneration.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="/collections/skincare" className="btn-primary">
                Shop Skincare
              </a>
              <div className="flex items-center gap-4 px-6 border border-white/5 rounded-full bg-white/5 backdrop-blur-sm">
                <span className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase">Status: Active</span>
                <div className="w-2 h-2 rounded-full bg-ok animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute bottom-0 right-0 font-display text-[200px] leading-none text-white/5 select-none translate-y-1/4 translate-x-1/4">
            01
          </div>
        </div>
      </motion.section>

      <section className="bg-void py-24 border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <p className="micro-label">System Feedback / Elite Testimonials</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold/20" />
              <span className="font-mono text-[9px] text-gold tracking-[0.2em] uppercase">Verified Users</span>
            </div>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Routine Builder Section - Bento Grid Style (Ferrari Technical) */}
      <section className="section-padding bg-void border-y border-border relative overflow-hidden">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-gold/30" />
                <span className="micro-label">System Architecture</span>
              </div>
              <h2 className="text-[64px] md:text-[96px] text-editorial mb-8">The Zaddy <span className="text-gold italic">Protocol.</span></h2>
              <p className="text-sub text-[18px] leading-relaxed font-light">
                Three steps to total dermal dominance. Engineered to work in synergy for maximum cellular turnover and barrier protection.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                <p className="font-mono text-[9px] text-white/40 tracking-[0.2em] uppercase mb-2">Efficiency Rating</p>
                <p className="font-mono text-[24px] text-gold font-bold">99.4%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-1 relative p-12 glass-panel rounded-[40px] group hover:border-gold/30 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 liquid-gradient animate-morph opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <Droplets size={28} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-gold/40 text-[10px] tracking-[0.3em] uppercase">Phase 01</span>
                      <span className="font-mono text-white/20 text-[8px] tracking-[0.2em] uppercase">CLEANSE_INIT</span>
                    </div>
                  </div>
                  <h4 className="text-[32px] mb-4 font-display tracking-tight">System Purify</h4>
                  <p className="text-sub text-[16px] leading-relaxed max-w-md font-light">Remove impurities without disrupting the acid mantle. A high-performance start to your day.</p>
                </div>
              </div>
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/ZADDY_cleanser_220f0cb9-0f03-40e1-beaf-f8b46024470d_1000x.jpg?v=1751014136" 
                alt="Cleanse"
                className="absolute -right-10 -bottom-10 w-72 h-72 object-contain mix-blend-luminosity opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 md:row-span-2 relative p-12 glass-panel rounded-[40px] group hover:border-gold/30 transition-all duration-700 overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute inset-0 liquid-gradient animate-morph opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" style={{animationDelay: '-2s'}} />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                    <Zap size={28} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-gold/40 text-[10px] tracking-[0.3em] uppercase">Phase 02</span>
                    <span className="font-mono text-white/20 text-[8px] tracking-[0.2em] uppercase">REPAIR_CORE</span>
                  </div>
                </div>
                <h4 className="text-[32px] mb-4 font-display tracking-tight">Cellular Repair</h4>
                <p className="text-sub text-[16px] leading-relaxed font-light">Targeted Vitamin C delivery for deep cellular recovery and structural integrity.</p>
              </div>
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/Serum_new_bottle_1000x.jpg?v=1751427567" 
                alt="Repair"
                className="absolute -right-10 bottom-20 w-56 h-56 object-contain mix-blend-luminosity opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
              />
              <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Bio-Activity</span>
                  <span className="font-mono text-[10px] text-gold">98.4%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "98.4%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-gold shadow-[0_0_10px_rgba(200,168,75,0.5)]" 
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 md:row-span-1 relative p-12 glass-panel rounded-[40px] group hover:border-gold/30 transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 liquid-gradient animate-morph opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none" style={{animationDelay: '-4s'}} />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <Shield size={28} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-gold/40 text-[10px] tracking-[0.3em] uppercase">Phase 03</span>
                      <span className="font-mono text-white/20 text-[8px] tracking-[0.2em] uppercase">FORTIFY_SHIELD</span>
                    </div>
                  </div>
                  <h4 className="text-[32px] mb-4 font-display tracking-tight">Barrier Fortify</h4>
                  <p className="text-sub text-[16px] leading-relaxed max-w-md font-light">Lock in moisture and create a breathable shield against environmental stressors.</p>
                </div>
              </div>
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/moisturizer_1_1000x.jpg?v=1750995952" 
                alt="Fortify"
                className="absolute -right-10 -bottom-10 w-72 h-72 object-contain mix-blend-luminosity opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vertical Showcase - Apparel (Ferrari Split Style) */}
      <motion.section 
        id="apparel" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-void flex flex-col lg:flex-row-reverse border-y border-border overflow-hidden"
      >
        <div className="lg:w-1/2 relative group overflow-hidden h-[60vh] lg:h-auto">
          <img 
            src="https://www.zaddyproducts.com/cdn/shop/files/IMG_4098_1000x.jpg?v=1746910966" 
            alt="Apparel Vertical"
            className="split-banner-img mix-blend-luminosity opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-apparel/10 mix-blend-overlay" />
          <div className="absolute top-12 right-12 z-20 text-right">
            <span className="micro-label text-apparel">Vertical 02 / Zaddy Apparel</span>
          </div>
        </div>

        <div className="lg:w-1/2 flex items-center justify-center p-12 md:p-24 relative">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-apparel/30" />
              <span className="font-mono text-[10px] text-apparel tracking-[0.4em] uppercase">Tactical Comfort System</span>
            </div>
            
            <h2 className="text-[64px] md:text-[96px] text-editorial mb-8">Zaddy <span className="text-gold italic">Apparel.</span></h2>
            
            <p className="text-sub text-[18px] leading-relaxed mb-12 font-light">
              For the man who operates without excuses. Zaddy Apparel is engineered for high-performance comfort without sacrificing authority. <span className="font-display italic text-gold">B.D.E. (Bold. Dominant. Effortless.)</span>
            </p>
            
            <div className="space-y-6 mb-16">
              <div className="flex items-center gap-6 p-6 bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl group hover:border-apparel/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-apparel/10 flex items-center justify-center text-apparel">
                  <Droplets size={24} />
                </div>
                <div>
                  <h4 className="text-white text-[16px] font-bold uppercase tracking-widest mb-1">Moisture-Wicking Modal</h4>
                  <p className="text-sub text-[13px]">Breathable fibers that stay dry all day.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-surface/40 backdrop-blur-sm border border-white/5 rounded-2xl group hover:border-apparel/30 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-apparel/10 flex items-center justify-center text-apparel">
                  <Shield size={24} />
                </div>
                <div>
                  <h4 className="text-white text-[16px] font-bold uppercase tracking-widest mb-1">Anti-Microbial Finish</h4>
                  <p className="text-sub text-[13px]">Odor-resistant technology for active lifestyles.</p>
                </div>
              </div>
            </div>

            <a href="/collections/apparel" className="btn-primary">
              Explore Apparel
            </a>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute bottom-0 left-0 font-display text-[200px] leading-none text-white/5 select-none translate-y-1/4 -translate-x-1/4">
            02
          </div>
        </div>
      </motion.section>

      {/* Bundles Section */}
      <section id="bundles" className="section-padding bg-void relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.zaddyproducts.com/cdn/shop/files/ZADDY_NEW_PRODUCT_IMAGES_1000x.jpg?v=1751001479" 
            alt="Bundles Background" 
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SectionHeader 
              title="System Upgrades"
              italic="Maximum Synergy."
              description="Curated bundles designed to provide a comprehensive performance boost. Save up to 15% when you upgrade your entire system."
            />
            <a href="/collections/bundles" className="btn-secondary mb-12">
              View All Bundles
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.filter(p => p.id === 'ultimate-bundle').map((product) => (
              <div key={product.id} className="md:col-span-2">
                <ProductCard product={product} featured />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Entry Section */}
      <section className="section-padding bg-depth border-y border-border">
        <div className="container-custom">
          <div className="glass-morphism rounded-[40px] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="font-mono text-gold text-[12px] tracking-[0.4em] uppercase mb-6 block font-bold">System Assessment</span>
              <h2 className="text-[48px] md:text-[64px] leading-none mb-8">What <span className="font-display italic text-gold">Zaddy</span> Are You?</h2>
              <p className="text-sub text-[18px] mb-10 font-light">
                Not every routine is built for every man. Take our 30-second assessment to find the exact protocol engineered for your skin type and lifestyle.
              </p>
              <button className="btn-primary group">
                Start Assessment
                <ArrowRight size={18} className="ml-3 transform group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            <div className="relative z-10 w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden border border-white/5">
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/Zaddy_Set_Bundle_new_1000x.jpg?v=1751427349" 
                alt="Quiz" 
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* Editorial Story Section (Ferrari Style) */}
      <section className="bg-void py-32 border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] overflow-hidden rounded-[40px]"
            >
              <img 
                src="https://www.zaddyproducts.com/cdn/shop/files/ZADDY_NEW_PRODUCT_IMAGES_1000x.jpg?v=1751001479" 
                alt="The Zaddy Lifestyle" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                <span className="micro-label text-gold mb-4 block">Archive_04</span>
                <h3 className="text-[42px] text-editorial leading-tight">The Pursuit of <br/><span className="italic">Excellence.</span></h3>
              </div>
            </motion.div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-gold/30" />
                <span className="micro-label">Our Philosophy</span>
              </div>
              <h2 className="text-[56px] md:text-[84px] text-editorial leading-[0.9] mb-12">
                Engineered for the <span className="text-gold">Modern</span> Patriarch.
              </h2>
              <div className="space-y-8 max-w-xl">
                <p className="text-sub text-[20px] leading-relaxed font-light italic">
                  "Luxury is not about excess. It is about the elimination of the unnecessary until only perfection remains."
                </p>
                <p className="text-sub text-[18px] leading-relaxed font-light opacity-70">
                  Zaddy was born from a singular vision: to bring the precision of high-performance engineering to the world of personal care. We don't just make products; we build systems for the man who demands as much from his skin as he does from his machine.
                </p>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 text-gold group"
                >
                  <span className="micro-label tracking-[0.4em]">Read the Manifesto</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Vertical - Split Banner Refactor */}
      <section id="health" className="bg-void overflow-hidden border-b border-border">
        <div className="flex flex-col lg:flex-row min-h-[90vh]">
          {/* Content Side */}
          <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative bg-surface/20">
            <div className="absolute top-12 left-12 flex items-center gap-4">
              <span className="micro-label text-gold">Vertical_03</span>
              <span className="w-8 h-[1px] bg-white/10" />
              <span className="micro-label opacity-40">Internal Optimization</span>
            </div>
            
            <div className="max-w-xl">
              <h2 className="text-[84px] md:text-[120px] text-editorial leading-[0.75] mb-12">
                Zaddy <span className="text-gold italic">Health.</span>
              </h2>
              <p className="text-sub text-[20px] leading-relaxed mb-16 font-light">
                Precision-engineered supplements for cognitive clarity, hormonal balance, and peak physical output.
              </p>
              
              <div className="grid grid-cols-2 gap-12 mb-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="text-gold" size={20} />
                    <span className="micro-label">Performance</span>
                  </div>
                  <p className="text-white text-[24px] font-display">+24% <span className="text-[14px] text-muted font-mono font-normal">Output</span></p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="text-gold" size={20} />
                    <span className="micro-label">Focus</span>
                  </div>
                  <p className="text-white text-[24px] font-display">99.9% <span className="text-[14px] text-muted font-mono font-normal">Clarity</span></p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-12 py-6 bg-gold text-void font-mono text-[12px] tracking-[0.3em] uppercase font-bold hover:bg-white transition-colors flex items-center justify-center gap-4"
              >
                Configure Plan <ArrowRight size={16} />
              </motion.button>
            </div>

            <div className="absolute bottom-12 left-12">
              <p className="font-mono text-[9px] text-white/20 tracking-[0.2em] uppercase">SYSTEM_REV_4.0 // HEALTH_CORE</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-0 group overflow-hidden bg-black/50">
            <img 
              src="https://www.zaddyproducts.com/cdn/shop/files/ChatGPT_Image_Jun_23_2025_01_08_36_PM_1000x.png?v=1750920964" 
              alt="Zaddy Health Multivitamin" 
              className="split-banner-img object-contain scale-100 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-void/10 group-hover:bg-transparent transition-colors duration-700" />
            
            {/* Technical Overlay */}
            <div className="absolute top-12 right-12 flex flex-col items-end gap-2">
              <div className="px-3 py-1 border border-white/20 rounded-full backdrop-blur-md">
                <span className="font-mono text-[10px] text-white tracking-widest">BIO_SCAN: ACTIVE</span>
              </div>
              <div className="w-24 h-[1px] bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Ferrari Refined */}
      <footer className="bg-void pt-32 pb-12 border-t border-border relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <h2 className="text-[32px] font-display tracking-tighter mb-8">ZADDY<span className="text-gold">.</span></h2>
              <p className="text-sub text-[15px] leading-relaxed mb-8 font-light max-w-xs">
                The definitive protocol for the modern patriarch. Engineered for precision, performance, and dominance.
              </p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-gold transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <span className="micro-label text-gold mb-8 block">Navigation</span>
              <ul className="space-y-4">
                {['The Protocol', 'Apparel Line', 'Health Systems', 'Manifesto', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sub hover:text-white transition-colors text-[15px] font-light">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="micro-label text-gold mb-8 block">Legal</span>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Shipping Info', 'Returns'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sub hover:text-white transition-colors text-[15px] font-light">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="micro-label text-gold mb-8 block">Newsletter</span>
              <p className="text-sub text-[14px] mb-6 font-light">Join the inner circle for protocol updates and exclusive drops.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDRESS" 
                  className="w-full bg-transparent border-b border-white/10 py-4 font-mono text-[12px] focus:border-gold outline-none transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase">
              © 2024 ZADDY PRODUCTS // ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center gap-8">
              <span className="font-mono text-[10px] text-white/20 tracking-[0.2em] uppercase">VERIFIED_PROTOCOL_v4.0</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-500/60 tracking-[0.2em] uppercase">SYSTEMS_OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Watermark */}
        <div className="absolute -bottom-20 -right-20 opacity-[0.02] pointer-events-none select-none">
          <h2 className="text-[30vw] font-display leading-none">ZADDY</h2>
        </div>
      </footer>
    </div>
  );
}
