import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export default function ProductCard({ product, featured }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col h-full group ${featured ? 'bg-surface/40 backdrop-blur-md border border-gold/30 rounded-[32px]' : 'bg-surface/20 backdrop-blur-sm border border-border/40 rounded-[32px]'} overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-gold/20`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-void flex items-center justify-center p-8">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
        <div className="absolute top-6 left-6">
          <span className="bg-gold/10 backdrop-blur-md text-gold border border-gold/20 font-mono text-[9px] px-3 py-1 tracking-[0.2em] uppercase font-bold rounded-full">
            {product.tag}
          </span>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-[24px] font-display leading-tight text-white group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          {product.vertical === 'skin' && (
            <div className="mt-1 font-mono text-[9px] text-gold tracking-[0.1em] uppercase">
              TESTOSTERONE-SAFE • NO ENDOCRINE DISRUPTORS • ORGANIC INFUSED
            </div>
          )}
          <div className="flex flex-col items-end">
            <span className="text-white font-medium text-[18px]">
              ${product.price.toFixed(2)}
            </span>
            {product.compareAtPrice && (
              <span className="text-muted line-through text-[12px]">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        
        <p className="text-sub text-[14px] mb-8 leading-relaxed font-light">
          {product.benefit}
        </p>
        
        <div className="mt-auto">
          <button className="w-full py-4 bg-void/50 border border-white/10 text-white rounded-xl text-[12px] font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-void hover:border-gold transition-all duration-500">
            Add to System
          </button>
        </div>
      </div>
    </motion.div>
  );
}
