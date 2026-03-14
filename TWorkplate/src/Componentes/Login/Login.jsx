import { useState } from "react";
import "./Login.css";

export default function Login({ onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Completa todos los campos.");
      return;
    }
    setLoading(true);
    // Simula llamada al backend
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // setError("Credenciales incorrectas."); // ejemplo de error
  };

  return (
    <div className="auth-shell">
      {/* Panel izquierdo — branding */}
      <div className="auth-brand">
        <div className="auth-brand__inner">
          <div className="auth-brand__logo">
            <span className="auth-brand__logo-icon">⚙</span>
            <span className="auth-brand__logo-name">SysBuilder</span>
          </div>
          <div className="auth-brand__tagline">
            Construye el sistema
            <br />
            <em>de tu negocio.</em>
          </div>
          <div className="auth-brand__features">
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Diseña funcionalidades sin código
            </div>
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Genera esquemas de base de datos automáticamente
            </div>
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Comparte tu sistema con tu equipo
            </div>
          </div>
        </div>
        <div className="auth-brand__grid" aria-hidden="true">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="auth-brand__grid-cell" />
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="auth-form__header">
            <h1 className="auth-form__title">Bienvenido de vuelta</h1>
            <p className="auth-form__subtitle">
              Inicia sesión para continuar con tu sistema
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="auth-form__error">
                <span className="auth-form__error-icon">!</span>
                {error}
              </div>
            )}

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="login-email">
                Correo electrónico
              </label>
              <input
                id="login-email"
                type="email"
                className="auth-field__input"
                placeholder="usuario@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <div className="auth-field__label-row">
                <label className="auth-field__label" htmlFor="login-password">
                  Contraseña
                </label>
                <button type="button" className="auth-field__forgot">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="auth-field__input-wrap">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  className="auth-field__input auth-field__input--padded"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-field__eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? "○" : "●"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={`auth-submit${loading ? " auth-submit--loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="auth-submit__spinner" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>

            <div className="auth-divider">
              <span className="auth-divider__line" />
              <span className="auth-divider__text">o continúa con</span>
              <span className="auth-divider__line" />
            </div>

            <div className="auth-oauth-row">
              <button type="button" className="auth-oauth-btn">
                <span className="auth-oauth-btn__icon">G</span>
                Google
              </button>
              <button type="button" className="auth-oauth-btn">
                <span className="auth-oauth-btn__icon">M</span>
                Microsoft
              </button>
            </div>
          </form>

          <p className="auth-switch">
            ¿No tienes una cuenta?{" "}
            <button
              type="button"
              className="auth-switch__link"
              onClick={onNavigateToRegister}
            >
              Crear cuenta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
