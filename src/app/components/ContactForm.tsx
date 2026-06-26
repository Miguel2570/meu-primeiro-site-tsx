'use client';

import { useState } from 'react';
import { Button } from './Button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Enviar para Web3Forms ou outra API
    console.log('Formulário enviado:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <input
        type="text"
        placeholder="Seu nome"
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] outline-none"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Seu email"
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] outline-none"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <textarea
        placeholder="Mensagem"
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#C9A84C] outline-none"
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />
      <Button variant="primary" size="lg" className="w-full">
        Enviar mensagem
      </Button>
    </form>
  );
}