import React from 'react';
import { Plus, Star, Info } from 'lucide-react';

export default function CardProduto({ produto, index, onAdicionar, onVerDetalhes }) {
  return (
    <article 
      className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden group relative animate-fade-in-up stagger-${(index % 6) + 1}`}
    >
      {/* Badge de promoção */}
      {produto.promocao && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1 animate-bounce">
          <Star size={14} fill="white" aria-hidden="true" />
          Promoção
        </div>
      )}
      
      {/* Badge de tamanho */}
      <div className="absolute top-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
        Tamanho {produto.tamanho}
      </div>
      
      {/* Imagem do produto */}
      <div 
        className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 cursor-pointer"
        onClick={() => onVerDetalhes(produto)}
      >
        <img 
          src={produto.imagem} 
          alt={`Foto do produto ${produto.nome}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      
      {/* Informações do produto */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {produto.categoria}
          </span>
          <span className="text-xs text-gray-500">
            {produto.material}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {produto.nome}
        </h3>
        
        <p className="text-xs text-gray-600 mb-3 line-clamp-1">
          {produto.detalhes}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600" aria-label={`Preço: ${produto.preco.toFixed(2)} reais`}>
            R$ {produto.preco.toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={() => onVerDetalhes(produto)}
              className="bg-gray-100 text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-all"
              aria-label={`Ver detalhes de ${produto.nome}`}
            >
              <Info size={18} />
            </button>
            
            <button
              onClick={() => onAdicionar(produto)}
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold hover:scale-105"
              aria-label={`Adicionar ${produto.nome} ao carrinho`}
            >
              <Plus size={16} aria-hidden="true" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}