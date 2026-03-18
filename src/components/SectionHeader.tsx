import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  italic?: string;
  description: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ title, italic, description, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl mb-12 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[36px] md:text-[48px] leading-[1.1] mb-2"
      >
        {title}
      </motion.h2>
      {italic && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display italic text-gold text-[24px] mb-4"
        >
          {italic}
        </motion.p>
      )}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-sub text-[15px] leading-relaxed"
      >
        {description}
      </motion.p>
    </div>
  );
}
