'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="w-96 h-96 rounded-2xl bg-gradient-to-br from-premium-gold to-premium-teal"
        >
          {/* Conteúdo aqui */}
        </motion.div>
      </div>
    </div>
  );
}