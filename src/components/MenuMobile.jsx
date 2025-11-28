import React from 'react';
import { Gift, Star, X } from 'lucide-react';

export default function MenuMobile({ 
  aberto, 
  onFechar, 
  categorias, 
  categoriaAtiva, 
  onSelecionarCategoria 
}) {
  if (!aberto) return null;

  return (
    <div 
      className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" 
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de categorias"
    >
      <aside 
        id="menu-lateral"
        className="bg-white w-72 h-full shadow-2xl p-6 overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <Gift size={24} aria-hidden="true" />
            Categorias
          </h2>
          <button 
            onClick={onFechar} 
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav aria-label="Filtrar por categoria">
          <ul className="space-y-2">
            {['Todos', 'Promoções', ...categorias.filter(c => c !== 'Todos')].map(cat => (
              <li key={cat}>
                <button
                  onClick={() => {
                    onSelecionarCategoria(cat);
                    onFechar();
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                    categoriaAtiva === cat
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'hover:bg-purple-50 text-gray-700'
                  }`}
                  aria-current={categoriaAtiva === cat ? 'page' : undefined}
                >
                  <span className="font-medium">{cat}</span>
                  {cat === 'Promoções' && <Star size={16} className="text-yellow-400" aria-label="Em promoção" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}