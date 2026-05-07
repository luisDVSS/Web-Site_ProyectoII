import { useState, useEffect } from "react";
import "./ElementosTest.css";
import { WPreview } from "../../shared/builder-components";
import { WIDGET_CATALOG, CATEGORIES, TABLE_FRIENDLY_TYPES, modUid } from "../../shared/builder-constants";

// ═══════════════════════════════════════════════════════════════════════════════
// SIMULATED API (local to UserSide)
// ═══════════════════════════════════════════════════════════════════════════════

let _DB_FUNCTIONALITIES = [
  {
    id: "func_seed_001", label: "Inventario", icon: "🗄️", color: "#7dd3fc", category: "logistica",
    desc: "Control de stock, entradas y salidas de productos",
    tags: ["inventario", "logística", "stock", "productos"],
    content: JSON.stringify({
      widgets: [
        { id: "w1", type: "heading", fieldKey: "titulo", label: "Inventario", text: "Registro de Inventario", level: "h2", color: "#7dd3fc", align: "left", visible: true, required: false },
        { id: "w2", type: "text_input", fieldKey: "producto", label: "Producto", placeholder: "Nombre del producto", visible: true, required: true },
        { id: "w3", type: "number_input", fieldKey: "cantidad", label: "Cantidad", placeholder: "0", min: "0", max: "", step: 1, visible: true, required: true },
        { id: "w4", type: "select", fieldKey: "unidad", label: "Unidad de medida", options: ["piezas", "kg", "litros", "cajas", "metros"], placeholder: "-- Seleccionar --", visible: true, required: true },
        { id: "w5", type: "number_input", fieldKey: "minimo", label: "Stock mínimo", placeholder: "0", min: "0", step: 1, visible: true, required: false },
        { id: "w6", type: "number_input", fieldKey: "maximo", label: "Stock máximo", placeholder: "0", min: "0", step: 1, visible: true, required: false },
        { id: "w7", type: "text_input", fieldKey: "ubicacion", label: "Ubicación", placeholder: "Ej: Bodega A, Anaquel 3", visible: true, required: false },
        { id: "w8", type: "text_input", fieldKey: "proveedor", label: "Proveedor", placeholder: "Nombre del proveedor", visible: true, required: false },
        { id: "w9", type: "number_input", fieldKey: "precio", label: "Precio unitario", placeholder: "0.00", min: "0", step: 0.01, visible: true, required: false },
        { id: "w10", type: "textarea", fieldKey: "notas", label: "Notas adicionales", placeholder: "Observaciones...", rows: 3, visible: true, required: false },
        { id: "w11", type: "submit", fieldKey: "guardar", label: "Guardar", text: "Guardar registro", color: "#7dd3fc", size: "lg", fullWidth: true, visible: true, required: false },
      ],
    }),
  },
];

let _DB_USER_MODULES = [];

