import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { buscarProdutos } from '../services/produtoService';
import ProdutoLista from './ProdutoLista';
import ProdutoForm from './ProdutoForm';
import Borboletas from "../components/Borboletas";


export default function Dashboard() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const BorboletaIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="inline-block">
    <ellipse cx="30" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="70" cy="40" rx="20" ry="30" fill="#c084fc" opacity="0.8"/>
    <ellipse cx="50" cy="50" rx="8" ry="25" fill="#9333ea"/>
    <line x1="50" y1="25" x2="45" y2="15" stroke="#9333ea" strokeWidth="2"/>
    <line x1="50" y1="25" x2="55" y2="15" stroke="#9333ea" strokeWidth="2"/>
  </svg>
);

  // Carrega produtos ao montar
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    setCarregando(true);
    const result = await buscarProdutos();
    
    if (result.success) {
      setProdutos(result.produtos);
    }
    
    setCarregando(false);
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/admin/login');
    }
  };

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setMostrarForm(true);
  };

  const handleEditarProduto = (produto) => {
    setProdutoEditando(produto);
    setMostrarForm(true);
  };

  const handleFecharForm = () => {
    setMostrarForm(false);
    setProdutoEditando(null);
  };

  const handleSalvarProduto = () => {
    handleFecharForm();
    carregarProdutos();
  };

  return (
  <div className="min-h-screen font-['Quicksand'] ">

    <Borboletas />

    {/* HEADER COM SLIDE */}
    <header className="bg-gradient-to-r via-purple-300 from-violet-200 to-purple-300 
      text-purple-800 shadow-lg sticky top-0 z-40 produto-animado" >
      
      <div className="container mx-auto px-4 py-4 produto-animado">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            <BorboletaIcon />

            <div>
              <h1 className="text-2xl font-bold">Painel Admin</h1>
              <p className="text-sm text-purple-700">Ateliê da Laura</p>
            </div>
          </div>

          <div className="flex items-center gap-4 animate-slide-in-right">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{user?.email}</p>
              <p className="text-xs text-purple-700">Administrador</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-30 hover:bg-opacity-30 
              px-4 py-2 rounded-xl transition-all flex items-center gap-2
              hover:scale-105 animate-fade-in"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>

        </div>
      </div>
      
    </header>

    {/* CONTEÚDO PRINCIPAL */}
    <div className="container mx-auto px-4 py-8 animate-fade-in-slow">

      {!mostrarForm && (
        <div className="mb-6 produto-animado">
          <button
            onClick={handleNovoProduto}
            className="bg-gradient-to-r from-purple-600 to-purple-400 
            text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl 
            transition-all flex items-center gap-2 hover:scale-105 produto-animado"
          >
            <Plus size={20} />
            Adicionar Novo Produto
          </button>
        </div>
      )}

      {/* Formulário e Lista */}
      {mostrarForm ? (
        <div className="animate-slide-in-right-slow">
          <ProdutoForm
            produto={produtoEditando}
            onSalvar={handleSalvarProduto}
            onCancelar={handleFecharForm}
          />
        </div>
      ) : carregando ? (
        <div className="flex items-center justify-center py-20">
          <Loader className="animate-spin text-purple-600" size={48} />
        </div>
      ) : (
        <div className="animate-fade-in-slow">
          <ProdutoLista
            produtos={produtos}
            onEditar={handleEditarProduto}
            onAtualizar={carregarProdutos}
          />
        </div>
      )}

    </div>
  </div>
);

}