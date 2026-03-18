import { motion } from 'motion/react';
import { Metric as MetricType } from '../types';

interface MetricProps {
  metric: MetricType;
}

export default function Metric({ metric }: MetricProps) {
  const percentage = parseInt(metric.value);
  const strokeDashoffset = 251.2 - (251.2 * percentage) / 100;

  return (
    <div className="flex flex-col items-center text-center p-10 bg-surface/50 backdrop-blur-sm border border-border/50 rounded-2xl transition-all duration-500 hover:border-gold/30 group">
      <div className="relative w-32 h-32 mb-8">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray="251.2"
            initial={{ strokeDashoffset: 251.2 }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
            className="text-gold"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[32px] font-display text-white"
          >
            {metric.value}
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="font-sans text-[11px] tracking-[0.3em] text-gold/60 uppercase mb-2 font-medium">
          {metric.label}
        </div>
        <div className="font-mono text-[10px] tracking-wider text-muted/80">
          {metric.delta}
        </div>
      </motion.div>
    </div>
  );
}
