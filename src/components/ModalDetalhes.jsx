import React from 'react';
import { X, Plus, Package, Ruler, Sparkles } from 'lucide-react';
import { tabelaTamanhos } from '../data/produtos';

export default function ModalDetalhes({ produto, visivel, onFechar, onAdicionar }) {
  if (!visivel || !produto) return null;

  const infoTamanho = tabelaTamanhos[produto.tamanho];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-detalhes"
      onClick={onFechar}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex items-center justify-between">
          <h2 id="titulo-detalhes" className="text-2xl font-bold">
            Detalhes do Produto
          </h2>
          <button
            onClick={onFechar}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
            aria-label="Fechar detalhes"
          >
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Imagem */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
              <img 
                src={produto.imagem} 
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Informações */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {produto.categoria}
                  </span>
                  {produto.promocao && (
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                      Em Promoção
                    </span>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-4xl font-bold text-purple-600">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>

              {/* Descrição */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-gray-700">
                  {produto.descricao}
                </p>
              </div>

              {/* Especificações */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                  <Ruler className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-gray-800">Tamanho {produto.tamanho}</p>
                    <p className="text-sm text-gray-600">Dimensão: {infoTamanho.dimensao}</p>
                    <p className="text-sm text-gray-500">{infoTamanho.descricao}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                  <Sparkles className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-gray-800">Material</p>
                    <p className="text-sm text-gray-600">{produto.material}</p>
                    <p className="text-sm text-gray-500">{produto.detalhes}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl">
                  <Package className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-bold text-gray-800">Informações de Frete</p>
                    <p className="text-sm text-gray-600">Peso aproximado: {infoTamanho.peso}</p>
                    <p className="text-sm text-gray-500">Sugestão: {infoTamanho.frete}</p>
                  </div>
                </div>
              </div>

              {/* Botão Adicionar */}
              <button
                onClick={() => {
                  onAdicionar(produto);
                  onFechar();
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all hover:scale-105"
              >
                <Plus size={24} />
                Adicionar ao Carrinho
              </button>

              <p className="text-xs text-center text-gray-500">
                💬 Dúvidas? Entre em contato pelo WhatsApp!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 