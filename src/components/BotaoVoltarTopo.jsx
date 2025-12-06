import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BotaoVoltarTopo() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o botão quando rolar mais de 300px
      if (window.scrollY > 300) {
        setMostrar(true);
      } else {
        setMostrar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={voltarAoTopo}
      className={`fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 z-50 hover:scale-110 ${
        mostrar ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Voltar ao topo da página"
    >
      <ChevronUp size={24} />
    </button>
  );
}