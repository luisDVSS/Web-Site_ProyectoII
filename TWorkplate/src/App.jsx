import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Componentes/Login/Login.jsx";
import Registro from "./Componentes/Registro/Registro.jsx";
import ForgotPassword from "./Componentes/Forgotten-password/Forgotten-password.jsx";
import Dashboard from "./Componentes/Dashboard/Dashboard.jsx";
import "./App.css";

// Wrappers para inyectar la navegación como props a cada pantalla
function LoginPage() {
  const navigate = useNavigate();
  return (
    <Login
      onNavigateToRegister={() => navigate("/registro")}
      onNavigateToForgot={() => navigate("/recuperar")}
      onLoginSuccess={() => navigate("/dashboard")}
    />
  );
}

function RegistroPage() {
  const navigate = useNavigate();
  return (
    <Registro
      onNavigateToLogin={() => navigate("/")}
      onRegisterSuccess={() => navigate("/dashboard")}
    />
  );
}

function ForgotPage() {
  const navigate = useNavigate();
  return (
    <ForgotPassword
      onNavigateToLogin={() => navigate("/")}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/recuperar" element={<ForgotPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Cualquier ruta desconocida vuelve al login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;