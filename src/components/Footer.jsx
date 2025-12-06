import { Sparkles, Instagram, Send } from 'lucide-react';

const BorboletaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="inline-block">
    <ellipse cx="30" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="70" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="50" cy="50" rx="8" ry="25" fill="#9333ea"/>
    <line x1="50" y1="25" x2="45" y2="15" stroke="#9333ea" strokeWidth="2"/>
    <line x1="50" y1="25" x2="55" y2="15" stroke="#9333ea" strokeWidth="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-10 mt-16" role="contentinfo">
      <div className="container mx-auto px-4 text-center">
<BorboletaIcon />
        <p className="text-2xl font-bold mb-2">Ateliê da Laura</p>
        <p className="text-purple-300 mb-6">Feito com amor para deixar sua pequena ainda mais linda! 💜</p>
        
        {/* Links de redes sociais */}
        <nav aria-label="Redes sociais" className="flex justify-center gap-6 mb-6">
          <a 
            href="https://www.instagram.com/ateliedalauraoficial/" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300 transition-colors flex items-center gap-2"
            aria-label="Visite nosso Instagram (abre em nova aba)"
          >
            <Instagram size={24} aria-hidden="true" />
            Instagram
          </a>
          <a 
            href="https://wa.me/5584999666276?text=Olá!%20Vim%20do%20site%20do%20Ateliê%20da%20Laura%20e%20gostaria%20de%20tirar%20algumas%20dúvidas!%20💜"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-300 transition-colors flex items-center gap-2"
            aria-label="Entre em contato pelo WhatsApp (abre em nova aba)"
          >
            <Send size={24} aria-hidden="true" />
            WhatsApp
          </a>
        </nav>
        
        <p className="text-sm text-purple-400 mb-4">
  © 2024 Ateliê da Laura - Todos os direitos reservados 
  <span className="inline-block ml-2" style={{ filter: 'hue-rotate(270deg)' }}>🎀</span>
</p>


        {/* Link Admin - Discreto */}
        <div className="mt-4 pt-4 border-t border-purple-700">
          <a 
            href="/admin/login"
            className="text-xs text-purple-400 hover:text-purple-200 transition-colors inline-block"
            title="Acesso administrativo"
          >
            Área Administrativa
          </a>
        </div>
      </div>
    </footer>
  );
}