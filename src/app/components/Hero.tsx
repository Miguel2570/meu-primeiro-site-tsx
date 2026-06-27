'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from './Button';

export function Hero() {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const words = ['Programador', 'Web Developer', 'Criador de Soluções'];
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isEnd = index === currentWord.length;
    const isStart = index === 0;

    const timeout = setTimeout(() => {
      if (isEnd) {
        setIsDeleting(true);
      } else if (isStart && isDeleting) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setIndex(0);
        return;
      }

      setText(currentWord.substring(0, index + (isDeleting ? -1 : 1)));
      setIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [index, wordIndex, isDeleting, words]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F0E8] to-white px-4 pt-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/5 via-transparent to-[#1A2744]/5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-[#C9A84C]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#1A2744]/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 bg-[#C9A84C]/10 text-[#C9A84C] rounded-full text-sm font-medium mb-6 border border-[#C9A84C]/20 backdrop-blur-sm">
            ✨ Disponível para Oportunidades
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#1A2744] mb-4 leading-tight">
            Olá, sou<br />
            <span className="text-[#C9A84C]">Miguel Tobias</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-12"
        >
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            <span className="inline-block min-w-[200px]">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6"
        >
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Recém-graduado em Programação de Sistemas de Informação pelo Instituto Politécnico de Leiria.
            Apaixonado por desenvolvimento web, móvel e desktop.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          {/* Botão 1 - Azul escuro (visível em qualquer fundo) */}
          <a
            href="#projetos"
            className="bg-[#1A2744] text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:bg-[#1A2744]/90 transition-all hover:scale-105"
          >
            Ver Projetos
          </a>
          
          {/* Botão 2 - Dourado (contraste com o fundo) */}
          <a
            href="/contacto"
            className="bg-[#C9A84C] text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:bg-[#C9A84C]/90 transition-all hover:scale-105"
          >
            Contactar
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm"
        >
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-2xl">🎓</span>
            <span><span className="font-bold text-[#1A2744]">CTeSP</span> Programação</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-2xl">💻</span>
            <span><span className="font-bold text-[#1A2744]">7</span> projetos</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="text-2xl">🇵🇹</span>
            <span>Leiria, Portugal</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}