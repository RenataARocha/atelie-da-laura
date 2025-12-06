import React from 'react';
import { Gift, Star, ChevronRight, Heart } from 'lucide-react';

export default function MenuLateral({ 
  categorias, 
  categoriaAtiva, 
  onSelecionarCategoria 
}) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 animate-fade-in" aria-label="Categorias de produtos">
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
        {/* Título - COM ANIMAÇÃO */}
        <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2 animate-slide-in-left">
          <Gift size={24} aria-hidden="true" />
          Categorias
        </h2>
        
        {/* Lista de Categorias */}
        <nav aria-label="Filtrar por categoria">
          <ul className="space-y-2">
            {['Todos', 'Promoções', ...categorias.filter(c => c !== 'Todos')].map((cat, index) => (
              <li key={cat} className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}>
                <button
                  onClick={() => onSelecionarCategoria(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                    categoriaAtiva === cat
                      ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg'
                      : 'hover:bg-purple-50 text-gray-700'
                  }`}
                  aria-current={categoriaAtiva === cat ? 'page' : undefined}
                >
                  <span className="font-medium">{cat}</span>
                  {cat === 'Promoções' && (
                    <Star size={16} className="text-yellow-400" aria-label="Em promoção" fill="currentColor" />
                  )}
                  <ChevronRight size={18} className={`transition-transform ${
                    categoriaAtiva === cat ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Card informativo - COM ANIMAÇÃO */}
        <div className="mt-6 p-4 bg-gradient-to-br from-purple-100 to-purple-100 rounded-xl animate-fade-in-up stagger-6" role="complementary">
          <Heart className="text-purple-600 mx-auto mb-2" size={32} aria-hidden="true" />
          <p className="text-sm text-center text-gray-700 font-medium">
            Cada peça é feita com muito carinho especialmente para sua princesa! 
            <span style={{ color: '#a855f7' }}>💜</span>
          </p>
        </div>
      </div>
    </aside>
  );
}