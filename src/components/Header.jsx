import { ShoppingCart, Instagram } from 'lucide-react';
import Banner from './Banner';
import MenuMobile from "./MenuMobile";

const BorboletaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="inline-block">
    <ellipse cx="30" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="70" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="50" cy="50" rx="8" ry="25" fill="#9333ea"/>
    <line x1="50" y1="25" x2="45" y2="15" stroke="#9333ea" strokeWidth="2"/>
    <line x1="50" y1="25" x2="55" y2="15" stroke="#9333ea" strokeWidth="2"/>
  </svg>
);

export default function Header({ 
  totalItens, 
  onAbrirCarrinho, 
  onAbrirMenu,
  menuAberto,
  banners,
  bannerAtual 
}) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-purple-400/40 text-purple-800 bg-opacity-80 backdrop-blur-md shadow-xl animate-slide-in-left">   
      <nav className="container mx-auto px-4 py-3" aria-label="Navegação principal">
        <div className="flex items-center justify-between">
          {/* Botão de menu mobile - COM ANIMAÇÃO */}
          <button 
            onClick={onAbrirMenu}
            className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all animate-fade-in"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </div>
          </button>

          {/* Logo e título - COM ANIMAÇÃO */}
          <div className="flex items-center gap-3 animate-fade-in">
            <BorboletaIcon />            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Ateliê da Laura</h1>
              <p className="text-xs text-purple-900 font-light">Feito com Amor 💟</p>
            </div>
          </div>
          
          {/* Ações do header - COM ANIMAÇÃO */}
          <div className="flex items-center gap-3 animate-fade-in">
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
              className="relative bg-purple-50 text-red-600 p-2 rounded-full hover:bg-purple-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              aria-label={`Carrinho de compras com ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
            >
              <ShoppingCart size={22} />
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse" aria-hidden="true">
                  {totalItens}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Banner Rotativo - COM ANIMAÇÃO */}
      <div className="animate-fade-in">
        <Banner banners={banners} bannerAtual={bannerAtual} />
      </div>
    </header>
  );
}