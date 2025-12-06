import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RotaProtegida({ children }) {
  const { user, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-semibold">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Se estiver autenticado, mostra o conteúdo
  return children;
}