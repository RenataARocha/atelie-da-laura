import { useState, useEffect, createContext, useContext } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

// ============================================================================
// CONTEXTO DE AUTENTICAÇÃO
// ============================================================================

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitora estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      let mensagem = 'Erro ao fazer login';
      
      if (error.code === 'auth/user-not-found') {
        mensagem = 'Usuário não encontrado';
      } else if (error.code === 'auth/wrong-password') {
        mensagem = 'Senha incorreta';
      } else if (error.code === 'auth/invalid-email') {
        mensagem = 'E-mail inválido';
      } else if (error.code === 'auth/invalid-credential') {
        mensagem = 'E-mail ou senha incorretos';
      }
      
      return { success: false, error: mensagem };
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer logout' };
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}