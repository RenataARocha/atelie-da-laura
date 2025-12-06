import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, AlertCircle, Loader, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

// ⚠️ EMAILS AUTORIZADOS - Só estes podem acessar o admin
const EMAILS_AUTORIZADOS = [
  'laurinhamtv@gmail.com',
  // Adicione mais emails se precisar no futuro
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    
    // Validações básicas
    if (!email || !senha) {
      setErro('Preencha todos os campos');
      return;
    }

    // 🔒 VALIDAÇÃO DE SEGURANÇA - Email autorizado
    if (!EMAILS_AUTORIZADOS.includes(email.toLowerCase().trim())) {
      setErro('Acesso negado. Este email não tem permissão de administrador.');
      return;
    }

    setCarregando(true);

    try {
      const result = await login(email, senha);
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setErro(result.error);
      }
    } catch (error) {
      setErro('Erro ao fazer login. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 font-['Quicksand']">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sparkles className="text-purple-600" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ateliê da Laura
          </h1>
          <p className="text-gray-600">Painel Administrativo</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* E-mail */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              <Mail size={16} className="inline mr-1" />
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="senha" className="block text-sm font-bold text-gray-700 mb-2">
              <Lock size={16} className="inline mr-1" />
              Senha
            </label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              disabled={carregando}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all disabled:bg-gray-100"
            />
          </div>

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700">
              <AlertCircle size={20} className="flex-shrink-0" />
              <span className="text-sm">{erro}</span>
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {carregando ? (
              <>
                <Loader className="animate-spin" size={20} />
                Entrando...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Entrar
              </>
            )}
          </button>
        </form>

        {/* Rodapé */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Acesso restrito apenas para administradores autorizados
        </p>
      </div>
    </div>
  );
}