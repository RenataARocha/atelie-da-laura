import React, { useState } from 'react';
import { ShoppingCart, Instagram, X, Plus, Minus, Send, Sparkles } from 'lucide-react';

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
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);

  const adicionarAoCarrinho = (produto) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
      setCarrinho(carrinho.map(item =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      ));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(carrinho.filter(item => item.id !== produtoId));
  };

  const alterarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade === 0) {
      removerDoCarrinho(produtoId);
    } else {
      setCarrinho(carrinho.map(item =>
        item.id === produtoId ? { ...item, quantidade: novaQuantidade } : item
      ));
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const enviarParaWhatsApp = () => {
    const telefone = "5584999666276";
    let mensagem = "🎀 *ORÇAMENTO - ATELIÊ DA LAURA* 🎀\n\n";
    
    carrinho.forEach(item => {
      mensagem += `• ${item.nome}\n`;
      mensagem += `  Quantidade: ${item.quantidade}\n`;
      mensagem += `  Valor unitário: R$ ${item.preco.toFixed(2)}\n`;
      mensagem += `  Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
    });
    
    mensagem += `*TOTAL: R$ ${calcularTotal().toFixed(2)}*\n\n`;
    mensagem += "Gostaria de finalizar este pedido! 💕";
    
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

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
            
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/ateliedalauraoficial/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Instagram size={26} />
              </a>
              
              <button
                onClick={() => setMostrarCarrinho(true)}
                className="relative bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-all shadow-lg"
              >
                <ShoppingCart size={22} />
                {totalItens > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {totalItens}
                  </span>
                )}
              </button>
            </div>
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
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-all flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal do Carrinho */}
      {mostrarCarrinho && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Seu Carrinho 🛍️</h2>
              <button onClick={() => setMostrarCarrinho(false)} className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {carrinho.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Seu carrinho está vazio 🎀</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carrinho.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-purple-50 p-4 rounded-xl">
                      <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">{item.nome}</h3>
                        <p className="text-purple-600 font-semibold">R$ {item.preco.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)} className="bg-white p-2 rounded-full hover:bg-gray-100">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantidade}</span>
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)} className="bg-white p-2 rounded-full hover:bg-gray-100">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button onClick={() => removerDoCarrinho(item.id)} className="text-red-500 hover:text-red-700 p-2">
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrinho.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-3xl font-bold text-purple-600">
                    R$ {calcularTotal().toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={enviarParaWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                >
                  <Send size={24} />
                  Enviar Orçamento no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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