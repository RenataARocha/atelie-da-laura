import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export default function Notificacao({ mensagem, tipo, visivel, onFechar }) {
  useEffect(() => {
    if (visivel) {
      const timer = setTimeout(() => {
        onFechar();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visivel, onFechar]);

  if (!visivel) return null;

  const estilos = {
    sucesso: 'bg-green-500',
    erro: 'bg-red-500',
    info: 'bg-purple-500'
  };

  const icones = {
    sucesso: <CheckCircle size={20} />,
    erro: <AlertCircle size={20} />,
    info: <AlertCircle size={20} />
  };

  return (
    <div 
      role="alert"
      aria-live="polite"
      className={`fixed top-24 right-4 ${estilos[tipo]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-in max-w-md`}
    >
      {icones[tipo]}
      <span className="font-medium">{mensagem}</span>
      <button 
        onClick={onFechar}
        className="ml-2 hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all"
        aria-label="Fechar notificação"
      >
        <X size={18} />
      </button>
    </div>
  );
}