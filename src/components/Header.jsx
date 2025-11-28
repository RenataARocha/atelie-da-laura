import React from 'react';
import { ShoppingCart, Instagram, Sparkles } from 'lucide-react';
import Banner from './Banner';

export default function Header({ 
  totalItens, 
  onAbrirCarrinho, 
  onAbrirMenu,
  menuAberto,
  banners,
  bannerAtual 
}) {
  return (
    <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <nav className="container mx-auto px-4 py-3" aria-label="Navegação principal">
        <div className="flex items-center justify-between">
          {/* Botão de menu mobile */}
          <button 
            onClick={onAbrirMenu}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>

          {/* Logo e título */}
          <div className="flex items-center gap-3">
            <Sparkles className="text-yellow-200" size={28} aria-hidden="true" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Ateliê da Laura</h1>
              <p className="text-xs text-red-100 font-light">Feito com Amor ✨</p>
            </div>
          </div>
          
          {/* Ações do header */}
          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/ateliedalauraoficial/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform hidden md:block"
              aria-label="Visite nosso Instagram (abre em nova aba)"
            >
              <Instagram size={26} />
            </a>
            
            {/* Botão do carrinho */}
            <button
              onClick={onAbrirCarrinho}
              className="relative bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={`Carrinho de compras com ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingCart size={22} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse" aria-hidden="true">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Banner Rotativo */}
      <Banner banners={banners} bannerAtual={bannerAtual} />
    </header>
  );
}