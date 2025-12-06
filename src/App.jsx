import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import RotaProtegida from "./components/admin/RotaProtegida";
import TelaDeLoading from "./components/TelaDeLoading";

import LojaPrincipal from "./pages/LojaPrincipal";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";

function AppInterno() {
  const location = useLocation();
  const rotaAtual = location.pathname;

  const [carregandoAba, setCarregandoAba] = useState(true);

  // Loading apenas no site principal
  useEffect(() => {
    const tempoMinimo = 800;

    const timer = setTimeout(() => {
      setCarregandoAba(false);
    }, tempoMinimo);

    return () => clearTimeout(timer);
  }, []);

  // VERIFICA SE É ADMIN
  const ehAdmin = rotaAtual.startsWith("/admin");
  const loadingPermitido = !ehAdmin; // Só mostra loading verde se NÃO for admin

  // MOSTRA O LOADING VERDE APENAS NA LOJA
  if (carregandoAba && loadingPermitido) {
    return <TelaDeLoading />;
  }

  return (
    <>
    
      {/* Borboletas decorativas — só aparecem fora do admin */}
      {!ehAdmin && (
        <>
          {/* Pequena */}
          <div
            className="borboleta"
            style={{
              top: "10%",
              left: "4%",
              backgroundImage: "url('/borboleta.png')",
              transform: "scale(0.8) rotate(-18deg)",
              zIndex: 0.5,
            }}
          />

          {/* Média (virada) */}
          <div
            className="borboleta"
            style={{
              top: "18%",
              right: "6%",
              backgroundImage: "url('/borboleta.png')",
              transform: "scale(1) scaleX(-1) rotate(15deg)",
              zIndex: 0,
            }}
          />

          {/* Grande atrás */}
          <div
            className="borboleta"
            style={{
              top: "55%",
              left: "18%",
              backgroundImage: "url('/borboleta.png')",
              opacity: 0.25,
              transform: "scale(1.3)",
              zIndex: 0,
            }}
          />

          {/* Grande por cima */}
          <div
            className="borboleta"
            style={{
              bottom: "12%",
              right: "10%",
              backgroundImage: "url('/borboleta.png')",
              transform: "scale(1.2) scaleX(-1) rotate(-12deg)",
              opacity: 0.35,
              zIndex: 2,
            }}
          />

          {/* Média */}
          <div
            className="borboleta"
            style={{
              top: "20%",
              left: "48%",
              backgroundImage: "url('/borboleta.png')",
              opacity: 0.25,
              transform: "scale(1)",
              zIndex: 0,
            }}
          />

          {/* Pequena */}
          <div
            className="borboleta"
            style={{
              bottom: "2%",
              right: "88%",
              backgroundImage: "url('/borboleta.png')",
              transform: "scale(0.7) scaleX(-1) rotate(-12deg)",
              opacity: 0.35,
              zIndex: 0,
            }}
          />
        </>
      )}

      <Routes>
        <Route path="/" element={<LojaPrincipal />} />

        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>
          }
        />

        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>



    </>
  );
}

// ======== APP PRINCIPAL ========
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppInterno />
      </Router>
    </AuthProvider>
  );
}
