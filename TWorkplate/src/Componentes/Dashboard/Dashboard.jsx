import { useState, useEffect } from "react";
import AdminBuilder from "../FuncMaker/FuncMaker.jsx";
import UserSide from "../componentes_confi/ElementosTest.jsx";
import "./Dashboard.css";
import { getFunctionalities } from "./data.jsx";
// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [side, setSide] = useState("user");
  const [showAdminBuilder, setShowAdminBuilder] = useState(false);
  const [functionalities, setFunctionalities] = useState([]);

  useEffect(() => {
    getFunctionalities()
      .then(setFunctionalities)
      .catch((err) => console.error("Error al cargar funcionalidades:", err));
  }, []);

  return (
    <div className="app-root">
      <div className="role-switcher">
        <span className="role-switcher__label">Vista:</span>
        <button
          className={`role-btn role-btn--user ${side === "user" ? "active" : ""}`}
          onClick={() => setSide("user")}
        >
          👤 Usuario
        </button>
        <button
          className={`role-btn role-btn--admin ${side === "admin" ? "active" : ""}`}
          onClick={() => {
            setSide("admin");
            setShowAdminBuilder(false);
          }}
        >
          ⚙ Admin
        </button>
        {side === "admin" && !showAdminBuilder && (
          <button
            className="role-btn--new"
            onClick={() => setShowAdminBuilder(true)}
          >
            + Nueva func.
          </button>
        )}
      </div>

      {side === "user" && <UserSide />}

      {side === "admin" && !showAdminBuilder && (
        <div className="admin-panel">
          <div className="admin-panel__header">
            <div className="admin-panel__eyebrow">Panel Admin</div>
            <h1 className="admin-panel__title">Funcionalidades en BD</h1>
            <p className="admin-panel__subtitle">
              Estas son las funcionalidades que los usuarios pueden ver y usar
            </p>
          </div>
          <div className="admin-panel__grid">
            {functionalities.map((f) => (
              <div
                key={f.id}
                className="admin-func-card"
                style={{ "--accent": f.color }}
              >
                <div className="admin-func-card__header">
                  <div className="admin-func-card__icon">{f.icon}</div>
                  <div>
                    <div className="admin-func-card__name">{f.label}</div>
                    <div className="admin-func-card__category">
                      {f.category}
                    </div>
                  </div>
                </div>
                <div className="admin-func-card__desc">{f.desc}</div>
                <div className="admin-func-card__tags">
                  {(f.tags || []).map((t) => (
                    <span
                      key={t}
                      className="tag-pill"
                      style={{ "--accent": f.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="admin-func-card__count">
                  {f.content?.widgets?.length || 0} widgets definidos{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAdminBuilder && (
        <AdminBuilder onClose={() => setShowAdminBuilder(false)} />
      )}
    </div>
  );
}