const API = {
  getFunctionalities: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return _DB_FUNCTIONALITIES.map((f) => ({ ...f, content: JSON.parse(f.content) }));
  },
  saveFunctionality: async (payload) => {
    await new Promise((r) => setTimeout(r, 600));
    const existing = _DB_FUNCTIONALITIES.findIndex((f) => f.id === payload.id);
    const record = { ...payload, content: JSON.stringify(payload.content) };
    if (existing >= 0) _DB_FUNCTIONALITIES[existing] = record;
    else _DB_FUNCTIONALITIES.push(record);
    return { ok: true, id: payload.id };
  },
  getUserModules: async () => {
    await new Promise((r) => setTimeout(r, 300));
    return _DB_USER_MODULES.map((m) => ({ ...m }));
  },
  saveUserModule: async (payload) => {
    await new Promise((r) => setTimeout(r, 500));
    const existing = _DB_USER_MODULES.findIndex((m) => m.id === payload.id);
    if (existing >= 0) _DB_USER_MODULES[existing] = payload;
    else _DB_USER_MODULES.push(payload);
    return { ok: true, id: payload.id };
  },
  deleteUserModule: async (id) => {
    await new Promise((r) => setTimeout(r, 300));
    _DB_USER_MODULES = _DB_USER_MODULES.filter((m) => m.id !== id);
    return { ok: true };
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TABLE PREVIEW
// ═══════════════════════════════════════════════════════════════════════════════

function TablePreview({ widgets, color }) {
  const cols = widgets.filter((w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit");
  if (cols.length === 0) return <div className="user-catalog__empty">Sin columnas de datos</div>;
  const sampleRows = [
    cols.reduce((a, c) => ({ ...a, [c.fieldKey]: c.type === "number_input" ? "42" : c.type === "date_picker" ? "12/03/2025" : c.type === "select" ? c.options?.[0] || "-" : c.type === "toggle" ? "Sí" : "Ejemplo" }), {}),
    cols.reduce((a, c) => ({ ...a, [c.fieldKey]: c.type === "number_input" ? "18" : c.type === "date_picker" ? "14/03/2025" : c.type === "select" ? c.options?.[1] || "-" : c.type === "toggle" ? "No" : "Muestra" }), {}),
    cols.reduce((a, c) => ({ ...a, [c.fieldKey]: c.type === "number_input" ? "7" : c.type === "date_picker" ? "15/03/2025" : c.type === "select" ? c.options?.[0] || "-" : c.type === "toggle" ? "Sí" : "Registro" }), {}),
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
            {cols.map((c) => (<th key={c.fieldKey} className="table-preview__th">{c.label || c.fieldKey}</th>))}
            <th className="table-preview__th table-preview__th--actions">acciones</th>
          </tr>
        </thead>
        <tbody>
          {sampleRows.map((row, i) => (
            <tr key={i} className="table-preview__tr">
              {cols.map((c) => (<td key={c.fieldKey} className="table-preview__td">{row[c.fieldKey]}</td>))}
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
            <button key={p} className={`table-preview__page-btn ${p === "1" ? "active" : ""}`}>{p}</button>
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
  const dataWidgets = allWidgets.filter((w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit");
  const otherWidgets = allWidgets.filter((w) => !TABLE_FRIENDLY_TYPES.has(w.type) || w.type === "submit");

  const [selected, setSelected] = useState(
    new Set(existingModule?.selectedWidgets?.map((w) => w.fieldKey) || allWidgets.map((w) => w.fieldKey || w.id)),
  );
  const [viewMode, setViewMode] = useState(existingModule?.viewMode || "form");
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const toggle = (key) => setSelected((p) => {
    const n = new Set(p);
    n.has(key) ? n.delete(key) : n.add(key);
    return n;
  });

  const handleSave = async () => {
    setSaving(true);
    const selectedWidgets = allWidgets
      .filter((w) => selected.has(w.fieldKey || w.id))
      .map((w) => ({
        fieldKey: w.fieldKey || w.id, type: w.type, label: w.label, required: w.required,
        props: (({ id, type, fieldKey, visible, required, label, ...rest }) => rest)(w),
      }));
    const payload = {
      id: existingModule?.id || modUid(),
      functionalityId: func.id,
      label: func.label, icon: func.icon, color: func.color,
      viewMode, selectedWidgets,
      dbSchema: {
        tableName: func.label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""),
        columns: selectedWidgets
          .filter((w) => TABLE_FRIENDLY_TYPES.has(w.type) && w.type !== "submit")
          .map((w) => ({
            name: w.fieldKey,
            type: ["number_input", "slider", "rating"].includes(w.type) ? "INTEGER"
              : ["date_picker"].includes(w.type) ? "DATE"
              : ["toggle", "checkbox"].includes(w.type) ? "BOOLEAN" : "VARCHAR(255)",
            label: w.label, required: w.required || false,
          })),
      },
    };
    await API.saveUserModule(payload);
    setSaving(false);
    setSavedOk(true);
    setTimeout(() => { setSavedOk(false); onSave(payload); }, 1000);
  };

  const previewWidgets = allWidgets.filter((w) => selected.has(w.fieldKey || w.id));
  const accent = func.color || "#60a5fa";
  const saveBtnClass = `modal__save-btn${savedOk ? " modal__save-btn--saved" : saving ? " modal__save-btn--saving" : ""}`;

  return (
    <div className="modal-backdrop">
      <div className="modal" style={{ "--accent": accent }}>
        <div className="modal__header">
          <div className="modal__icon">{func.icon}</div>
          <div>
            <div className="modal__title">{func.label}</div>
            <div className="modal__desc">{func.desc}</div>
          </div>
          <div className="modal__spacer" />
          <div className="view-mode-toggle">
            {[{ id: "form", label: "📋 Formulario" }, { id: "table", label: "📊 Tabla" }].map((v) => (
              <button key={v.id} className={`view-mode-btn ${viewMode === v.id ? "active" : "inactive"}`}
                onClick={() => setViewMode(v.id)}>{v.label}</button>
            ))}
          </div>
          <button className="modal__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">
          <div className="modal__fields">
            <div className="modal__fields-header">
              <div className="modal__fields-hint">Elige qué campos tendrá tu módulo</div>
              <div className="modal__fields-sub">Los campos activos se convertirán en columnas de tu base de datos.</div>
            </div>
            <div className="modal__fields-list">
              {dataWidgets.length > 0 && (
                <>
                  <div className="fields-group-label">Campos de datos</div>
                  {dataWidgets.map((w) => {
                    const key = w.fieldKey || w.id;
                    const isOn = selected.has(key);
                    return (
                      <div key={key} className={`field-toggle-row ${isOn ? "on" : "off"}`} onClick={() => toggle(key)}>
                        <div className={`field-toggle-knob ${isOn ? "on" : "off"}`}>
                          <div className={`field-toggle-knob__ball ${isOn ? "on" : "off"}`} />
                        </div>
                        <div className="field-toggle-row__info">
                          <div className={`field-toggle-row__name ${isOn ? "on" : "off"}`}>{w.label}</div>
                          <div className="field-toggle-row__key">{w.fieldKey} · {w.type}</div>
                        </div>
                        {w.required && <span className="field-toggle-row__req">req</span>}
                      </div>
                    );
                  })}
                </>
              )}
              {otherWidgets.length > 0 && (
                <>
                  <div className="fields-group-label fields-group-label--spaced">Widgets de interfaz</div>
                  {otherWidgets.map((w) => {
                    const key = w.fieldKey || w.id;
                    const isOn = selected.has(key);
                    return (
                      <div key={key} className={`field-toggle-row ${isOn ? "on" : "off"}`} onClick={() => toggle(key)}>
                        <div className={`field-toggle-knob ${isOn ? "on" : "off"}`}>
                          <div className={`field-toggle-knob__ball ${isOn ? "on" : "off"}`} />
                        </div>
                        <div className="field-toggle-row__info">
                          <div className={`field-toggle-row__name ${isOn ? "on" : "off"}`}>{w.label || w.type}</div>
                          <div className="field-toggle-row__key">{w.type}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="modal__db-preview">
              <div className="modal__db-preview-label">Columnas que se crearán en la base de datos</div>
              <div className="modal__db-chips">
                {dataWidgets.filter((w) => selected.has(w.fieldKey || w.id)).map((w) => (
                  <span key={w.fieldKey} className="modal__db-chip">{w.fieldKey}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal__preview">
            <div className="modal__preview-label">Vista previa — cómo verán los usuarios ({viewMode === "table" ? "tabla" : "formulario"})</div>
            {viewMode === "table" ? (
              <TablePreview widgets={previewWidgets} color={accent} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {previewWidgets.map((w) => (<WPreview key={w.fieldKey || w.id} w={w} />))}
              </div>
            )}
          </div>
        </div>

        <div className="modal__footer">
          <div className="modal__footer-info">
            {selected.size} campo{selected.size !== 1 ? "s" : ""} activo{selected.size !== 1 ? "s" : ""} · {dataWidgets.filter((w) => selected.has(w.fieldKey || w.id)).length} columna{dataWidgets.filter((w) => selected.has(w.fieldKey || w.id)).length !== 1 ? "s" : ""} en la base de datos
          </div>
          <div className="modal__footer-actions">
            <button className="modal__cancel-btn" onClick={onClose}>Cancelar</button>
            <button className={saveBtnClass} onClick={handleSave} disabled={saving || selected.size === 0}>
              {savedOk ? "✓ Guardado" : saving ? "Guardando..." : "💾 Guardar módulo"}
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
    <div className={`func-card ${alreadyAdded ? "added" : ""}`} style={{ "--accent": func.color }}>
      <div className="func-card__header">
        <div className="func-card__icon">{func.icon}</div>
        <div>
          <div className="func-card__name">{func.label}</div>
          <div className="func-card__desc">{func.desc}</div>
        </div>
      </div>
      <div className="func-card__fields">
        {(func.content?.widgets || []).filter((w) => TABLE_FRIENDLY_TYPES.has(w.type)).slice(0, 4).map((w) => (
          <span key={w.id} className="func-card__field-chip">{w.fieldKey}</span>
        ))}
        {(func.content?.widgets || []).filter((w) => TABLE_FRIENDLY_TYPES.has(w.type)).length > 4 && (
          <span style={{ fontSize: 9, color: "#334155" }}>
            +{(func.content?.widgets || []).filter((w) => TABLE_FRIENDLY_TYPES.has(w.type)).length - 4}
          </span>
        )}
      </div>
      <div className="func-card__tags">
        {(func.tags || []).map((t) => (<span key={t} className="tag-pill">{t}</span>))}
      </div>
      <button disabled={alreadyAdded} onClick={() => onAdd(func)}
        className={`func-card__add-btn ${alreadyAdded ? "already" : "available"}`}>
        {alreadyAdded ? "✓ Agregado" : "+ Agregar a mi sistema"}
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
            {module.selectedWidgets?.length || 0} campos activos · vista: {module.viewMode === "table" ? "tabla" : "formulario"}
          </div>
        </div>
        <div className="user-module-card__spacer" />
        <div className="user-module-card__actions">
          <button className="user-module-card__edit-btn" onClick={() => onEdit(module)}>✏ Editar</button>
          <button className="user-module-card__delete-btn" onClick={() => onDelete(module.id)}>✕</button>
        </div>
      </div>
      <div className="user-module-card__chips">
        {(module.selectedWidgets || []).map((w) => (<span key={w.fieldKey} className="user-module-card__chip">{w.fieldKey}</span>))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// USER SIDE (default export)
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
      const [funcs, mods] = await Promise.all([API.getFunctionalities(), API.getUserModules()]);
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
  const handleDelete = async (id) => { await API.deleteUserModule(id); reload(); };
  const handleSave = async () => { await reload(); setConfigModal(null); };

  const filtered = functionalities.filter((f) => {
    const s = !search || f.label.toLowerCase().includes(search.toLowerCase()) ||
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
        <span className="user-topbar__count">{userModules.length} módulo{userModules.length !== 1 ? "s" : ""} activo{userModules.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="user-body">
        <div className="user-catalog">
          <div className="user-catalog__header">
            <div className="section-label">Módulos disponibles</div>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Buscar módulo..." className="user-catalog__search" />
            <div className="user-catalog__filters">
              {["all", ...CATEGORIES].map((c) => (
                <button key={c} className={`cat-filter-btn ${catFilter === c ? "active" : ""}`}
                  onClick={() => setCatFilter(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="user-catalog__list">
            {loading ? (
              <div className="user-catalog__loading">Cargando módulos...</div>
            ) : filtered.length === 0 ? (
              <div className="user-catalog__empty">
                No se encontraron módulos. Prueba con otro término de búsqueda.
              </div>
            ) : (
              filtered.map((f) => (
                <FuncCard key={f.id} func={f} onAdd={handleAdd} alreadyAdded={addedIds.has(f.id)} />
              ))
            )}
          </div>
        </div>

        <div className="user-canvas">
          {userModules.length === 0 ? (
            <div className="user-canvas__empty">
              <div className="user-canvas__empty-inner" style={{ textAlign: "center" }}>
                <div className="user-canvas__empty-icon">🏗</div>
                <div className="user-canvas__empty-title">Tu sistema está vacío</div>
                <div className="user-canvas__empty-sub">
                  Selecciona un módulo del panel izquierdo y agrégalo para empezar a usar tu sistema.
                </div>
              </div>
            </div>
          ) : (
            <div className="user-canvas__inner">
              <div className="user-canvas__modules-label">Módulos de tu sistema ({userModules.length})</div>
              {userModules.map((mod) => (
                <UserModuleCard key={mod.id} module={mod} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              <div className="user-json-block">
                <div className="user-json-block__header">Configuración exportable — el backend usará esto para crear las tablas</div>
                <pre className="user-json-block__pre">
                  {JSON.stringify({ userSystem: { modules: userModules } }, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {configModal && (
        <UserConfigModal
          func={configModal.func} existingModule={configModal.existingModule}
          onSave={handleSave} onClose={() => setConfigModal(null)}
        />
      )}
    </div>
  );
}
