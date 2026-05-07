import { useState, useEffect } from "react";
import AdminBuilder from "../FuncMaker/FuncMaker.jsx";
import UserSide from "../componentes_confi/ElementosTest.jsx";
import "./Dashboard.css";
import { getFunctionalities } from "./data.jsx";

const STEPS = [
  { num: 1, label: "Diseña", icon: "📐" },
  { num: 2, label: "Configura", icon: "⚙" },
  { num: 3, label: "Usa", icon: "🏗" },
];

export default function Dashboard() {
  const [tab, setTab] = useState("design");
  const [showBuilder, setShowBuilder] = useState(false);
  const [functionalities, setFunctionalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(() => localStorage.getItem("twp_visited") === "1");

  useEffect(() => {
    getFunctionalities()
      .then((data) => {
        setFunctionalities(data);
        if (data.length > 0 && !hasVisited) setHasVisited(true);
      })
      .catch((err) => console.error("Error al cargar funcionalidades:", err))
      .finally(() => setLoading(false));
  }, []);

  const dismissOnboarding = () => {
    setHasVisited(true);
    localStorage.setItem("twp_visited", "1");
  };

  return (
    <div className="app-root">
      {/* ── Top bar ── */}
      <div className="topbar">
        <div className="topbar__brand">
          <span className="topbar__logo">⬡</span>
          <span className="topbar__name">TWorkplate</span>
        </div>

        <nav className="topbar__tabs">
          <button
            className={`topbar__tab ${tab === "design" ? "active" : ""}`}
            onClick={() => { setTab("design"); setShowBuilder(false); }}
          >
            <span className="topbar__tab-icon">📐</span>
            <span className="topbar__tab-label">Diseñar</span>
          </button>
          <button
            className={`topbar__tab ${tab === "system" ? "active" : ""}`}
            onClick={() => { setTab("system"); setShowBuilder(false); }}
          >
            <span className="topbar__tab-icon">🏗</span>
            <span className="topbar__tab-label">Mi Sistema</span>
          </button>
        </nav>

        <div className="topbar__actions">
          {tab === "design" && !showBuilder && (
            <button className="topbar__btn--primary" onClick={() => setShowBuilder(true)}>
              + Nuevo módulo
            </button>
          )}
        </div>
      </div>

      {/* ── Onboarding banner ── */}
      {!hasVisited && (
        <div className="onboarding">
          <div className="onboarding__inner">
            <div className="onboarding__title">Bienvenido — crea tu sistema en 3 pasos</div>
            <div className="onboarding__steps">
              {STEPS.map((s) => (
                <div key={s.num} className="onboarding__step">
                  <span className="onboarding__step-icon">{s.icon}</span>
                  <span className="onboarding__step-label">{s.label}</span>
                </div>
              ))}
            </div>
            <button className="onboarding__dismiss" onClick={dismissOnboarding}>
              Entendido ✓
            </button>
          </div>
        </div>
      )}

      {/* ── Design tab ── */}
      {tab === "design" && !showBuilder && (
        <div className="design-panel">
          {loading ? (
            <div className="design-panel__loading">Cargando módulos...</div>
          ) : functionalities.length === 0 ? (
            <div className="design-panel__empty">
              <div className="design-panel__empty-icon">📐</div>
              <div className="design-panel__empty-title">Tu catálogo está vacío</div>
              <div className="design-panel__empty-sub">
                Crea tu primer módulo para empezar a construir tu sistema de administración.
              </div>
              <button className="design-panel__cta" onClick={() => setShowBuilder(true)}>
                + Crear mi primer módulo
              </button>
            </div>
          ) : (
            <>
              <div className="design-panel__header">
                <h1 className="design-panel__title">Módulos disponibles</h1>
                <p className="design-panel__subtitle">
                  {functionalities.length} módulo{functionalities.length !== 1 ? "s" : ""} — estos son los bloques que tus usuarios pueden agregar a su sistema.
                </p>
              </div>
              <div className="design-panel__grid">
                {functionalities.map((f) => (
                  <div key={f.id} className="design-card" style={{ "--accent": f.color }}>
                    <div className="design-card__header">
                      <div className="design-card__icon">{f.icon}</div>
                      <div>
                        <div className="design-card__name">{f.label}</div>
                        <div className="design-card__category">{f.category}</div>
                      </div>
                    </div>
                    <div className="design-card__desc">{f.desc}</div>
                    <div className="design-card__tags">
                      {(f.tags || []).map((t) => (
                        <span key={t} className="tag-pill" style={{ "--accent": f.color }}>{t}</span>
                      ))}
                    </div>
                    <div className="design-card__count">
                      {f.content?.widgets?.length || 0} campos configurados
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ── System tab (UserSide) ── */}
      {tab === "system" && <UserSide />}

      {/* ── Builder modal ── */}
      {showBuilder && (
        <AdminBuilder
          onClose={() => setShowBuilder(false)}
          onSave={(payload) => {
            setFunctionalities((p) => [...p, { ...payload }]);
          }}
        />
      )}
    </div>
  );
}
