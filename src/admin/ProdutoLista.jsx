import React, { useState } from 'react';
import { Edit, Trash2, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { excluirProduto, alternarPromocao } from '../services/produtoService';

export default function ProdutoLista({ produtos, onEditar, onAtualizar }) {
  const [carregando, setCarregando] = useState(null);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });

  const mostrarMensagem = (texto, tipo) => {
    setMensagem({ texto, tipo });
    setTimeout(() => setMensagem({ texto: '', tipo: '' }), 3000);
  };

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Tem certeza que deseja excluir "${nome}"?`)) {
      return;
    }

    setCarregando(id);
    const result = await excluirProduto(id);
    
    if (result.success) {
      mostrarMensagem(result.mensagem, 'sucesso');
      onAtualizar();
    } else {
      mostrarMensagem(result.error, 'erro');
    }
    
    setCarregando(null);
  };

  const handleAlternarPromocao = async (id, promocaoAtual) => {
    setCarregando(id);
    const result = await alternarPromocao(id, !promocaoAtual);
    
    if (result.success) {
      mostrarMensagem(result.mensagem, 'sucesso');
      onAtualizar();
    } else {
      mostrarMensagem(result.error, 'erro');
    }
    
    setCarregando(null);
  };

  if (produtos.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <AlertCircle className="mx-auto text-gray-300 mb-4" size={64} />
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          Nenhum produto cadastrado
        </h3>
        <p className="text-gray-500">
          Clique em "Adicionar Novo Produto" para começar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mensagem de Feedback */}
      {mensagem.texto && (
        <div className={`flex items-center gap-2 p-4 rounded-xl ${
          mensagem.tipo === 'sucesso' 
            ? 'bg-green-50 text-green-700 border-2 border-green-200' 
            : 'bg-red-50 text-red-700 border-2 border-red-200'
        }`}>
          {mensagem.tipo === 'sucesso' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-semibold">{mensagem.texto}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-4 produto-animado">
        <h2 className="text-2xl font-bold text-gray-800 produto-animado">
          Produtos Cadastrados ({produtos.length})
        </h2>
      </div>

      {/* Lista de Produtos - COM ANIMAÇÃO ESCALONADA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtos.map((produto, index) => (
          <div
  key={produto.id}
  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all produto-animado"
  style={{ animationDelay: `${index * 0.08}s` }}
>

            {/* Imagem */}
            <div className="relative h-48 bg-gray-100">
              <img 
                src={produto.imagem} 
                alt={produto.nome}
                className="w-full h-full object-cover"
              />
              {produto.promocao && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-bounce">
                  <Star size={14} fill="white" />
                  Promoção
                </div>
              )}
            </div>

            {/* Informações */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {produto.categoria}
                  </span>
                  <h3 className="font-bold text-gray-800 mt-2">{produto.nome}</h3>
                  <p className="text-sm text-gray-600">Tamanho {produto.tamanho}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-600">
                    R$ {produto.preco?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAlternarPromocao(produto.id, produto.promocao)}
                  disabled={carregando === produto.id}
                  className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all text-sm ${
                    produto.promocao
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } disabled:opacity-50`}
                >
                  <Star size={16} className="inline mr-1" />
                  {produto.promocao ? 'Em Promoção' : 'Promoção'}
                </button>
                
                <button
                  onClick={() => onEditar(produto)}
                  disabled={carregando === produto.id}
                  className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all disabled:opacity-50"
                  title="Editar"
                >
                  <Edit size={18} />
                </button>
                
                <button
                  onClick={() => handleExcluir(produto.id, produto.nome)}
                  disabled={carregando === produto.id}
                  className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all disabled:opacity-50"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}