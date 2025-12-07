import React, { useState, useEffect } from "react";
import { Send, ChevronRight, AlertCircle } from "lucide-react";

// Importar componentes
import Header from "../components/Header";
import MenuLateral from "../components/MenuLateral";
import MenuMobile from "../components/MenuMobile";
import CardProduto from "../components/CardProduto";
import ModalDetalhes from "../components/ModalDetalhes";
import Carrinho from "../components/Carrinho";
import Notificacao from "../components/Notificacao";
import Footer from "../components/Footer";
import BotaoVoltarTopo from "../components/BotaoVoltarTopo";
import { buscarProdutos } from "../services/produtoService";

export default function LojaPrincipal() {
  // ========== ESTADOS DO COMPONENTE ==========
  const [carrinho, setCarrinho] = useState([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [bannerAtual, setBannerAtual] = useState(0);
  const [menuLateralAberto, setMenuLateralAberto] = useState(false);
  const [produtosMostrados, setProdutosMostrados] = useState(6);
  const [notificacao, setNotificacao] = useState({
    mensagem: "",
    tipo: "info",
    visivel: false,
  });
  const [carregando, setCarregando] = useState(false);
  const [produtoDetalhes, setProdutoDetalhes] = useState(null);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroTamanho, setFiltroTamanho] = useState("Todos");
  const [filtroPreco, setFiltroPreco] = useState("Todos");
  const [freteCalculado, setFreteCalculado] = useState(null);

  //  Estados para produtos do Firebase
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);

  // ========== BANNERS (DEFINITIVO) ==========
  const banners = [
    {
      id: 1,
      imagem:
        "https://images.unsplash.com/photo-1522512115668-c09775d6f424?w=800",
      titulo: "Novidades chegando! 🎀",
      subtitulo: "Confira os lançamentos",
    },
    {
      id: 2,
      imagem:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800",
      titulo: "Promoções especiais! ✨",
      subtitulo: "Produtos com desconto",
    },
  ];

  // ========== EFEITO: BUSCAR PRODUTOS DO FIREBASE ==========
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setCarregandoProdutos(true);
    const result = await buscarProdutos();

    if (result.success) {
      setProdutos(result.produtos);
    } else {
      mostrarNotificacao("Erro ao carregar produtos", "erro");
    }

    setCarregandoProdutos(false);
  };

  // ========== PREPARAÇÃO DE DADOS ==========
  const categorias = ["Todos", ...new Set(produtos.map((p) => p.categoria))];

  // ========== EFEITO: ROTAÇÃO AUTOMÁTICA DE BANNERS ==========
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerAtual((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // CARREGAR carrinho salvo ao abrir o site
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho-atelie");
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
        console.log("✅ Carrinho carregado do localStorage");
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
        localStorage.removeItem("carrinho-atelie");
      }
    }
  }, []);

  // SALVAR carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (carrinho.length > 0) {
      localStorage.setItem("carrinho-atelie", JSON.stringify(carrinho));
      console.log("💾 Carrinho salvo no localStorage");
    }
  }, [carrinho]);

  // ========== FILTRAGEM DE PRODUTOS ==========
  const produtosFiltrados = produtos.filter((produto) => {
    const passaCategoria =
      categoriaAtiva === "Todos"
        ? true
        : categoriaAtiva === "Promoções"
        ? produto.promocao
        : produto.categoria === categoriaAtiva;

    const passaPesquisa =
      termoPesquisa === ""
        ? true
        : produto.nome?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
          produto.material
            ?.toLowerCase()
            .includes(termoPesquisa.toLowerCase()) ||
          produto.detalhes?.toLowerCase().includes(termoPesquisa.toLowerCase());

    const passaTamanho =
      filtroTamanho === "Todos" ? true : produto.tamanho === filtroTamanho;

    let passaPreco = true;
    if (filtroPreco === "Ate20") {
      passaPreco = produto.preco <= 20;
    } else if (filtroPreco === "De20a30") {
      passaPreco = produto.preco > 20 && produto.preco <= 30;
    } else if (filtroPreco === "De30a40") {
      passaPreco = produto.preco > 30 && produto.preco <= 40;
    } else if (filtroPreco === "Acima40") {
      passaPreco = produto.preco > 40;
    }

    return passaCategoria && passaPesquisa && passaTamanho && passaPreco;
  });

  const produtosVisiveis = produtosFiltrados.slice(0, produtosMostrados);
  const temMaisProdutos = produtosMostrados < produtosFiltrados.length;

  // ========== FUNÇÕES DE NOTIFICAÇÃO ==========
  const mostrarNotificacao = (mensagem, tipo = "info") => {
    setNotificacao({ mensagem, tipo, visivel: true });
  };

  const fecharNotificacao = () => {
    setNotificacao({ ...notificacao, visivel: false });
  };

  // ========== FUNÇÕES DO CARRINHO ==========
  const adicionarAoCarrinho = (produto) => {
    try {
      const itemExistente = carrinho.find((item) => item.id === produto.id);

      if (itemExistente) {
        setCarrinho(
          carrinho.map((item) =>
            item.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        );
        mostrarNotificacao(
          `${produto.nome} - quantidade atualizada! 🎀`,
          "sucesso"
        );
      } else {
        setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
        mostrarNotificacao(
          `${produto.nome} adicionado ao carrinho! ✨`,
          "sucesso"
        );
      }
    } catch (error) {
      mostrarNotificacao("Erro ao adicionar produto. Tente novamente.", "erro");
      console.error("Erro ao adicionar ao carrinho:", error);
    }
  };

  const removerDoCarrinho = (produtoId) => {
    try {
      const produto = carrinho.find((item) => item.id === produtoId);
      setCarrinho(carrinho.filter((item) => item.id !== produtoId));
      mostrarNotificacao(`${produto.nome} removido do carrinho`, "info");
    } catch (error) {
      mostrarNotificacao("Erro ao remover produto. Tente novamente.", "erro");
      console.error("Erro ao remover do carrinho:", error);
    }
  };

  const alterarQuantidade = (produtoId, novaQuantidade) => {
    try {
      if (novaQuantidade < 0) {
        mostrarNotificacao("Quantidade inválida", "erro");
        return;
      }

      if (novaQuantidade === 0) {
        removerDoCarrinho(produtoId);
      } else {
        setCarrinho(
          carrinho.map((item) =>
            item.id === produtoId
              ? { ...item, quantidade: novaQuantidade }
              : item
          )
        );
      }
    } catch (error) {
      mostrarNotificacao(
        "Erro ao alterar quantidade. Tente novamente.",
        "erro"
      );
      console.error("Erro ao alterar quantidade:", error);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  };

  const enviarParaWhatsApp = () => {
    try {
      if (carrinho.length === 0) {
        mostrarNotificacao(
          "Adicione produtos ao carrinho antes de enviar",
          "erro"
        );
        return;
      }

      setCarregando(true);
      const telefone = "5584999666276";
      let mensagem = "🎀 *ORÇAMENTO - ATELIÊ DA LAURA* 🎀\n\n";

      carrinho.forEach((item) => {
        mensagem += `• ${item.nome}\n`;
        mensagem += `  Tamanho: ${item.tamanho} | Material: ${item.material}\n`;
        mensagem += `  Quantidade: ${item.quantidade}\n`;
        mensagem += `  Valor unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `  Subtotal: R$ ${(item.preco * item.quantidade).toFixed(
          2
        )}\n\n`;
      });

      const subtotal = calcularTotal();
      mensagem += `*SUBTOTAL PRODUTOS: R$ ${subtotal.toFixed(2)}*\n`;

      if (freteCalculado) {
        mensagem += `*FRETE (${
          freteCalculado.nome
        }):* R$ ${freteCalculado.valor.toFixed(2)}\n`;
        mensagem += `*Prazo de entrega:* ${freteCalculado.prazo}\n`;
        mensagem += `*TOTAL COM FRETE: R$ ${(
          subtotal + freteCalculado.valor
        ).toFixed(2)}*\n\n`;
      } else {
        mensagem += `\n`;
      }

      mensagem += "Gostaria de finalizar este pedido! 💕";

      const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
        mensagem
      )}`;
      window.open(url, "_blank");

      mostrarNotificacao("Redirecionando para o WhatsApp... 💬", "sucesso");
      setTimeout(() => setCarregando(false), 1000);
    } catch (error) {
      setCarregando(false);
      mostrarNotificacao("Erro ao enviar orçamento. Tente novamente.", "erro");
      console.error("Erro ao enviar para WhatsApp:", error);
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
    mostrarNotificacao(`Mostrando: ${categoria}`, "info");
  };

  // ========== CÁLCULO: TOTAL DE ITENS NO CARRINHO ==========
  const totalItens = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // ============================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ============================================================================
  return (
    <>
      <BotaoVoltarTopo />

      <div className="min-h-screen font-['Quicksand'] mt-28">
        <Notificacao
          mensagem={notificacao.mensagem}
          tipo={notificacao.tipo}
          visivel={notificacao.visivel}
          onFechar={fecharNotificacao}
        />
        
        <Header
          totalItens={totalItens}
          onAbrirCarrinho={() => setMostrarCarrinho(true)}
          onAbrirMenu={() => setMenuLateralAberto(!menuLateralAberto)}
          menuAberto={menuLateralAberto}
          banners={banners}
          bannerAtual={bannerAtual}
        />
        
        <div className="container mx-auto px-4 py-8 flex gap-6">
          {/* Menu Lateral Desktop - COM ANIMAÇÃO */}
          <div className="animate-fade-in">
            <MenuLateral
              categorias={categorias}
              categoriaAtiva={categoriaAtiva}
              onSelecionarCategoria={selecionarCategoria}
            />
          </div>

          <MenuMobile
            aberto={menuLateralAberto}
            onFechar={() => setMenuLateralAberto(false)}
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            onSelecionarCategoria={selecionarCategoria}
          />

          <main className="flex-1" role="main">
            {/* Banner Hero - COM ANIMAÇÃO SLIDE ESQUERDA */}
            <section className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-500 rounded-3xl p-8 md:p-12 mb-8 shadow-xl text-center relative overflow-hidden animate-slide-in-left">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              ></div>

              <div
                className="absolute inset-0 bg-white rounded-3xl"
                style={{
                  animation: "softPulse 2s ease-in-out infinite",
                }}
              ></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Laços que Encantam
                  <span
                    className="inline-block ml-2"
                    style={{ filter: "hue-rotate(270deg)" }}
                  >
                    🎀
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white mb-6 font-light">
                  Deixe sua pequena ainda mais linda com nossos acessórios
                  exclusivos!
                </p>
                <a
                  href="https://wa.me/5584999666276?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20laços%20do%20Ateliê%20da%20Laura!%20💕🎀"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Send size={20} />
                  Fale Comigo no WhatsApp
                </a>
              </div>
            </section>

            {/* Barra de Pesquisa e Filtros - COM ANIMAÇÃO SLIDE DIREITA */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-slide-in-right">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="pesquisa"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    🔍 Pesquisar
                  </label>
                  <input
                    id="pesquisa"
                    type="text"
                    placeholder="Buscar por nome, material..."
                    value={termoPesquisa}
                    onChange={(e) => setTermoPesquisa(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tamanho"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    📏 Tamanho
                  </label>
                  <select
  id="tamanho"
  value={filtroTamanho}
  onChange={(e) => setFiltroTamanho(e.target.value)}
  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white cursor-pointer"
>
  <option value="Todos">Todos os Tamanhos</option>
  <option value="PP">PP-24cm (4cm)</option>
  <option value="P">P-40cm (6cm)</option>
  <option value="M">M-45cm (8cm)</option>
  <option value="G">G-65cm (9cm)</option>
  <option value="GG">GG-70cm (12cm)</option>
  <option value="Max">Max-90cm (15cm)</option>
</select>
                </div>

                <div>
                  <label
                    htmlFor="preco"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    💰 Preço
                  </label>
                  <select
                    id="preco"
                    value={filtroPreco}
                    onChange={(e) => setFiltroPreco(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all bg-white cursor-pointer"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Ate20">Até R$ 20</option>
                    <option value="De20a30">R$ 20 - R$ 30</option>
                    <option value="De30a40">R$ 30 - R$ 40</option>
                    <option value="Acima40">Acima de R$ 40</option>
                  </select>
                </div>
              </div>

              {(termoPesquisa ||
                filtroTamanho !== "Todos" ||
                filtroPreco !== "Todos") && (
                <button
                  onClick={() => {
                    setTermoPesquisa("");
                    setFiltroTamanho("Todos");
                    setFiltroPreco("Todos");
                    mostrarNotificacao("Filtros limpos!", "info");
                  }}
                  className="mt-4 text-purple-600 hover:text-purple-700 font-semibold text-sm"
                >
                  ✖ Limpar filtros
                </button>
              )}
            </div>

            {/* LOADING COM ANIMAÇÃO */}
            {carregandoProdutos ? (
              <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                <div className="relative w-32 h-32 mb-6">
                  <div
                    className="absolute inset-0 animate-spin"
                    style={{ animationDuration: "3s" }}
                  >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `rotate(${
                            i * 60
                          }deg) translateY(-40px) translateX(-12px)`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                <p className="text-purple-600 font-semibold text-lg mb-2">
                  Carregando lacinhos lindos...
                </p>
                <p className="text-gray-500 text-sm">Aguarde um pouquinho 💜</p>
              </div>
            ) : (
              <>
                {/* Grade de Produtos - COM ANIMAÇÃO ESCALONADA */}
                <section aria-label={`Produtos na categoria ${categoriaAtiva}`}>
                  {produtosVisiveis.length === 0 ? (
                    <div className="text-center py-12 animate-fade-in">
                      <AlertCircle
                        className="mx-auto text-gray-300 mb-4"
                        size={64}
                        aria-hidden="true"
                      />
                      <p className="text-gray-500 text-lg">
                        Nenhum produto encontrado
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {produtosVisiveis.map((produto, index) => (
                        <CardProduto
                          key={produto.id}
                          produto={produto}
                          index={index}
                          onAdicionar={adicionarAoCarrinho}
                          onVerDetalhes={abrirDetalhes}
                        />
                      ))}
                    </div>
                  )}
                </section>

                {/* Botão Mostrar Mais - COM ANIMAÇÃO */}
                {temMaisProdutos && (
                  <div className="text-center mt-8 animate-fade-in">
                    <button
                      onClick={() => {
                        setProdutosMostrados((prev) => prev + 6);
                        mostrarNotificacao(
                          "Carregando mais produtos...",
                          "info"
                        );
                      }}
                      className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-2 mx-auto hover:scale-105"
                      aria-label="Carregar mais produtos"
                    >
                      Ver Mais Produtos
                      <ChevronRight size={20} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
        
        <ModalDetalhes
          produto={produtoDetalhes}
          visivel={mostrarDetalhes}
          onFechar={fecharDetalhes}
          onAdicionar={adicionarAoCarrinho}
        />
        
        <Carrinho
          visivel={mostrarCarrinho}
          onFechar={() => setMostrarCarrinho(false)}
          carrinho={carrinho}
          onAlterarQuantidade={alterarQuantidade}
          onRemover={removerDoCarrinho}
          onEnviarWhatsApp={enviarParaWhatsApp}
          carregando={carregando}
          freteCalculado={freteCalculado}
          onFreteCalculado={setFreteCalculado}
        />
        
        <Footer />
      </div>
    </>
  );
}