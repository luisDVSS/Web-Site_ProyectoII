import { useState, useEffect } from "react";
import "./ElementosTest.css";
import {
  API,
  TABLE_FRIENDLY_TYPES,
  CATEGORIES,
  modUid,
} from "../FuncMaker/FuncMaker.jsx";
import { WPreview } from "../FuncMaker/FuncMaker.jsx";

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE PREVIEW
// ═══════════════════════════════════════════════════════════════════════════════
function TablePreview({ widgets, color }) {
  const cols = widgets.filter(
    (w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit",
  );
  if (cols.length === 0)
    return <div className="user-catalog__empty">Sin columnas de datos</div>;
  const sampleRows = [
    cols.reduce(
      (a, c) => ({
        ...a,
        [c.fieldKey]:
          c.type === "number_input"
            ? "42"
            : c.type === "date_picker"
              ? "12/03/2025"
              : c.type === "select"
                ? c.options?.[0] || "-"
                : c.type === "toggle"
                  ? "Sí"
                  : "Ejemplo",
      }),
      {},
    ),
    cols.reduce(
      (a, c) => ({
        ...a,
        [c.fieldKey]:
          c.type === "number_input"
            ? "18"
            : c.type === "date_picker"
              ? "14/03/2025"
              : c.type === "select"
                ? c.options?.[1] || "-"
                : c.type === "toggle"
                  ? "No"
                  : "Muestra",
      }),
      {},
    ),
    cols.reduce(
      (a, c) => ({
        ...a,
        [c.fieldKey]:
          c.type === "number_input"
            ? "7"
            : c.type === "date_picker"
              ? "15/03/2025"
              : c.type === "select"
                ? c.options?.[0] || "-"
                : c.type === "toggle"
                  ? "Sí"
                  : "Registro",
      }),
      {},
    ),
  ];

  return (
    <div className="table-preview" style={{ "--accent": color }}>
      <div className="table-preview__toolbar">
        <div className="table-preview__search">🔍 Buscar...</div>
        <button className="table-preview__new-btn">+ Nuevo</button>
      </div>
      <table className="table-preview__table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.fieldKey} className="table-preview__th">
                {c.label || c.fieldKey}
              </th>
            ))}
            <th className="table-preview__th table-preview__th--actions">
              acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {sampleRows.map((row, i) => (
            <tr key={i} className="table-preview__tr">
              {cols.map((c) => (
                <td key={c.fieldKey} className="table-preview__td">
                  {row[c.fieldKey]}
                </td>
              ))}
              <td className="table-preview__td table-preview__td--actions">
                <span className="table-preview__action">✏</span>
                <span className="table-preview__action">🗑</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-preview__footer">
        <span className="table-preview__count">Mostrando 3 de 3 registros</span>
        <div className="table-preview__pagination">
          {["←", "1", "2", "3", "→"].map((p) => (
            <button
              key={p}
              className={`table-preview__page-btn ${p === "1" ? "active" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER CONFIG MODAL
// ═══════════════════════════════════════════════════════════════════════════════
function UserConfigModal({ func, existingModule, onSave, onClose }) {
  const allWidgets = func.content?.widgets || [];
  const dataWidgets = allWidgets.filter(
    (w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit",
  );
  const otherWidgets = allWidgets.filter(
    (w) => !TABLE_FRIENDLY_TYPES.has(w.type) || w.type === "submit",
  );

  const [selected, setSelected] = useState(
    new Set(
      existingModule?.selectedWidgets?.map((w) => w.fieldKey) ||
        allWidgets.map((w) => w.fieldKey || w.id),
    ),
  );
  const [viewMode, setViewMode] = useState(existingModule?.viewMode || "form");
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const toggle = (key) =>
    setSelected((p) => {
      const n = new Set(p);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  const handleSave = async () => {
    setSaving(true);
    const selectedWidgets = allWidgets
      .filter((w) => selected.has(w.fieldKey || w.id))
      .map((w) => ({
        fieldKey: w.fieldKey || w.id,
        type: w.type,
        label: w.label,
        required: w.required,
        props: (({ id, type, fieldKey, visible, required, label, ...rest }) =>
          rest)(w),
      }));
    const payload = {
      id: existingModule?.id || modUid(),
      functionalityId: func.id,
      label: func.label,
      icon: func.icon,
      color: func.color,
      viewMode,
      selectedWidgets,
      dbSchema: {
        tableName: func.label
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, ""),
        columns: selectedWidgets
          .filter(
            (w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit",
          )
          .map((w) => ({
            name: w.fieldKey,
            type: ["number_input", "slider", "rating"].includes(w.type)
              ? "INTEGER"
              : ["date_picker"].includes(w.type)
                ? "DATE"
                : ["toggle", "checkbox"].includes(w.type)
                  ? "BOOLEAN"
                  : "VARCHAR(255)",
            label: w.label,
            required: w.required || false,
          })),
      },
    };
    await API.saveUserModule(payload);
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => {
      setSavedOk(false);
      onSave(payload);
    }, 1000);
  };

  const previewWidgets = allWidgets.filter((w) =>
    selected.has(w.fieldKey || w.id),
  );
  const accent = func.color || "#60a5fa";
  const saveBtnClass = `modal__save-btn${savedOk ? " modal__save-btn--saved" : saving ? " modal__save-btn--saving" : ""}`;

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ "--accent": accent }}>
        {/* Header */}
        <div className="modal__header">
          <div className="modal__icon">{func.icon}</div>
          <div>
            <div className="modal__title">{func.label}</div>
            <div className="modal__desc">{func.desc}</div>
          </div>
          <div className="modal__spacer" />
          <div className="view-mode-toggle">
            {[
              { id: "form", label: "📋 Formulario" },
              { id: "table", label: "📊 Tabla" },
            ].map((v) => (
              <button
                key={v.id}
                className={`view-mode-btn ${viewMode === v.id ? "active" : "inactive"}`}
                onClick={() => setViewMode(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
          <button className="modal__close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal__body">
          {/* Field selector */}
          <div className="modal__fields">
            <div className="modal__fields-header">
              <div className="modal__fields-hint">
                Activa los campos que usarás
              </div>
              <div className="modal__fields-sub">
                El sistema creará las columnas de BD necesarias.
              </div>
            </div>
            <div className="modal__fields-list">
              {dataWidgets.length > 0 && (
                <>
                  <div className="fields-group-label">Campos de datos</div>
                  {dataWidgets.map((w) => {
                    const key = w.fieldKey || w.id;
                    const isOn = selected.has(key);
                    return (
                      <div
                        key={key}
                        className={`field-toggle-row ${isOn ? "on" : "off"}`}
                        onClick={() => toggle(key)}
                      >
                        <div
                          className={`field-toggle-knob ${isOn ? "on" : "off"}`}
                        >
                          <div
                            className={`field-toggle-knob__ball ${isOn ? "on" : "off"}`}
                          />
                        </div>
                        <div className="field-toggle-row__info">
                          <div
                            className={`field-toggle-row__name ${isOn ? "on" : "off"}`}
                          >
                            {w.label}
                          </div>
                          <div className="field-toggle-row__key">
                            {w.fieldKey} · {w.type}
                          </div>
                        </div>
                        {w.required && (
                          <span className="field-toggle-row__req">req</span>
                        )}
                      </div>
                    );
                  })}
                </>
              )}
              {otherWidgets.length > 0 && (
                <>
                  <div className="fields-group-label fields-group-label--spaced">
                    Widgets de interfaz
                  </div>
                  {otherWidgets.map((w) => {
                    const key = w.fieldKey || w.id;
                    const isOn = selected.has(key);
                    return (
                      <div
                        key={key}
                        className={`field-toggle-row ${isOn ? "on" : "off"}`}
                        onClick={() => toggle(key)}
                      >
                        <div
                          className={`field-toggle-knob ${isOn ? "on" : "off"}`}
                        >
                          <div
                            className={`field-toggle-knob__ball ${isOn ? "on" : "off"}`}
                          />
                        </div>
                        <div className="field-toggle-row__info">
                          <div
                            className={`field-toggle-row__name ${isOn ? "on" : "off"}`}
                          >
                            {w.label || w.type}
                          </div>
                          <div className="field-toggle-row__key">{w.type}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="modal__db-preview">
              <div className="modal__db-preview-label">
                Columnas que se crearán en BD
              </div>
              <div className="modal__db-chips">
                {dataWidgets
                  .filter((w) => selected.has(w.fieldKey || w.id))
                  .map((w) => (
                    <span key={w.fieldKey} className="modal__db-chip">
                      {w.fieldKey}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="modal__preview">
            <div className="modal__preview-label">
              Vista previa — modo{" "}
              {viewMode === "table" ? "tabla" : "formulario"}
            </div>
            {viewMode === "table" ? (
              <TablePreview widgets={previewWidgets} color={accent} />
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {previewWidgets.map((w) => (
                  <WPreview key={w.fieldKey || w.id} w={w} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal__footer">
          <div className="modal__footer-info">
            {selected.size} campos activos ·{" "}
            {dataWidgets.filter((w) => selected.has(w.fieldKey || w.id)).length}{" "}
            columnas en BD
          </div>
          <div className="modal__footer-actions">
            <button className="modal__cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button
              className={saveBtnClass}
              onClick={handleSave}
              disabled={saving || selected.size === 0}
            >
              {savedOk
                ? "✓ Guardado"
                : saving
                  ? "Guardando..."
                  : "💾 Guardar en mi sistema"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNC CARD (user side catalog)
// ═══════════════════════════════════════════════════════════════════════════════
function FuncCard({ func, onAdd, alreadyAdded }) {
  return (
    <div
      className={`func-card ${alreadyAdded ? "added" : ""}`}
      style={{ "--accent": func.color }}
    >
      <div className="func-card__header">
        <div className="func-card__icon">{func.icon}</div>
        <div>
          <div className="func-card__name">{func.label}</div>
          <div className="func-card__desc">{func.desc}</div>
        </div>
      </div>
      <div className="func-card__fields">
        {(func.content?.widgets || [])
          .filter((w) => TABLE_FRIENDLY_TYPES.has(w.type))
          .slice(0, 4)
          .map((w) => (
            <span key={w.id} className="func-card__field-chip">
              {w.fieldKey}
            </span>
          ))}
        {(func.content?.widgets || []).filter((w) =>
          TABLE_FRIENDLY_TYPES.has(w.type),
        ).length > 4 && (
          <span style={{ fontSize: 9, color: "#334155" }}>
            +
            {(func.content?.widgets || []).filter((w) =>
              TABLE_FRIENDLY_TYPES.has(w.type),
            ).length - 4}
          </span>
        )}
      </div>
      <div className="func-card__tags">
        {(func.tags || []).map((t) => (
          <span key={t} className="tag-pill">
            {t}
          </span>
        ))}
      </div>
      <button
        disabled={alreadyAdded}
        onClick={() => onAdd(func)}
        className={`func-card__add-btn ${alreadyAdded ? "already" : "available"}`}
      >
        {alreadyAdded ? "✓ Ya agregada" : "+ Agregar a mi sistema"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER MODULE CARD
// ═══════════════════════════════════════════════════════════════════════════════
function UserModuleCard({ module, onEdit, onDelete }) {
  return (
    <div className="user-module-card" style={{ "--accent": module.color }}>
      <div className="user-module-card__header">
        <div className="user-module-card__icon">{module.icon}</div>
        <div>
          <div className="user-module-card__name">{module.label}</div>
          <div className="user-module-card__meta">
            {module.selectedWidgets?.length || 0} campos activos · vista:{" "}
            {module.viewMode === "table" ? "tabla" : "formulario"}
          </div>
        </div>
        <div className="user-module-card__spacer" />
        <div className="user-module-card__actions">
          <button
            className="user-module-card__edit-btn"
            onClick={() => onEdit(module)}
          >
            ✏ Editar
          </button>
          <button
            className="user-module-card__delete-btn"
            onClick={() => onDelete(module.id)}
          >
            ✕
          </button>
        </div>
      </div>
      <div className="user-module-card__chips">
        {(module.selectedWidgets || []).map((w) => (
          <span key={w.fieldKey} className="user-module-card__chip">
            {w.fieldKey}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER SIDE
// ═══════════════════════════════════════════════════════════════════════════════
export default function UserSide() {
  const [functionalities, setFunctionalities] = useState([]);
  const [userModules, setUserModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [configModal, setConfigModal] = useState(null);

  useEffect(() => {
    (async () => {
      const [funcs, mods] = await Promise.all([
        API.getFunctionalities(),
        API.getUserModules(),
      ]);
      setFunctionalities(funcs);
      setUserModules(mods);
      setLoading(false);
    })();
  }, []);

  const reload = async () => {
    const mods = await API.getUserModules();
    setUserModules(mods);
  };

  const handleAdd = (func) => setConfigModal({ func, existingModule: null });
  const handleEdit = (mod) => {
    const func = functionalities.find((f) => f.id === mod.functionalityId);
    if (func) setConfigModal({ func, existingModule: mod });
  };
  const handleDelete = async (id) => {
    await API.deleteUserModule(id);
    reload();
  };
  const handleSave = async () => {
    await reload();
    setConfigModal(null);
  };

  const filtered = functionalities.filter((f) => {
    const s =
      !search ||
      f.label.toLowerCase().includes(search.toLowerCase()) ||
      (f.tags || []).some((t) => t.includes(search.toLowerCase())) ||
      f.desc?.toLowerCase().includes(search.toLowerCase());
    const c = catFilter === "all" || f.category === catFilter;
    return s && c;
  });

  const addedIds = new Set(userModules.map((m) => m.functionalityId));

  return (
    <div className="user-side">
      <div className="user-topbar">
        <span className="user-topbar__title">🏗 Mi Sistema</span>
        <div className="user-topbar__spacer" />
        <span className="user-topbar__count">
          {userModules.length} módulos configurados
        </span>
      </div>

      <div className="user-body">
        {/* Left: available functionalities */}
        <div className="user-catalog">
          <div className="user-catalog__header">
            <div className="section-label">Funcionalidades disponibles</div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Buscar por nombre o etiqueta..."
              className="user-catalog__search"
            />
            <div className="user-catalog__filters">
              {["all", ...CATEGORIES].map((c) => (
                <button
                  key={c}
                  className={`cat-filter-btn ${catFilter === c ? "active" : ""}`}
                  onClick={() => setCatFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="user-catalog__list">
            {loading ? (
              <div className="user-catalog__loading">
                Cargando funcionalidades...
              </div>
            ) : filtered.length === 0 ? (
              <div className="user-catalog__empty">Sin resultados</div>
            ) : (
              filtered.map((f) => (
                <FuncCard
                  key={f.id}
                  func={f}
                  onAdd={handleAdd}
                  alreadyAdded={addedIds.has(f.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: user's configured system */}
        <div className="user-canvas">
          {userModules.length === 0 ? (
            <div className="user-canvas__empty">
              <div
                className="user-canvas__empty-inner"
                style={{ textAlign: "center" }}
              >
                <div className="user-canvas__empty-icon">🏗</div>
                <div className="user-canvas__empty-title">
                  Tu sistema está vacío
                </div>
                <div className="user-canvas__empty-sub">
                  Agrega funcionalidades desde el panel izquierdo
                </div>
              </div>
            </div>
          ) : (
            <div className="user-canvas__inner">
              <div className="user-canvas__modules-label">
                Módulos de tu sistema ({userModules.length})
              </div>
              {userModules.map((mod) => (
                <UserModuleCard
                  key={mod.id}
                  module={mod}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
              <div className="user-json-block">
                <div className="user-json-block__header">
                  Config JSON → Backend crea tablas con esto
                </div>
                <pre className="user-json-block__pre">
                  {JSON.stringify(
                    { userSystem: { modules: userModules } },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {configModal && (
        <UserConfigModal
          func={configModal.func}
          existingModule={configModal.existingModule}
          onSave={handleSave}
          onClose={() => setConfigModal(null)}
        />
      )}
    </div>
  );
}
