import React, { useState } from 'react';
import { Instagram, Sparkles } from 'lucide-react';

// Dados dos produtos
const produtos = [
  { id: 1, nome: "Laço Borboleta Lilás", preco: 25.00, imagem: "https://images.unsplash.com/photo-1566454419290-0a60960b0e81?w=400&h=400&fit=crop", categoria: "Laços" },
  { id: 2, nome: "Tiara Floral Rosa", preco: 35.00, imagem: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop", categoria: "Tiaras" },
  { id: 3, nome: "Kit 3 Laços Festa", preco: 60.00, imagem: "https://images.unsplash.com/photo-1522512115668-c09775d6f424?w=400&h=400&fit=crop", categoria: "Kits" },
  { id: 4, nome: "Laço Boutique Vermelho", preco: 28.00, imagem: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", categoria: "Laços" },
  { id: 5, nome: "Presilha Flor Dupla", preco: 22.00, imagem: "https://images.unsplash.com/photo-1583934755096-9c808d2de3c6?w=400&h=400&fit=crop", categoria: "Presilhas" },
  { id: 6, nome: "Faixa Bebê Delicada", preco: 30.00, imagem: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop", categoria: "Faixas" },
];

export default function AtelieDaLaura() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="text-yellow-200" size={28} />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Ateliê da Laura</h1>
                <p className="text-xs text-red-100">Feito com Amor ✨</p>
              </div>
            </div>
            
            <a 
              href="https://www.instagram.com/ateliedalauraoficial/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <Instagram size={26} />
            </a>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-2 text-center text-sm">
          🎀 Laços Exclusivos para sua Princesa
        </div>
      </header>

      {/* Banner Hero */}
      <section className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 py-16 px-4 mt-8 mx-4 rounded-3xl">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Laços que Encantam 🎀
          </h2>
          <p className="text-xl text-white mb-6">
            Deixe sua pequena ainda mais linda com nossos acessórios exclusivos!
          </p>
        </div>
      </section>

      {/* Grade de Produtos */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map(produto => (
            <div key={produto.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={produto.imagem} 
                  alt={produto.nome}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {produto.categoria}
                </span>
                <h3 className="text-xl font-bold text-gray-800 mt-3 mb-2">
                  {produto.nome}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-purple-600">
                    R$ {produto.preco.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-2">Ateliê da Laura</p>
          <p className="text-purple-300 mb-4">Feito com amor para deixar sua pequena ainda mais linda! 💜</p>
          <p className="text-sm text-purple-400">
            © 2024 Ateliê da Laura - Todos os direitos reservados 🎀
          </p>
        </div>
      </footer>
    </div>
  );
}