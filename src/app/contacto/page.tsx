'use client';

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { AnimatedSection } from '../components/AnimatedSection';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '518ae4f2-2ba8-4d9b-8868-417cdd6e2083',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="bg-[#F5F0E8] min-h-screen">
      <Navbar />
      <section className="pt-24 max-w-4xl mx-auto px-4 py-8 pb-32">  {/* ← pb-32 para garantir espaço */}
        <AnimatedSection direction="up">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A2744] text-center mb-4">
            Vamos Trabalhar Juntos?
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Entre em contacto para oportunidades, projetos ou colaborações.
          </p>
        </AnimatedSection>

        {/* Informações de contacto */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg text-[#1A2744] mb-2">📧 Email</h3>
            <a href="mailto:miguelctobias@gmail.com" className="text-[#C9A84C] hover:underline">
              miguelctobias@gmail.com
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg text-[#1A2744] mb-2">📱 Telefone</h3>
            <a href="tel:+351912881282" className="text-[#C9A84C] hover:underline">
              (+351) 912 881 282
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg text-[#1A2744] mb-2">📍 Localização</h3>
            <p className="text-gray-600">Leiria, Portugal</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="font-serif text-lg text-[#1A2744] mb-2">🎓 Formação</h3>
            <p className="text-gray-600">CTeSP em Programação de Sistemas de Informação</p>
          </div>
        </div>

        <AnimatedSection direction="up" delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] text-gray-700 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Seu email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] text-gray-700 outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assunto
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Assunto da mensagem"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] text-gray-700 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Escreva a sua mensagem..."
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] text-gray-700 outline-none transition-colors"
              />
            </div>

            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg">
                Mensagem enviada com sucesso! Entrarei em contacto brevemente.
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                ❌ Ocorreu um erro. Por favor, tenta novamente ou envia email diretamente.
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-[#C9A84C] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#C9A84C]/90 transition-colors text-lg"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'A enviar...' : '📧 Enviar Mensagem'}
              </button>
            </div>
          </form>
        </AnimatedSection>
      </section>
    </main>
  );
}