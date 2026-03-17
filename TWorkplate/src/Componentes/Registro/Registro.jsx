import { useState } from "react";
import "./Registro.css";

const STEPS = ["Cuenta", "Negocio", "Listo"];

export default function Register({ onNavigateToLogin, onRegisterSuccess }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  // Campos paso 1
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Campos paso 2
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  const [errors, setErrors] = useState({});

  const validateStep0 = () => {
    const e = {};
    if (!name.trim()) e.name = "El nombre es obligatorio.";
    if (!email.includes("@")) e.email = "Correo inválido.";
    if (password.length < 8) e.password = "Mínimo 8 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep1 = () => {
    const e = {};
    if (!business.trim()) e.business = "El nombre del negocio es obligatorio.";
    if (!category) e.category = "Selecciona una categoría.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (step === 0 && !validateStep0()) return;
    if (step === 1) {
      if (!validateStep1()) return;
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1400));
      setLoading(false);
      setDone(true);
    }
    setStep((s) => s + 1);
  };

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
        ? 1
        : password.length < 10
          ? 2
          : /[A-Z]/.test(password) && /[0-9]/.test(password)
            ? 4
            : 3;

  const strengthLabel = ["", "Débil", "Regular", "Buena", "Fuerte"][strength];
  const strengthClass = ["", "weak", "fair", "good", "strong"][strength];

  return (
    <div className="auth-shell">
      {/* Panel izquierdo — branding */}
      <div className="auth-brand">
        <div className="auth-brand__inner">
          <div className="auth-brand__logo">
            <span className="auth-brand__logo-icon">⚙</span>
            <span className="auth-brand__logo-name">SysBuilder</span>
          </div>

          {/* Stepper */}
          <div className="reg-stepper">
            {STEPS.map((label, i) => (
              <div key={i} className="reg-stepper__item">
                <div
                  className={`reg-stepper__dot ${i < step ? "done" : i === step ? "active" : ""}`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <div
                  className={`reg-stepper__label ${i === step ? "active" : ""}`}
                >
                  {label}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`reg-stepper__line ${i < step ? "done" : ""}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="auth-brand__tagline">
            Empieza a construir
            <br />
            <em>hoy mismo.</em>
          </div>

          <div className="auth-brand__features">
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Gratis para empezar, sin tarjeta
            </div>
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Configura tu sistema en minutos
            </div>
            <div className="auth-brand__feature">
              <span className="auth-brand__feature-dot" />
              Soporte en español incluido
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
          {/* ── PASO 0: Datos de cuenta ── */}
          {step === 0 && (
            <>
              <div className="auth-form__header">
                <h1 className="auth-form__title">Crea tu cuenta</h1>
                <p className="auth-form__subtitle">Solo toma 2 minutos</p>
              </div>

              <div className="auth-form">
                <div className="auth-field">
                  <label className="auth-field__label" htmlFor="reg-name">
                    Nombre completo
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    className={`auth-field__input${errors.name ? " auth-field__input--error" : ""}`}
                    placeholder="Juan García"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors((v) => ({ ...v, name: "" }));
                    }}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="auth-field__error">{errors.name}</span>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-field__label" htmlFor="reg-email">
                    Correo electrónico
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    className={`auth-field__input${errors.email ? " auth-field__input--error" : ""}`}
                    placeholder="juan@empresa.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((v) => ({ ...v, email: "" }));
                    }}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="auth-field__error">{errors.email}</span>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-field__label" htmlFor="reg-password">
                    Contraseña
                  </label>
                  <div className="auth-field__input-wrap">
                    <input
                      id="reg-password"
                      type={showPassword ? "text" : "password"}
                      className={`auth-field__input auth-field__input--padded${errors.password ? " auth-field__input--error" : ""}`}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((v) => ({ ...v, password: "" }));
                      }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="auth-field__eye"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Ocultar" : "Mostrar"}
                    >
                      {showPassword ? "○" : "●"}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="reg-strength">
                      <div className="reg-strength__bars">
                        {[1, 2, 3, 4].map((n) => (
                          <div
                            key={n}
                            className={`reg-strength__bar ${n <= strength ? strengthClass : ""}`}
                          />
                        ))}
                      </div>
                      <span
                        className={`reg-strength__label reg-strength__label--${strengthClass}`}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                  {errors.password && (
                    <span className="auth-field__error">{errors.password}</span>
                  )}
                </div>

                <button
                  type="button"
                  className="auth-submit"
                  onClick={handleNext}
                >
                  Continuar →
                </button>

                <div className="auth-divider">
                  <span className="auth-divider__line" />
                  <span className="auth-divider__text">o regístrate con</span>
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
              </div>
            </>
          )}

          {/* ── PASO 1: Datos del negocio ── */}
          {step === 1 && (
            <>
              <div className="auth-form__header">
                <h1 className="auth-form__title">Cuéntanos sobre tu negocio</h1>
                <p className="auth-form__subtitle">
                  Esto nos ayuda a personalizar tu experiencia
                </p>
              </div>

              <div className="auth-form">
                <div className="auth-field">
                  <label className="auth-field__label" htmlFor="reg-business">
                    Nombre del negocio
                  </label>
                  <input
                    id="reg-business"
                    type="text"
                    className={`auth-field__input${errors.business ? " auth-field__input--error" : ""}`}
                    placeholder="Mi Empresa S.A."
                    value={business}
                    onChange={(e) => {
                      setBusiness(e.target.value);
                      setErrors((v) => ({ ...v, business: "" }));
                    }}
                  />
                  {errors.business && (
                    <span className="auth-field__error">{errors.business}</span>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-field__label" htmlFor="reg-category">
                    Categoría
                  </label>
                  <select
                    id="reg-category"
                    className={`auth-field__input auth-field__select${errors.category ? " auth-field__input--error" : ""}`}
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setErrors((v) => ({ ...v, category: "" }));
                    }}
                  >
                    <option value="">-- Selecciona --</option>
                    <option value="retail">Retail / Tienda</option>
                    <option value="restaurante">Restaurante / Alimentos</option>
                    <option value="salud">Salud / Consultorio</option>
                    <option value="servicios">Servicios profesionales</option>
                    <option value="manufactura">
                      Manufactura / Producción
                    </option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.category && (
                    <span className="auth-field__error">{errors.category}</span>
                  )}
                </div>

                <div className="auth-field">
                  <label className="auth-field__label">Tamaño del equipo</label>
                  <div className="reg-size-grid">
                    {[
                      { val: "solo", label: "Solo yo" },
                      { val: "2-10", label: "2–10" },
                      { val: "11-50", label: "11–50" },
                      { val: "50+", label: "50+" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        className={`reg-size-btn${size === opt.val ? " active" : ""}`}
                        onClick={() => setSize(opt.val)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="reg-nav-row">
                  <button
                    type="button"
                    className="auth-back-btn"
                    onClick={() => {
                      setStep(0);
                      setErrors({});
                    }}
                  >
                    ← Volver
                  </button>
                  <button
                    type="button"
                    className={`auth-submit auth-submit--flex${loading ? " auth-submit--loading" : ""}`}
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="auth-submit__spinner" />
                        Creando cuenta...
                      </>
                    ) : (
                      "Crear cuenta →"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── PASO 2: Éxito ── */}
          {step === 2 && (
            <div className="reg-success">
              <div className="reg-success__icon">✓</div>
              <h1 className="auth-form__title">¡Cuenta creada!</h1>
              <p className="auth-form__subtitle">
                Bienvenido a SysBuilder, <strong>{name}</strong>.<br />
                Tu sistema está listo para configurarse.
              </p>
              <button
                type="button"
                className="auth-submit"
                style={{ marginTop: 8 }}
                onClick={onRegisterSuccess}
              >
                Ir a mi sistema →
              </button>
            </div>
          )}

          {step < 2 && (
            <p className="auth-switch">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                className="auth-switch__link"
                onClick={onNavigateToLogin}
              >
                Iniciar sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
