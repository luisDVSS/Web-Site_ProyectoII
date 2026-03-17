import { useState } from "react";
import "./Forgotten-password.css";

// ─── Pasos del flujo ───────────────────────────────
// 0: ingresa email   → solicita token
// 1: ingresa token   → confirma token
// 2: nueva contraseña → cambia password
// 3: éxito

const STEP_LABELS = ["Correo", "Token", "Nueva contraseña"];

export default function ForgotPassword({ onNavigateToLogin }) {
  const [step, setStep] = useState(0);

  // Paso 0
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Paso 1
  const [token, setToken] = useState(["", "", "", "", "", ""]);
  const [tokenError, setTokenError] = useState("");

  // Paso 2
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState("");

  const [loading, setLoading] = useState(false);

  // ── Paso 0: enviar token ──────────────────────────
  const handleSendToken = async () => {
    if (!email.includes("@")) {
      setEmailError("Ingresa un correo válido.");
      return;
    }
    setEmailError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(1);
  };

  // ── Paso 1: confirmar token ───────────────────────
  const handleConfirmToken = async () => {
    const full = token.join("");
    if (full.length < 6) {
      setTokenError("Ingresa los 6 dígitos del token.");
      return;
    }
    setTokenError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    // Simula token incorrecto con "000000"
    if (full === "000000") {
      setTokenError("Token incorrecto o expirado. Intenta de nuevo.");
      return;
    }
    setStep(2);
  };

  // ── Paso 2: cambiar contraseña ────────────────────
  const handleChangePassword = async () => {
    if (password.length < 8) {
      setPassError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setPassError("Las contraseñas no coinciden.");
      return;
    }
    setPassError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
  };

  // ── Input de token: navega entre celdas ──────────
  const handleTokenInput = (val, idx) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...token];
    next[idx] = digit;
    setToken(next);
    setTokenError("");
    if (digit && idx < 5) {
      document.getElementById(`tok-${idx + 1}`)?.focus();
    }
  };
  const handleTokenKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !token[idx] && idx > 0) {
      document.getElementById(`tok-${idx - 1}`)?.focus();
    }
  };
  const handleTokenPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const next = [...token];
    pasted.split("").forEach((d, i) => {
      next[i] = d;
    });
    setToken(next);
    document.getElementById(`tok-${Math.min(pasted.length, 5)}`)?.focus();
  };

  // ── Fortaleza de contraseña ───────────────────────
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
    <div className="fp-shell">
      {/* ── Panel izquierdo ── */}
      <div className="fp-brand">
        <div className="fp-brand__inner">
          <div className="fp-brand__logo">
            <span className="fp-brand__logo-icon">⚙</span>
            <span className="fp-brand__logo-name">SysBuilder</span>
          </div>

          {step < 3 && (
            <div className="fp-stepper">
              {STEP_LABELS.map((label, i) => (
                <div key={i} className="fp-stepper__item">
                  <div
                    className={`fp-stepper__dot${i < step ? " done" : i === step ? " active" : ""}`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span
                    className={`fp-stepper__label${i === step ? " active" : ""}`}
                  >
                    {label}
                  </span>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={`fp-stepper__line${i < step ? " done" : ""}`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="fp-brand__headline">
            {step === 0 && (
              <>
                <span>Recupera el</span>
                <br />
                <em>acceso a tu cuenta.</em>
              </>
            )}
            {step === 1 && (
              <>
                <span>Revisa tu</span>
                <br />
                <em>bandeja de entrada.</em>
              </>
            )}
            {step === 2 && (
              <>
                <span>Elige una nueva</span>
                <br />
                <em>contraseña segura.</em>
              </>
            )}
            {step === 3 && (
              <>
                <span>Todo listo.</span>
                <br />
                <em>Ya puedes entrar.</em>
              </>
            )}
          </div>

          <div className="fp-brand__hint">
            {step === 0 &&
              "Te enviaremos un código de 6 dígitos al correo registrado."}
            {step === 1 &&
              `Enviamos el código a ${email}. Revisa también tu carpeta de spam.`}
            {step === 2 &&
              "Tu nueva contraseña debe tener al menos 8 caracteres."}
            {step === 3 && "Tu contraseña fue actualizada correctamente."}
          </div>
        </div>

        <div className="fp-brand__grid" aria-hidden="true">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="fp-brand__grid-cell" />
          ))}
        </div>
      </div>

      {/* ── Panel derecho ── */}
      <div className="fp-form-panel">
        <div className="fp-form-wrap">
          {/* ════════════ PASO 0: EMAIL ════════════ */}
          {step === 0 && (
            <>
              <div className="fp-header">
                <h1 className="fp-title">¿Olvidaste tu contraseña?</h1>
                <p className="fp-subtitle">
                  Ingresa el correo de tu cuenta y te enviaremos un código para
                  recuperarla.
                </p>
              </div>

              <div className="fp-form">
                <div className="fp-field">
                  <label className="fp-field__label" htmlFor="fp-email">
                    Correo electrónico
                  </label>
                  <input
                    id="fp-email"
                    type="email"
                    className={`fp-field__input${emailError ? " fp-field__input--error" : ""}`}
                    placeholder="usuario@empresa.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendToken()}
                    autoComplete="email"
                    autoFocus
                  />
                  {emailError && (
                    <span className="fp-field__error">{emailError}</span>
                  )}
                </div>

                <button
                  type="button"
                  className={`fp-btn${loading ? " fp-btn--loading" : ""}`}
                  onClick={handleSendToken}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="fp-btn__spinner" />
                      Enviando código...
                    </>
                  ) : (
                    "Enviar código →"
                  )}
                </button>
              </div>

              <button
                type="button"
                className="fp-back"
                onClick={onNavigateToLogin}
              >
                ← Volver al inicio de sesión
              </button>
            </>
          )}

          {/* ════════════ PASO 1: TOKEN ════════════ */}
          {step === 1 && (
            <>
              <div className="fp-header">
                <h1 className="fp-title">Ingresa el código</h1>
                <p className="fp-subtitle">
                  Enviamos un código de 6 dígitos a <strong>{email}</strong>.
                </p>
              </div>

              <div className="fp-form">
                <div className="fp-token-wrap">
                  {token.map((digit, i) => (
                    <input
                      key={i}
                      id={`tok-${i}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className={`fp-token-cell${tokenError ? " fp-token-cell--error" : digit ? " fp-token-cell--filled" : ""}`}
                      value={digit}
                      onChange={(e) => handleTokenInput(e.target.value, i)}
                      onKeyDown={(e) => handleTokenKeyDown(e, i)}
                      onPaste={i === 0 ? handleTokenPaste : undefined}
                      onFocus={(e) => e.target.select()}
                      autoFocus={i === 0}
                    />
                  ))}
                </div>

                {tokenError && (
                  <div className="fp-token-error">
                    <span className="fp-token-error__icon">!</span>
                    {tokenError}
                  </div>
                )}

                <button
                  type="button"
                  className={`fp-btn${loading ? " fp-btn--loading" : ""}`}
                  onClick={handleConfirmToken}
                  disabled={loading || token.join("").length < 6}
                >
                  {loading ? (
                    <>
                      <span className="fp-btn__spinner" />
                      Verificando...
                    </>
                  ) : (
                    "Confirmar código →"
                  )}
                </button>

                <div className="fp-resend">
                  ¿No recibiste el código?{" "}
                  <button
                    type="button"
                    className="fp-resend__link"
                    onClick={() => {
                      setToken(["", "", "", "", "", ""]);
                      setTokenError("");
                      setStep(0);
                    }}
                  >
                    Reenviar
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ════════════ PASO 2: NUEVA CONTRASEÑA ════════════ */}
          {step === 2 && (
            <>
              <div className="fp-header">
                <h1 className="fp-title">Nueva contraseña</h1>
                <p className="fp-subtitle">
                  Elige una contraseña segura que no hayas usado antes.
                </p>
              </div>

              <div className="fp-form">
                <div className="fp-field">
                  <label className="fp-field__label" htmlFor="fp-newpass">
                    Nueva contraseña
                  </label>
                  <div className="fp-field__input-wrap">
                    <input
                      id="fp-newpass"
                      type={showPassword ? "text" : "password"}
                      className={`fp-field__input fp-field__input--padded${passError ? " fp-field__input--error" : ""}`}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPassError("");
                      }}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="fp-field__eye"
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? "○" : "●"}
                    </button>
                  </div>
                  {password.length > 0 && (
                    <div className="fp-strength">
                      <div className="fp-strength__bars">
                        {[1, 2, 3, 4].map((n) => (
                          <div
                            key={n}
                            className={`fp-strength__bar${n <= strength ? ` ${strengthClass}` : ""}`}
                          />
                        ))}
                      </div>
                      <span
                        className={`fp-strength__label fp-strength__label--${strengthClass}`}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="fp-field">
                  <label className="fp-field__label" htmlFor="fp-confirm">
                    Confirmar contraseña
                  </label>
                  <div className="fp-field__input-wrap">
                    <input
                      id="fp-confirm"
                      type={showConfirm ? "text" : "password"}
                      className={`fp-field__input fp-field__input--padded${passError ? " fp-field__input--error" : ""}`}
                      placeholder="Repite la contraseña"
                      value={confirm}
                      onChange={(e) => {
                        setConfirm(e.target.value);
                        setPassError("");
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleChangePassword()
                      }
                    />
                    <button
                      type="button"
                      className="fp-field__eye"
                      onClick={() => setShowConfirm((v) => !v)}
                    >
                      {showConfirm ? "○" : "●"}
                    </button>
                  </div>
                  {/* Indicador de coincidencia */}
                  {confirm.length > 0 && (
                    <span
                      className={`fp-match${password === confirm ? " match" : " no-match"}`}
                    >
                      {password === confirm
                        ? "✓ Las contraseñas coinciden"
                        : "✕ No coinciden"}
                    </span>
                  )}
                </div>

                {passError && (
                  <div className="fp-token-error">
                    <span className="fp-token-error__icon">!</span>
                    {passError}
                  </div>
                )}

                <button
                  type="button"
                  className={`fp-btn${loading ? " fp-btn--loading" : ""}`}
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="fp-btn__spinner" />
                      Guardando...
                    </>
                  ) : (
                    "Guardar contraseña →"
                  )}
                </button>
              </div>
            </>
          )}

          {/* ════════════ PASO 3: ÉXITO ════════════ */}
          {step === 3 && (
            <div className="fp-success">
              <div className="fp-success__icon">✓</div>
              <h1 className="fp-title">¡Contraseña actualizada!</h1>
              <p className="fp-subtitle">
                Ya puedes iniciar sesión con tu nueva contraseña.
              </p>
              <button
                type="button"
                className="fp-btn"
                onClick={onNavigateToLogin}
                style={{ marginTop: 8 }}
              >
                Ir a iniciar sesión →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
