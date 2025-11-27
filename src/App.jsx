import React, { useState, useEffect } from 'react';
import { ShoppingCart, Instagram, X, Plus, Minus, Send, Sparkles, Heart, Star, Gift, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';

// ============================================================================
// DADOS DOS PRODUTOS
// ============================================================================
// Array com todos os produtos disponíveis na loja
// A Laura pode editar diretamente aqui: nome, preço, categoria e se está em promoção
const produtos = [
  { id: 1, nome: "Laço festa", preco: 49.99, imagem: "/public/produtos/laco-festa.jpeg", categoria: "Laços", promocao: false },
  { id: 2, nome: "Faixa RN festa", preco: 35.99, imagem: "/public/produtos/faixa-rn-festa.jpeg", categoria: "Tiaras", promocao: true },
  { id: 3, nome: "Parzinho festa", preco: 39.99, imagem: "/public/produtos/parzinho-festa.jpeg", categoria: "Kits", promocao: false },
  { id: 4, nome: "Laço festa Jesus", preco: 21.99, imagem: "/public/produtos/laco-festa-jesus.jpeg", categoria: "Laços", promocao: false },
  { id: 5, nome: "Tiara festa", preco: 29.99, imagem: "/public/produtos/tiara-festa.jpeg", categoria: "Presilhas", promocao: true },
  { id: 6, nome: "Laço em linho", preco: 24.99, imagem: "/public/produtos/laço-em-linho.jpeg", categoria: "Faixas", promocao: false },
  { id: 7, nome: "Laço em cetim", preco: 29.99, imagem: "/public/produtos/laço-em-cetim.jpeg", categoria: "Laços", promocao: false },
  { id: 8, nome: "Laco Itiele", preco: 19.99, imagem: "/public/produtos/laco-itiele.jpeg", categoria: "Tiaras", promocao: true },
  { id: 9, nome: "Laço Itiele cetim", preco: 14.99, imagem: "/public/produtos/laco-itiele-cetim.jpeg", categoria: "Tiaras", promocao: true },

];

// ============================================================================
// BANNERS ROTATIVOS
// ============================================================================
// Mensagens que aparecem rotacionando no header
const banners = [
  { texto: "🎀 Laços Exclusivos para sua Princesa", cor: "from-purple-400 to-pink-400" },
  { texto: "✨ Frete Grátis acima de R$ 100", cor: "from-pink-400 to-purple-400" },
  { texto: "💕 Feito com Amor e Carinho", cor: "from-purple-300 to-pink-300" }
];

// ============================================================================
// COMPONENTE DE NOTIFICAÇÃO
// ============================================================================
// Componente para mostrar feedback visual ao usuário (sucesso, erro, info)
const Notificacao = ({ mensagem, tipo, visivel, onFechar }) => {
  useEffect(() => {
    if (visivel) {
      const timer = setTimeout(() => {
        onFechar();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visivel, onFechar]);

  if (!visivel) return null;

  const estilos = {
    sucesso: 'bg-green-500',
    erro: 'bg-red-500',
    info: 'bg-blue-500'
  };

  const icones = {
    sucesso: <CheckCircle size={20} />,
    erro: <AlertCircle size={20} />,
    info: <AlertCircle size={20} />
  };

  return (
    <div 
      role="alert"
      aria-live="polite"
      className={`fixed top-24 right-4 ${estilos[tipo]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-in max-w-md`}
    >
      {icones[tipo]}
      <span className="font-medium">{mensagem}</span>
      <button 
        onClick={onFechar}
        className="ml-2 hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all"
        aria-label="Fechar notificação"
      >
        <X size={18} />
      </button>
    </div>
  );
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function AtelieDaLaura() {
  // ========== ESTADOS DO COMPONENTE ==========
  const [carrinho, setCarrinho] = useState([]); // Itens no carrinho
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false); // Controla modal do carrinho
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos'); // Filtro de categoria ativo
  const [bannerAtual, setBannerAtual] = useState(0); // Índice do banner rotativo
  const [menuLateralAberto, setMenuLateralAberto] = useState(false); // Menu mobile
  const [produtosMostrados, setProdutosMostrados] = useState(6); // Paginação
  const [notificacao, setNotificacao] = useState({ mensagem: '', tipo: 'info', visivel: false }); // Feedback ao usuário
  const [carregando, setCarregando] = useState(false); // Loading state

  // ========== PREPARAÇÃO DE DADOS ==========
  // Extrai categorias únicas dos produtos
  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria))];

  // ========== EFEITO: ROTAÇÃO AUTOMÁTICA DE BANNERS ==========
  // Troca o banner a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerAtual((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ========== FILTRAGEM DE PRODUTOS ==========
  // Filtra produtos baseado na categoria selecionada
  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? produtos 
    : categoriaAtiva === 'Promoções'
    ? produtos.filter(p => p.promocao)
    : produtos.filter(p => p.categoria === categoriaAtiva);

  // Produtos visíveis na página atual (paginação)
  const produtosVisiveis = produtosFiltrados.slice(0, produtosMostrados);
  const temMaisProdutos = produtosMostrados < produtosFiltrados.length;

  // ========== FUNÇÃO: MOSTRAR NOTIFICAÇÃO ==========
  const mostrarNotificacao = (mensagem, tipo = 'info') => {
    setNotificacao({ mensagem, tipo, visivel: true });
  };

  // ========== FUNÇÃO: FECHAR NOTIFICAÇÃO ==========
  const fecharNotificacao = () => {
    setNotificacao({ ...notificacao, visivel: false });
  };

  // ========== FUNÇÃO: ADICIONAR PRODUTO AO CARRINHO ==========
  // Adiciona produto ou incrementa quantidade se já existir
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

  // ========== FUNÇÃO: REMOVER PRODUTO DO CARRINHO ==========
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

  // ========== FUNÇÃO: ALTERAR QUANTIDADE NO CARRINHO ==========
  // Valida e atualiza a quantidade de um item
  const alterarQuantidade = (produtoId, novaQuantidade) => {
    try {
      // Validação: quantidade não pode ser negativa
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

  // ========== FUNÇÃO: CALCULAR TOTAL DO CARRINHO ==========
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // ========== FUNÇÃO: ENVIAR ORÇAMENTO PARA WHATSAPP ==========
  // Formata mensagem e envia para WhatsApp
  const enviarParaWhatsApp = () => {
    try {
      // Validação: carrinho não pode estar vazio
      if (carrinho.length === 0) {
        mostrarNotificacao('Adicione produtos ao carrinho antes de enviar', 'erro');
        return;
      }

      setCarregando(true);
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
      
      mostrarNotificacao('Redirecionando para o WhatsApp... 💬', 'sucesso');
      setTimeout(() => setCarregando(false), 1000);
    } catch (error) {
      setCarregando(false);
      mostrarNotificacao('Erro ao enviar orçamento. Tente novamente.', 'erro');
      console.error('Erro ao enviar para WhatsApp:', error);
    }
  };

  // ========== CÁLCULO: TOTAL DE ITENS NO CARRINHO ==========
  const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

  // ============================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 font-['Quicksand']">
      {/* ========== NOTIFICAÇÃO DE FEEDBACK ========== */}
      <Notificacao 
        mensagem={notificacao.mensagem}
        tipo={notificacao.tipo}
        visivel={notificacao.visivel}
        onFechar={fecharNotificacao}
      />

      {/* ========== HEADER PRINCIPAL ========== */}
      {/* Header fixo com efeito glassmorphism e menu de navegação */}
      <header className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <nav className="container mx-auto px-4 py-3" aria-label="Navegação principal">
          <div className="flex items-center justify-between">
            {/* Botão de menu mobile */}
            <button 
              onClick={() => setMenuLateralAberto(!menuLateralAberto)}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
              aria-label={menuLateralAberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuLateralAberto}
              aria-controls="menu-lateral"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </button>

            {/* Logo e título */}
            <div className="flex items-center gap-3">
              <Sparkles className="text-yellow-200" size={28} aria-hidden="true" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-wide">Ateliê da Laura</h1>
                <p className="text-xs text-red-100 font-light">Feito com Amor ✨</p>
              </div>
            </div>
            
            {/* Ações do header */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/ateliedalauraoficial/" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform hidden md:block"
                aria-label="Visite nosso Instagram (abre em nova aba)"
              >
                <Instagram size={26} />
              </a>
              
              {/* Botão do carrinho */}
              <button
                onClick={() => setMostrarCarrinho(true)}
                className="relative bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                aria-label={`Carrinho de compras com ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
              >
                <ShoppingCart size={22} />
                {totalItens > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse" aria-hidden="true">
                    {totalItens}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* ========== BANNER ROTATIVO ========== */}
        {/* Mensagens informativas que alternam automaticamente */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-600 py-2" role="region" aria-label="Promoções e informações">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium transition-all duration-1000 ${
                index === bannerAtual ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {banner.texto}
            </div>
          ))}
        </div>
      </header>

      {/* ========== CONTEÚDO PRINCIPAL ========== */}
      <div className="container mx-auto px-4 py-8 flex gap-6">
        {/* ========== MENU LATERAL DESKTOP ========== */}
        {/* Menu de categorias fixo visível apenas em telas grandes */}
        <aside className="hidden lg:block w-64 flex-shrink-0" aria-label="Categorias de produtos">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Gift size={24} aria-hidden="true" />
              Categorias
            </h2>
            <nav aria-label="Filtrar por categoria">
              <ul className="space-y-2">
                {['Todos', 'Promoções', ...categorias.filter(c => c !== 'Todos')].map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setCategoriaAtiva(cat);
                        setProdutosMostrados(6);
                        mostrarNotificacao(`Mostrando: ${cat}`, 'info');
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group ${
                        categoriaAtiva === cat
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'hover:bg-purple-50 text-gray-700'
                      }`}
                      aria-current={categoriaAtiva === cat ? 'page' : undefined}
                    >
                      <span className="font-medium">{cat}</span>
                      {cat === 'Promoções' && (
                        <Star size={16} className="text-yellow-400" aria-label="Em promoção" />
                      )}
                      <ChevronRight size={18} className={`transition-transform ${
                        categoriaAtiva === cat ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`} aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Card informativo */}
            <div className="mt-6 p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl" role="complementary">
              <Heart className="text-red-500 mx-auto mb-2" size={32} aria-hidden="true" />
              <p className="text-sm text-center text-gray-700 font-medium">
                Cada peça é feita com muito carinho especialmente para sua princesa! 💕
              </p>
            </div>
          </div>
        </aside>

        {/* ========== MENU LATERAL MOBILE ========== */}
        {/* Menu drawer que abre na lateral em dispositivos móveis */}
        {menuLateralAberto && (
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" 
            onClick={() => setMenuLateralAberto(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de categorias"
          >
            <aside 
              id="menu-lateral"
              className="bg-white w-72 h-full shadow-2xl p-6 overflow-y-auto" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                  <Gift size={24} aria-hidden="true" />
                  Categorias
                </h2>
                <button 
                  onClick={() => setMenuLateralAberto(false)} 
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  aria-label="Fechar menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav aria-label="Filtrar por categoria">
                <ul className="space-y-2">
                  {['Todos', 'Promoções', ...categorias.filter(c => c !== 'Todos')].map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => {
                          setCategoriaAtiva(cat);
                          setProdutosMostrados(6);
                          setMenuLateralAberto(false);
                          mostrarNotificacao(`Mostrando: ${cat}`, 'info');
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${
                          categoriaAtiva === cat
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'hover:bg-purple-50 text-gray-700'
                        }`}
                        aria-current={categoriaAtiva === cat ? 'page' : undefined}
                      >
                        <span className="font-medium">{cat}</span>
                        {cat === 'Promoções' && <Star size={16} className="text-yellow-400" aria-label="Em promoção" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        )}

        {/* ========== ÁREA DE CONTEÚDO PRINCIPAL ========== */}
        <main className="flex-1" role="main">
          {/* ========== BANNER HERO ========== */}
          {/* Banner de destaque no topo da página */}
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
                href="https://wa.me/5584999666276" 
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

          {/* ========== GRADE DE PRODUTOS ========== */}
          {/* Lista de produtos em grid responsivo */}
          <section aria-label={`Produtos na categoria ${categoriaAtiva}`}>
            {produtosVisiveis.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto text-gray-300 mb-4" size={64} aria-hidden="true" />
                <p className="text-gray-500 text-lg">Nenhum produto encontrado nesta categoria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {produtosVisiveis.map(produto => (
                  <article 
                    key={produto.id} 
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all overflow-hidden group relative"
                  >
                    {/* Badge de promoção */}
                    {produto.promocao && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1 animate-bounce">
                        <Star size={14} fill="white" aria-hidden="true" />
                        Promoção
                      </div>
                    )}
                    
                    {/* Imagem do produto */}
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                      <img 
                        src={produto.imagem} 
                        alt={`Foto do produto ${produto.nome}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Informações do produto */}
                    <div className="p-4">
                      <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {produto.categoria}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">
                        {produto.nome}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-bold text-purple-600" aria-label={`Preço: ${produto.preco.toFixed(2)} reais`}>
                          R$ {produto.preco.toFixed(2)}
                        </span>
                        <button
                          onClick={() => adicionarAoCarrinho(produto)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all flex items-center gap-2 text-sm font-semibold hover:scale-105"
                          aria-label={`Adicionar ${produto.nome} ao carrinho`}
                        >
                          <Plus size={16} aria-hidden="true" />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* ========== BOTÃO MOSTRAR MAIS ========== */}
          {/* Paginação: carrega mais produtos ao clicar */}
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

      {/* ========== MODAL DO CARRINHO ========== */}
      {/* Dialog modal para visualizar e gerenciar o carrinho */}
      {mostrarCarrinho && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-carrinho"
          onClick={() => setMostrarCarrinho(false)}
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header do carrinho */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex items-center justify-between">
              <h2 id="titulo-carrinho" className="text-2xl font-bold flex items-center gap-2">
                <ShoppingCart size={28} aria-hidden="true" />
                Seu Carrinho
              </h2>
              <button
                onClick={() => setMostrarCarrinho(false)}
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
                    onClick={() => setMostrarCarrinho(false)}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-3" role="list" aria-label="Itens no carrinho">
                  {carrinho.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all" role="listitem">
                      <img 
                        src={item.imagem} 
                        alt={`Miniatura de ${item.nome}`}
                        className="w-20 h-20 object-cover rounded-xl shadow-md"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm">{item.nome}</h3>
                        <p className="text-purple-600 font-bold text-lg" aria-label={`Preço unitário: ${item.preco.toFixed(2)} reais`}>
                          R$ {item.preco.toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Controles de quantidade */}
                      <div className="flex items-center gap-2" role="group" aria-label="Controle de quantidade">
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                          className="bg-white p-2 rounded-full hover:bg-purple-100 shadow transition-all"
                          aria-label={`Diminuir quantidade de ${item.nome}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-gray-800" aria-label={`Quantidade: ${item.quantidade}`}>
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                          className="bg-white p-2 rounded-full hover:bg-purple-100 shadow transition-all"
                          aria-label={`Aumentar quantidade de ${item.nome}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {/* Botão remover */}
                      <button
                        onClick={() => removerDoCarrinho(item.id)}
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
                  onClick={enviarParaWhatsApp}
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
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========== FOOTER ========== */}
      {/* Rodapé com informações e links */}
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
              href="https://wa.me/5584999666276" 
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
    </div>
  );
}