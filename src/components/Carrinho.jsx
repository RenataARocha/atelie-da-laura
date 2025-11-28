import React from 'react';
import { ShoppingCart, X, Plus, Minus, Send, Heart } from 'lucide-react';

export default function Carrinho({ 
  visivel, 
  onFechar, 
  carrinho, 
  onAlterarQuantidade, 
  onRemover,
  onEnviarWhatsApp,
  carregando 
}) {
  if (!visivel) return null;

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-carrinho"
      onClick={onFechar}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header do carrinho */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex items-center justify-between">
          <h2 id="titulo-carrinho" className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart size={28} aria-hidden="true" />
            Seu Carrinho
          </h2>
          <button
            onClick={onFechar}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de produtos no carrinho */}
        <div className="flex-1 overflow-y-auto p-6">
          {carrinho.length === 0 ? (
            <div className="text-center py-12" role="status">
              <Heart className="mx-auto text-gray-300 mb-4" size={64} aria-hidden="true" />
              <p className="text-gray-500 text-lg mb-2">Seu carrinho está vazio</p>
              <p className="text-gray-400 text-sm mb-4">Adicione produtos lindos para sua princesa! 🎀</p>
              <button
                onClick={onFechar}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            <div className="space-y-3" role="list" aria-label="Itens no carrinho">
              {carrinho.map(item => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all" 
                  role="listitem"
                >
                  <img 
                    src={item.imagem} 
                    alt={`Miniatura de ${item.nome}`}
                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{item.nome}</h3>
                    <p className="text-xs text-gray-500">Tamanho {item.tamanho} • {item.material}</p>
                    <p className="text-purple-600 font-bold text-lg" aria-label={`Preço unitário: ${item.preco.toFixed(2)} reais`}>
                      R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                  
                  {/* Controles de quantidade */}
                  <div className="flex items-center gap-2" role="group" aria-label="Controle de quantidade">
                    <button
                      onClick={() => onAlterarQuantidade(item.id, item.quantidade - 1)}
                      className="bg-white p-2 rounded-full hover:bg-purple-100 shadow transition-all"
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-800" aria-label={`Quantidade: ${item.quantidade}`}>
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() => onAlterarQuantidade(item.id, item.quantidade + 1)}
                      className="bg-white p-2 rounded-full hover:bg-purple-100 shadow transition-all"
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  {/* Botão remover */}
                  <button
                    onClick={() => onRemover(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all"
                    aria-label={`Remover ${item.nome} do carrinho`}
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer do carrinho com total e botão de envio */}
        {carrinho.length > 0 && (
          <div className="border-t p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span 
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                aria-label={`Valor total: ${calcularTotal().toFixed(2)} reais`}
              >
                R$ {calcularTotal().toFixed(2)}
              </span>
            </div>
            <button
              onClick={onEnviarWhatsApp}
              disabled={carregando}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Enviar orçamento pelo WhatsApp"
            >
              {carregando ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={24} aria-hidden="true" />
                  Enviar Orçamento no WhatsApp
                </>
              )}
            </button>
            <p className="text-xs text-center text-gray-500 mt-3">
              📦 Frete calculado no WhatsApp com base no tamanho e quantidade
            </p>
          </div>
        )}
      </div>
    </div>
  );
}