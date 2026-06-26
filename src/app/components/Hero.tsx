'use client';

import { motion } from 'framer-motion';
import { Button } from './Button';
import { AnimatedSection } from './AnimatedSection';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-premium-cream to-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection direction="up" delay={0.2}>
          <span className="inline-block px-4 py-1 bg-premium-gold/10 text-premium-gold rounded-full text-sm font-medium mb-6">
            Web Design Premium
          </span>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-premium-navy mb-6">
            Transforme sua<br />
            <span className="text-premium-gold">Ideia em Realidade</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Criamos websites que combinam design excecional, performance 
            impecável e uma experiência única para os seus utilizadores.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.5}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg">
              Solicitar Orçamento
            </Button>
            <Button variant="outline" size="lg">
              Ver Portfólio
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.6}>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <span>⭐ 150+ clientes satisfeitos</span>
            <span>🚀 50+ projetos entregues</span>
            <span>🇵🇹 Portugal & Europa</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}