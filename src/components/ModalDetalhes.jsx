import React from 'react';
import { X, ShoppingCart, Package, Sparkles } from 'lucide-react';

export default function ModalDetalhes({ produto, visivel, onFechar, onAdicionar }) {
  if (!visivel || !produto) return null;

  const handleAdicionar = () => {
    onAdicionar(produto);
    onFechar();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onFechar}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com botão fechar */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-3xl z-10">
          <h2 className="text-2xl font-bold text-gray-800">Detalhes do Produto</h2>
          <button
            onClick={onFechar}
            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
            aria-label="Fechar detalhes"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Imagem */}
          <div className="relative mb-6 rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-80 object-contain"
            />
            {produto.promocao && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 EM PROMOÇÃO
              </div>
            )}
          </div>

          {/* Informações */}
          <div className="space-y-4">
            {/* Nome */}
            <h3 className="text-3xl font-bold text-gray-800">
              {produto.nome}
            </h3>

            {/* Badges - Categoria, Tamanho, Material */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                <Sparkles size={16} />
                {produto.categoria}
              </span>
              
              {/* ✅ Badge de Tamanho - Visual, não no texto */}
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                <Package size={16} />
                Tamanho {produto.tamanho}
              </span>
              
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                {produto.material}
              </span>
            </div>

            {/* Preço */}
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Preço</p>
              <p className="text-4xl font-bold text-purple-600">
                R$ {produto.preco.toFixed(2)}
              </p>
            </div>

            {/* Descrição - SEM mencionar tamanho */}
            {produto.descricao && (
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Descrição</h4>
                <p className="text-gray-600 leading-relaxed">
                  {produto.descricao}
                </p>
              </div>
            )}

            {/* Detalhes Adicionais - SEM mencionar tamanho */}
            {produto.detalhes && (
              <div>
                <h4 className="font-bold text-gray-700 mb-2">Detalhes</h4>
                <p className="text-gray-600 leading-relaxed">
                  {produto.detalhes}
                </p>
              </div>
            )}
          </div>

          {/* Botão de Adicionar */}
          <div className="mt-6 sticky bottom-0 bg-white pt-4 border-t border-gray-200">
            <button
              onClick={handleAdicionar}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}