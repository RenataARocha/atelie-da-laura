import React, { useState, useEffect } from 'react';
import { Send, ChevronRight, AlertCircle } from 'lucide-react';

// Importar componentes
import Header from './components/Header';
import MenuLateral from './components/MenuLateral';
import MenuMobile from './components/MenuMobile';
import CardProduto from './components/CardProduto';
import ModalDetalhes from './components/ModalDetalhes';
import Carrinho from './components/Carrinho';
import Notificacao from './components/Notificação';
import Footer from './components/Footer';

// Importar dados
import { produtos, banners } from './data/produtos';

export default function AtelieDaLaura() {
  // ========== ESTADOS DO COMPONENTE ==========
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [bannerAtual, setBannerAtual] = useState(0);
  const [menuLateralAberto, setMenuLateralAberto] = useState(false);
  const [produtosMostrados, setProdutosMostrados] = useState(6);
  const [notificacao, setNotificacao] = useState({ mensagem: '', tipo: 'info', visivel: false });
  const [carregando, setCarregando] = useState(false);
  const [produtoDetalhes, setProdutoDetalhes] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  // ========== PREPARAÇÃO DE DADOS ==========
  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria))];

  // ========== EFEITO: ROTAÇÃO AUTOMÁTICA DE BANNERS ==========
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerAtual((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ========== FILTRAGEM DE PRODUTOS ==========
  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? produtos 
    : categoriaAtiva === 'Promoções'
    ? produtos.filter(p => p.promocao)
    : produtos.filter(p => p.categoria === categoriaAtiva);

  const produtosVisiveis = produtosFiltrados.slice(0, produtosMostrados);
  const temMaisProdutos = produtosMostrados < produtosFiltrados.length;

  // ========== FUNÇÕES DE NOTIFICAÇÃO ==========
  const mostrarNotificacao = (mensagem, tipo = 'info') => {
    setNotificacao({ mensagem, tipo, visivel: true });
  };

  const fecharNotificacao = () => {
    setNotificacao({ ...notificacao, visivel: false });
  };

  // ========== FUNÇÕES DO CARRINHO ==========
  const adicionarAoCarrinho = (produto) => {
    try {
      const itemExistente = carrinho.find(item => item.id === produto.id);
      
      if (itemExistente) {
        setCarrinho(carrinho.map(item =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        ));
        mostrarNotificacao(`${produto.nome} - quantidade atualizada! 🎀`, 'sucesso');
      } else {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
        mostrarNotificacao(`${produto.nome} adicionado ao carrinho! ✨`, 'sucesso');
      }
    } catch (error) {
      mostrarNotificacao('Erro ao adicionar produto. Tente novamente.', 'erro');
      console.error('Erro ao adicionar ao carrinho:', error);
    }
  };

  const removerDoCarrinho = (produtoId) => {
    try {
      const produto = carrinho.find(item => item.id === produtoId);
      setCarrinho(carrinho.filter(item => item.id !== produtoId));
      mostrarNotificacao(`${produto.nome} removido do carrinho`, 'info');
    } catch (error) {
      mostrarNotificacao('Erro ao remover produto. Tente novamente.', 'erro');
      console.error('Erro ao remover do carrinho:', error);
    }
  };

  const alterarQuantidade = (produtoId, novaQuantidade) => {
    try {
      if (novaQuantidade < 0) {
        mostrarNotificacao('Quantidade inválida', 'erro');
        return;
      }

      if (novaQuantidade === 0) {
        removerDoCarrinho(produtoId);
      } else {
        setCarrinho(carrinho.map(item =>
          item.id === produtoId ? { ...item, quantidade: novaQuantidade } : item
        ));
      }
    } catch (error) {
      mostrarNotificacao('Erro ao alterar quantidade. Tente novamente.', 'erro');
      console.error('Erro ao alterar quantidade:', error);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const enviarParaWhatsApp = () => {
    try {
      if (carrinho.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho antes de enviar', 'erro');
        return;
      }

      setCarregando(true);
      const telefone = "5584999666276";
      let mensagem = "🎀 *ORÇAMENTO - ATELIÊ DA LAURA* 🎀\n\n";
      
      carrinho.forEach(item => {
        mensagem += `• ${item.nome}\n`;
        mensagem += `  Tamanho: ${item.tamanho} | Material: ${item.material}\n`;
        mensagem += `  Quantidade: ${item.quantidade}\n`;
        mensagem += `  Valor unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `  Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
      });
      
      mensagem += `*TOTAL: R$ ${calcularTotal().toFixed(2)}*\n\n`;
      mensagem += "Gostaria de calcular o frete e finalizar este pedido! 💕";
      
      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
      
      mostrarNotificacao('Redirecionando para o WhatsApp... 💬', 'sucesso');
      setTimeout(() => setCarregando(false), 1000);
    } catch (error) {
      setCarregando(false);
      mostrarNotificacao('Erro ao enviar orçamento. Tente novamente.', 'erro');
      console.error('Erro ao enviar para WhatsApp:', error);
    }
  };

  // ========== FUNÇÕES DE MODAL DE DETALHES ==========
  const abrirDetalhes = (produto) => {
    setProdutoDetalhes(produto);
    setMostrarDetalhes(true);
  };

  const fecharDetalhes = () => {
    setMostrarDetalhes(false);
    setProdutoDetalhes(null);
  };

  // ========== FUNÇÕES DE CATEGORIA ==========
  const selecionarCategoria = (categoria) => {
    setCategoriaAtiva(categoria);
    setProdutosMostrados(6);
    mostrarNotificacao(`Mostrando: ${categoria}`, 'info');
  };

  // ========== CÁLCULO: TOTAL DE ITENS NO CARRINHO ==========
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // ============================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-200 via-lime-100 to-lime-300 font-['Quicksand']">
      {/* Notificação */}
      <Notificacao 
        mensagem={notificacao.mensagem}
        tipo={notificacao.tipo}
        visivel={notificacao.visivel}
        onFechar={fecharNotificacao}
      />

      {/* Header */}
      <Header 
        totalItens={totalItens}
        onAbrirCarrinho={() => setMostrarCarrinho(true)}
        onAbrirMenu={() => setMenuLateralAberto(!menuLateralAberto)}
        menuAberto={menuLateralAberto}
        banners={banners}
        bannerAtual={bannerAtual}
      />

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* Menu Lateral Desktop */}
        <MenuLateral 
          categorias={categorias}
          categoriaAtiva={categoriaAtiva}
          onSelecionarCategoria={selecionarCategoria}
        />

        {/* Menu Mobile */}
        <MenuMobile 
          aberto={menuLateralAberto}
          onFechar={() => setMenuLateralAberto(false)}
          categorias={categorias}
          categoriaAtiva={categoriaAtiva}
          onSelecionarCategoria={selecionarCategoria}
        />

        {/* Área de Conteúdo Principal */}
        <main className="flex-1" role="main">
          {/* Banner Hero */}
          <section className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-3xl p-8 md:p-12 mb-8 shadow-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 animate-pulse" aria-hidden="true"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Laços que Encantam 🎀
              </h2>
              <p className="text-lg md:text-xl text-white mb-6 font-light">
                Deixe sua pequena ainda mais linda com nossos acessórios exclusivos!
              </p>
              <a 
                href="https://wa.me/5584999666276?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20laços%20💕" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                aria-label="Fale conosco pelo WhatsApp (abre em nova aba)"
              >
                <Send size={20} aria-hidden="true" />
                Fale Comigo no WhatsApp
              </a>
            </div>
          </section>

          {/* Grade de Produtos */}
          <section aria-label={`Produtos na categoria ${categoriaAtiva}`}>
            {produtosVisiveis.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto text-gray-300 mb-4" size={64} aria-hidden="true" />
                <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {produtosVisiveis.map(produto => (
                  <CardProduto 
                    key={produto.id}
                    produto={produto}
                    onAdicionar={adicionarAoCarrinho}
                    onVerDetalhes={abrirDetalhes}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Botão Mostrar Mais */}
          {temMaisProdutos && (
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setProdutosMostrados(prev => prev + 6);
                  mostrarNotificacao('Carregando mais produtos...', 'info');
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-2 mx-auto hover:scale-105"
                aria-label="Carregar mais produtos"
              >
                Ver Mais Produtos
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Detalhes */}
      <ModalDetalhes 
        produto={produtoDetalhes}
        visivel={mostrarDetalhes}
        onFechar={fecharDetalhes}
        onAdicionar={adicionarAoCarrinho}
      />

      {/* Carrinho */}
      <Carrinho 
        visivel={mostrarCarrinho}
        onFechar={() => setMostrarCarrinho(false)}
        carrinho={carrinho}
        onAlterarQuantidade={alterarQuantidade}
        onRemover={removerDoCarrinho}
        onEnviarWhatsApp={enviarParaWhatsApp}
        carregando={carregando}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}