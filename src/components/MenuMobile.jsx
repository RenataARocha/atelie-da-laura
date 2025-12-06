import React from 'react';
import { Gift, Star, X, Heart } from 'lucide-react';

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
      className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" 
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
      aria-label="Menu de categorias"
    >
      <aside 
        id="menu-lateral"
        className="bg-white w-80 max-w-[85vw] h-full shadow-2xl overflow-y-auto animate-slide-in" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header do menu */}
        <div className="sticky top-0 bg-white border-b border-purple-100 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <Gift size={24} aria-hidden="true" />
            Categorias
          </h2>
          <button 
            onClick={onFechar} 
            className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Conteúdo do menu */}
        <div className="p-6">
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
                        ? 'bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg'
                        : 'hover:bg-purple-50 text-gray-700'
                    }`}
                    aria-current={categoriaAtiva === cat ? 'page' : undefined}
                  >
                    <span className="font-medium">{cat}</span>
                    {cat === 'Promoções' && (
                      <Star 
                        size={16} 
                        className="text-yellow-400" 
                        aria-label="Em promoção" 
                        fill="currentColor"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Card informativo */}
          <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200" role="complementary">
            <Heart className="text-purple-600 mx-auto mb-2" size={32} aria-hidden="true" />
            <p className="text-sm text-center text-gray-700 font-medium">
              Cada peça é feita com muito carinho especialmente para sua princesa! 
              <span className="text-purple-500">💜</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}