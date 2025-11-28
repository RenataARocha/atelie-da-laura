import React from 'react';
import { Sparkles, Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-10 mt-16" role="contentinfo">
      <div className="container mx-auto px-4 text-center">
        <Sparkles className="mx-auto mb-4 text-yellow-200" size={40} aria-hidden="true" />
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
        
        <p className="text-sm text-purple-400">
          © 2024 Ateliê da Laura - Todos os direitos reservados 🎀
        </p>
      </div>
    </footer>
  );
}