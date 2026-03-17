import { useState, useRef, useCallback, useEffect } from "react";
import "./ElementosTest.css";

// ═══════════════════════════════════════════════════════════════════════════════
// SIMULATED API
// Replace these functions with real fetch() calls to your backend.
// Expected endpoints:
//   GET  /api/functionalities   → [{ id, label, icon, color, category, desc, tags, content }]
//   POST /api/functionalities   → body: { label, icon, color, category, desc, tags, content }
//   GET  /api/user-modules      → [{ id, functionalityId, selectedWidgets, viewMode, ... }]
//   POST /api/user-modules      → body: { functionalityId, selectedWidgets, viewMode }
// ═══════════════════════════════════════════════════════════════════════════════
let _DB_FUNCTIONALITIES = [
  {
    id: "func_seed_001",
    label: "Inventario",
    icon: "🗄️",
    color: "#7dd3fc",
    category: "logistica",
    desc: "Control de stock, entradas y salidas de productos",
    tags: ["inventario", "logística", "stock", "productos"],
    content: JSON.stringify({
      widgets: [
        {
          id: "w1",
          type: "heading",
          fieldKey: "titulo",
          label: "Inventario",
          text: "Registro de Inventario",
          level: "h2",
          color: "#7dd3fc",
          align: "left",
          visible: true,
          required: false,
        },
        {
          id: "w2",
          type: "text_input",
          fieldKey: "producto",
          label: "Producto",
          placeholder: "Nombre del producto",
          visible: true,
          required: true,
        },
        {
          id: "w3",
          type: "number_input",
          fieldKey: "cantidad",
          label: "Cantidad",
          placeholder: "0",
          min: "0",
          max: "",
          step: 1,
          visible: true,
          required: true,
        },
        {
          id: "w4",
          type: "select",
          fieldKey: "unidad",
          label: "Unidad de medida",
          options: ["piezas", "kg", "litros", "cajas", "metros"],
          placeholder: "-- Seleccionar --",
          visible: true,
          required: true,
        },
        {
          id: "w5",
          type: "number_input",
          fieldKey: "minimo",
          label: "Stock mínimo",
          placeholder: "0",
          min: "0",
          step: 1,
          visible: true,
          required: false,
        },
        {
          id: "w6",
          type: "number_input",
          fieldKey: "maximo",
          label: "Stock máximo",
          placeholder: "0",
          min: "0",
          step: 1,
          visible: true,
          required: false,
        },
        {
          id: "w7",
          type: "text_input",
          fieldKey: "ubicacion",
          label: "Ubicación",
          placeholder: "Ej: Bodega A, Anaquel 3",
          visible: true,
          required: false,
        },
        {
          id: "w8",
          type: "text_input",
          fieldKey: "proveedor",
          label: "Proveedor",
          placeholder: "Nombre del proveedor",
          visible: true,
          required: false,
        },
        {
          id: "w9",
          type: "number_input",
          fieldKey: "precio",
          label: "Precio unitario",
          placeholder: "0.00",
          min: "0",
          step: 0.01,
          visible: true,
          required: false,
        },
        {
          id: "w10",
          type: "textarea",
          fieldKey: "notas",
          label: "Notas adicionales",
          placeholder: "Observaciones...",
          rows: 3,
          visible: true,
          required: false,
        },
        {
          id: "w11",
          type: "submit",
          fieldKey: "guardar",
          label: "Guardar",
          text: "Guardar registro",
          color: "#7dd3fc",
          size: "lg",
          fullWidth: true,
          visible: true,
          required: false,
        },
      ],
    }),
  },
  {
    id: "func_seed_002",
    label: "Empleados",
    icon: "👥",
    color: "#60a5fa",
    category: "personal",
    desc: "Registro de trabajadores con nombre, rol y datos de contacto",
    tags: ["personal", "empleados", "RRHH", "recursos humanos"],
    content: JSON.stringify({
      widgets: [
        {
          id: "e1",
          type: "heading",
          fieldKey: "titulo",
          label: "Empleados",
          text: "Datos del Empleado",
          level: "h2",
          color: "#60a5fa",
          align: "left",
          visible: true,
          required: false,
        },
        {
          id: "e2",
          type: "text_input",
          fieldKey: "nombre",
          label: "Nombre",
          placeholder: "Nombre(s)",
          visible: true,
          required: true,
        },
        {
          id: "e3",
          type: "text_input",
          fieldKey: "apellido",
          label: "Apellido",
          placeholder: "Apellido(s)",
          visible: true,
          required: true,
        },
        {
          id: "e4",
          type: "select",
          fieldKey: "rol",
          label: "Rol",
          options: ["Empleado", "Supervisor", "Gerente", "Admin", "Otro"],
          placeholder: "-- Seleccionar --",
          visible: true,
          required: true,
        },
        {
          id: "e5",
          type: "email_input",
          fieldKey: "email",
          label: "Correo electrónico",
          placeholder: "correo@empresa.com",
          visible: true,
          required: false,
        },
        {
          id: "e6",
          type: "text_input",
          fieldKey: "telefono",
          label: "Teléfono",
          placeholder: "(000) 000-0000",
          visible: true,
          required: false,
        },
        {
          id: "e7",
          type: "date_picker",
          fieldKey: "ingreso",
          label: "Fecha de ingreso",
          visible: true,
          required: false,
        },
        {
          id: "e8",
          type: "number_input",
          fieldKey: "salario",
          label: "Salario base",
          placeholder: "0.00",
          min: "0",
          step: 100,
          visible: true,
          required: false,
        },
        {
          id: "e9",
          type: "toggle",
          fieldKey: "activo",
          label: "Empleado activo",
          activeLabel: "Activo",
          inactiveLabel: "Inactivo",
          defaultValue: true,
          visible: true,
          required: false,
        },
        {
          id: "e10",
          type: "submit",
          fieldKey: "guardar",
          label: "Guardar",
          text: "Registrar empleado",
          color: "#60a5fa",
          size: "lg",
          fullWidth: true,
          visible: true,
          required: false,
        },
      ],
    }),
  },
  {
    id: "func_seed_003",
    label: "Citas / Reservas",
    icon: "📅",
    color: "#a78bfa",
    category: "operaciones",
    desc: "Agenda de citas con cliente, profesional, servicio y estado",
    tags: [
      "citas",
      "agenda",
      "reservas",
      "clientes",
      "spa",
      "barbería",
      "consultorio",
    ],
    content: JSON.stringify({
      widgets: [
        {
          id: "c1",
          type: "heading",
          fieldKey: "titulo",
          label: "Citas",
          text: "Nueva Cita",
          level: "h2",
          color: "#a78bfa",
          align: "left",
          visible: true,
          required: false,
        },
        {
          id: "c2",
          type: "text_input",
          fieldKey: "cliente",
          label: "Cliente",
          placeholder: "Nombre del cliente",
          visible: true,
          required: true,
        },
        {
          id: "c3",
          type: "text_input",
          fieldKey: "profesional",
          label: "Profesional",
          placeholder: "Asignado a...",
          visible: true,
          required: true,
        },
        {
          id: "c4",
          type: "select",
          fieldKey: "servicio",
          label: "Servicio",
          options: ["Consulta", "Corte", "Masaje", "Revisión", "Otro"],
          placeholder: "-- Tipo --",
          visible: true,
          required: true,
        },
        {
          id: "c5",
          type: "date_picker",
          fieldKey: "fecha",
          label: "Fecha",
          visible: true,
          required: true,
        },
        {
          id: "c6",
          type: "time_picker",
          fieldKey: "hora",
          label: "Hora",
          format: "12h",
          visible: true,
          required: true,
        },
        {
          id: "c7",
          type: "select",
          fieldKey: "estado",
          label: "Estado",
          options: ["Pendiente", "Confirmada", "Cancelada", "Completada"],
          placeholder: "-- Estado --",
          visible: true,
          required: false,
        },
        {
          id: "c8",
          type: "textarea",
          fieldKey: "notas",
          label: "Notas",
          placeholder: "Observaciones...",
          rows: 2,
          visible: true,
          required: false,
        },
        {
          id: "c9",
          type: "submit",
          fieldKey: "guardar",
          label: "Guardar",
          text: "Agendar cita",
          color: "#a78bfa",
          size: "lg",
          fullWidth: true,
          visible: true,
          required: false,
        },
      ],
    }),
  },
];

let _DB_USER_MODULES = [];

const API = {
  getFunctionalities: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return _DB_FUNCTIONALITIES.map((f) => ({
      ...f,
      content: JSON.parse(f.content),
    }));
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
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════
const COLORS = [
  "#f8fafc",
  "#94a3b8",
  "#60a5fa",
  "#4ade80",
  "#f59e0b",
  "#f472b6",
  "#a78bfa",
  "#fb923c",
  "#34d399",
  "#22d3ee",
  "#f87171",
  "#e879f9",
  "#fbbf24",
  "#2dd4bf",
  "#7dd3fc",
];
const ICONS = [
  "📦",
  "👥",
  "💰",
  "📅",
  "🗄️",
  "🔑",
  "🧾",
  "📊",
  "🏥",
  "✂️",
  "🧘",
  "🛒",
  "🍽️",
  "📋",
  "⚡",
  "🚚",
  "🔔",
  "📈",
  "💳",
  "🏦",
  "⚙️",
  "🎫",
  "📝",
  "🎁",
  "🪑",
  "👤",
  "🔐",
  "⏱",
];
const TAG_SUGGESTIONS = [
  "inventario",
  "personal",
  "clientes",
  "finanzas",
  "ventas",
  "citas",
  "reportes",
  "RRHH",
  "productos",
  "servicios",
  "logística",
  "pagos",
  "facturación",
  "médico",
  "spa",
  "barbería",
  "restaurante",
  "renta",
  "tienda",
];
const CATEGORIES = [
  "operaciones",
  "personal",
  "clientes",
  "catalogo",
  "finanzas",
  "logistica",
  "reportes",
];
const TABLE_FRIENDLY_TYPES = new Set([
  "text_input",
  "number_input",
  "email_input",
  "date_picker",
  "time_picker",
  "select",
  "multiselect",
  "checkbox",
  "toggle",
  "textarea",
  "rating",
  "slider",
]);

const WIDGET_CATALOG = [
  {
    type: "text_input",
    group: "inputs",
    label: "Text Input",
    icon: "▤",
    desc: "Texto libre",
  },
  {
    type: "number_input",
    group: "inputs",
    label: "Number",
    icon: "##",
    desc: "Campo numérico",
  },
  {
    type: "email_input",
    group: "inputs",
    label: "Email",
    icon: "@",
    desc: "Email con validación",
  },
  {
    type: "password_input",
    group: "inputs",
    label: "Password",
    icon: "••",
    desc: "Contraseña",
  },
  {
    type: "textarea",
    group: "inputs",
    label: "Textarea",
    icon: "≡",
    desc: "Texto multilínea",
  },
  {
    type: "date_picker",
    group: "inputs",
    label: "Date Picker",
    icon: "📅",
    desc: "Selector de fecha",
  },
  {
    type: "time_picker",
    group: "inputs",
    label: "Time Picker",
    icon: "🕐",
    desc: "Selector de hora",
  },
  {
    type: "file_upload",
    group: "inputs",
    label: "File Upload",
    icon: "⬆",
    desc: "Carga de archivos",
  },
  {
    type: "color_picker",
    group: "inputs",
    label: "Color Picker",
    icon: "🎨",
    desc: "Selector de color",
  },
  {
    type: "select",
    group: "selectors",
    label: "Dropdown",
    icon: "⌄",
    desc: "Lista desplegable",
  },
  {
    type: "multiselect",
    group: "selectors",
    label: "Multi Select",
    icon: "⌄⌄",
    desc: "Selección múltiple",
  },
  {
    type: "radio_group",
    group: "selectors",
    label: "Radio Group",
    icon: "◎",
    desc: "Opciones excluyentes",
  },
  {
    type: "checkbox",
    group: "selectors",
    label: "Checkbox",
    icon: "☑",
    desc: "Casilla",
  },
  {
    type: "toggle",
    group: "selectors",
    label: "Toggle",
    icon: "⟳",
    desc: "On/Off",
  },
  {
    type: "checkbox_group",
    group: "selectors",
    label: "Checkbox Group",
    icon: "☑☑",
    desc: "Varias casillas",
  },
  {
    type: "rating",
    group: "selectors",
    label: "Rating Stars",
    icon: "★",
    desc: "Calificación",
  },
  {
    type: "slider",
    group: "selectors",
    label: "Slider",
    icon: "⟺",
    desc: "Deslizador",
  },
  {
    type: "heading",
    group: "display",
    label: "Heading",
    icon: "H",
    desc: "Título",
  },
  {
    type: "paragraph",
    group: "display",
    label: "Paragraph",
    icon: "P",
    desc: "Texto",
  },
  {
    type: "badge",
    group: "display",
    label: "Badge",
    icon: "⬟",
    desc: "Etiqueta",
  },
  {
    type: "alert",
    group: "display",
    label: "Alert",
    icon: "⚠",
    desc: "Alerta",
  },
  {
    type: "divider",
    group: "display",
    label: "Divider",
    icon: "─",
    desc: "Separador",
  },
  {
    type: "spacer",
    group: "display",
    label: "Spacer",
    icon: "↕",
    desc: "Espacio",
  },
  {
    type: "image",
    group: "display",
    label: "Image",
    icon: "🖼",
    desc: "Imagen",
  },
  {
    type: "avatar",
    group: "display",
    label: "Avatar",
    icon: "👤",
    desc: "Avatar",
  },
  {
    type: "progress",
    group: "display",
    label: "Progress",
    icon: "▬",
    desc: "Progreso",
  },
  { type: "card", group: "layout", label: "Card", icon: "▭", desc: "Tarjeta" },
  {
    type: "section",
    group: "layout",
    label: "Section",
    icon: "⬜",
    desc: "Sección",
  },
  { type: "tabs", group: "layout", label: "Tabs", icon: "⬚", desc: "Pestañas" },
  {
    type: "table",
    group: "layout",
    label: "Data Table",
    icon: "⊟",
    desc: "Tabla de datos",
  },
  {
    type: "button",
    group: "actions",
    label: "Button",
    icon: "⬛",
    desc: "Botón",
  },
  {
    type: "submit",
    group: "actions",
    label: "Submit",
    icon: "→",
    desc: "Enviar",
  },
  { type: "link", group: "actions", label: "Link", icon: "🔗", desc: "Enlace" },
  {
    type: "stat_card",
    group: "data",
    label: "Stat Card",
    icon: "📊",
    desc: "Métrica",
  },
  {
    type: "kv_display",
    group: "data",
    label: "Key-Value",
    icon: "⇒",
    desc: "Clave-valor",
  },
  {
    type: "chart_bar",
    group: "data",
    label: "Bar Chart",
    icon: "📈",
    desc: "Gráfica",
  },
];
const WIDGET_GROUPS = [
  { id: "all", label: "Todos" },
  { id: "inputs", label: "Inputs" },
  { id: "selectors", label: "Selectores" },
  { id: "display", label: "Display" },
  { id: "layout", label: "Layout" },
  { id: "actions", label: "Acciones" },
  { id: "data", label: "Datos" },
];

let _uid = 1;
const uid = () => `w_${_uid++}_${Math.random().toString(36).slice(2, 5)}`;
const modUid = () =>
  `mod_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;

const defaultProps = (type) => {
  const base = {
    id: uid(),
    type,
    fieldKey: type.replace(/_/g, "").slice(0, 12),
    label: WIDGET_CATALOG.find((w) => w.type === type)?.label || type,
    visible: true,
    required: false,
  };
  const extras = {
    text_input: { placeholder: "Escribe aquí..." },
    number_input: { placeholder: "0", min: "", max: "", step: 1 },
    email_input: { placeholder: "usuario@ejemplo.com" },
    password_input: { showStrength: true },
    textarea: { placeholder: "Escribe aquí...", rows: 3 },
    date_picker: { includeTime: false },
    time_picker: { format: "24h" },
    file_upload: { accept: "*", multiple: false },
    color_picker: { defaultColor: "#60a5fa" },
    select: {
      options: ["Opción 1", "Opción 2", "Opción 3"],
      placeholder: "-- Elige --",
    },
    multiselect: { options: ["Opción A", "Opción B", "Opción C"] },
    radio_group: { options: ["Sí", "No", "No aplica"], layout: "vertical" },
    checkbox: { checked: false },
    toggle: { activeLabel: "Sí", inactiveLabel: "No", defaultValue: false },
    checkbox_group: { options: ["Opción 1", "Opción 2"], layout: "vertical" },
    rating: { max: 5 },
    slider: { min: 0, max: 100, step: 1, showValue: true },
    heading: {
      text: "Título de sección",
      level: "h2",
      color: "#f8fafc",
      align: "left",
    },
    paragraph: {
      text: "Texto descriptivo.",
      color: "#94a3b8",
      size: "md",
      align: "left",
    },
    badge: {
      text: "Activo",
      color: "#4ade80",
      bgColor: "#14532d",
      shape: "pill",
    },
    alert: {
      message: "Información importante.",
      variant: "info",
      dismissible: true,
    },
    divider: { style: "solid", color: "#1e293b", thickness: 1 },
    spacer: { height: 20 },
    image: { src: "", alt: "Imagen", width: "100%", rounded: true },
    avatar: { name: "Usuario", size: "md", showName: true },
    progress: { value: 65, max: 100, color: "#60a5fa", showPercent: true },
    card: { title: "Tarjeta", subtitle: "", padding: "md" },
    section: { title: "Sección", collapsible: false, color: "#60a5fa" },
    tabs: { tabs: ["General", "Detalles"] },
    table: {
      columns: ["Nombre", "Estado", "Fecha"],
      showSearch: true,
      showPagination: true,
    },
    button: {
      text: "Acción",
      variant: "primary",
      color: "#60a5fa",
      size: "md",
      fullWidth: false,
    },
    submit: { text: "Guardar", color: "#4ade80", size: "lg", fullWidth: true },
    link: { text: "Ver más", href: "#", color: "#60a5fa", underline: true },
    stat_card: {
      label: "Métrica",
      value: "$0",
      change: "+0%",
      changeType: "positive",
      icon: "📊",
    },
    kv_display: { key: "Campo", value: "Valor", divider: true },
    chart_bar: {
      title: "Gráfica",
      labels: ["A", "B", "C"],
      data: [30, 65, 45],
      color: "#60a5fa",
    },
  };
  return { ...base, ...(extras[type] || {}) };
};

// ═══════════════════════════════════════════════════════════════════════════════
// WIDGET PREVIEWS
// Dynamic per-widget values (colors, heights, etc.) stay inline via style prop,
// but only as CSS custom properties or irreducible calculated values.
// ═══════════════════════════════════════════════════════════════════════════════
function WPreview({ w, dimmed = false }) {
  const op = dimmed ? 0.25 : 1;

  const Lbl = ({ text, req }) => (
    <div className="wp-label" style={{ "--wp-op": op }}>
      {text}
      {req && <span className="wp-label__req"> *</span>}
    </div>
  );
  const Inp = ({ children, flex }) => (
    <div className="wp-input" style={flex ? { flex: 1 } : undefined}>
      {children}
    </div>
  );

  switch (w.type) {
    case "text_input":
    case "email_input":
    case "number_input":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          <Inp>
            {w.type === "number_input"
              ? w.placeholder || "0"
              : w.placeholder || "..."}
          </Inp>
        </div>
      );
    case "password_input":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          <Inp>••••••••</Inp>
        </div>
      );
    case "textarea":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          <div className="wp-textarea">{w.placeholder}</div>
        </div>
      );
    case "date_picker":
    case "time_picker":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          <Inp>{w.type === "date_picker" ? "DD/MM/AAAA" : "HH:MM"}</Inp>
        </div>
      );
    case "color_picker":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          <div className="wp-color-row">
            <div
              className="wp-color-swatch"
              style={{ background: w.defaultColor || "#60a5fa" }}
            />
            <Inp flex>{w.defaultColor || "#60a5fa"}</Inp>
          </div>
        </div>
      );
    case "file_upload":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          <div className="wp-file-drop">
            ⬆ {w.multiple ? "Subir archivos" : "Subir archivo"}
          </div>
        </div>
      );
    case "select":
    case "multiselect":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          <Inp>{w.placeholder || w.options?.[0] || "--"} ⌄</Inp>
        </div>
      );
    case "radio_group":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} req={w.required} />
          {(w.options || []).slice(0, 3).map((o, i) => (
            <div key={i} className="wp-radio-option">
              <div
                className={`wp-radio-dot ${i === 0 ? "checked" : "unchecked"}`}
              />
              <span className="wp-radio-text">{o}</span>
            </div>
          ))}
        </div>
      );
    case "checkbox":
      return (
        <div className="wp-checkbox-wrap" style={{ "--wp-op": op }}>
          <div
            className={`wp-checkbox-box ${w.checked ? "checked" : "unchecked"}`}
          >
            {w.checked && <span className="wp-checkbox-check">✓</span>}
          </div>
          <span className="wp-checkbox-text">{w.label}</span>
        </div>
      );
    case "toggle":
      return (
        <div className="wp-toggle-wrap" style={{ "--wp-op": op }}>
          <div className={`wp-toggle-track ${w.defaultValue ? "on" : "off"}`}>
            <div
              className={`wp-toggle-thumb ${w.defaultValue ? "on" : "off"}`}
            />
          </div>
          <span className="wp-toggle-label">{w.label}</span>
        </div>
      );
    case "checkbox_group":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          {(w.options || []).slice(0, 3).map((o, i) => (
            <div key={i} className="wp-ck-group-option">
              <div className="wp-ck-box" />
              <span className="wp-radio-text">{o}</span>
            </div>
          ))}
        </div>
      );
    case "rating":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          <div className="wp-stars">
            {Array.from({ length: w.max || 5 }, (_, i) => (
              <span key={i} className={i < 3 ? "wp-star--on" : "wp-star--off"}>
                ★
              </span>
            ))}
          </div>
        </div>
      );
    case "slider":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          <div className="wp-slider-track">
            <div className="wp-slider-fill" />
            <div className="wp-slider-thumb" />
          </div>
        </div>
      );
    case "heading":
      return (
        <div
          className="wp"
          style={{
            "--wp-op": op,
            fontSize: w.level === "h1" ? 20 : w.level === "h3" ? 13 : 16,
            fontWeight: 700,
            color: w.color || "#f8fafc",
            textAlign: w.align || "left",
            letterSpacing: -0.5,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {w.text}
        </div>
      );
    case "paragraph":
      return (
        <div
          className="wp"
          style={{
            "--wp-op": op,
            fontSize: 11,
            color: w.color || "#94a3b8",
            textAlign: w.align || "left",
            fontFamily: "'Outfit',sans-serif",
            lineHeight: 1.5,
          }}
        >
          {w.text}
        </div>
      );
    case "badge":
      return (
        <span
          className="wp"
          style={{
            "--wp-op": op,
            background: w.bgColor || "#14532d",
            color: w.color || "#4ade80",
            borderRadius: w.shape === "pill" ? 999 : 4,
            padding: "2px 9px",
            fontSize: 10,
            fontWeight: 600,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {w.text}
        </span>
      );
    case "alert": {
      const ac =
        {
          info: "#60a5fa",
          warning: "#f59e0b",
          error: "#f87171",
          success: "#4ade80",
        }[w.variant] || "#60a5fa";
      return (
        <div
          className="wp"
          style={{
            "--wp-op": op,
            background: `${ac}15`,
            border: `1px solid ${ac}40`,
            borderRadius: 7,
            padding: "8px 12px",
            color: ac,
            fontSize: 11,
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {w.message}
        </div>
      );
    }
    case "divider":
      return (
        <hr
          className="wp"
          style={{
            "--wp-op": op,
            border: "none",
            borderTop: `${w.thickness || 1}px ${w.style || "solid"} ${w.color || "#1e293b"}`,
            margin: "4px 0",
          }}
        />
      );
    case "spacer":
      return (
        <div
          className="wp-spacer-box"
          style={{ height: w.height || 20, "--wp-op": op }}
        >
          <span className="wp-spacer-text">↕ {w.height}px</span>
        </div>
      );
    case "image":
      return (
        <div
          className="wp-image-placeholder"
          style={{ "--wp-op": op, borderRadius: w.rounded ? 8 : 0 }}
        >
          🖼 {w.alt}
        </div>
      );
    case "avatar":
      return (
        <div className="wp-avatar-wrap" style={{ "--wp-op": op }}>
          <div className="wp-avatar-circle">👤</div>
          {w.showName && <span className="wp-avatar-name">{w.name}</span>}
        </div>
      );
    case "progress":
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <Lbl text={w.label} />
          <div className="wp-progress-track">
            <div
              className="wp-progress-fill"
              style={{
                background: w.color || "#60a5fa",
                width: `${((w.value || 65) / (w.max || 100)) * 100}%`,
              }}
            />
          </div>
        </div>
      );
    case "card":
      return (
        <div className="wp-card" style={{ "--wp-op": op }}>
          <div className="wp-card__title">{w.title}</div>
          {w.subtitle && <div className="wp-card__subtitle">{w.subtitle}</div>}
        </div>
      );
    case "section":
      return (
        <div
          className="wp-section"
          style={{
            "--wp-op": op,
            border: `1px solid ${w.color || "#60a5fa"}33`,
          }}
        >
          <div
            className="wp-section__header"
            style={{
              background: `${w.color || "#60a5fa"}20`,
              color: w.color || "#60a5fa",
            }}
          >
            {w.title}
          </div>
          <div className="wp-section__body">contenido...</div>
        </div>
      );
    case "tabs":
      return (
        <div className="wp-tabs" style={{ "--wp-op": op }}>
          {(w.tabs || []).slice(0, 3).map((t, i) => (
            <div
              key={i}
              className={`wp-tab-item ${i === 0 ? "active" : "inactive"}`}
            >
              {t}
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="wp-table" style={{ "--wp-op": op }}>
          <div
            className="wp-table-header"
            style={{
              gridTemplateColumns: `repeat(${Math.min((w.columns || []).length, 4)},1fr)`,
            }}
          >
            {(w.columns || []).slice(0, 4).map((c, i) => (
              <div key={i} className="wp-table-th">
                {c}
              </div>
            ))}
          </div>
          <div className="wp-table-body">registros...</div>
        </div>
      );
    case "button":
      return (
        <button
          className="wp"
          style={{
            "--wp-op": op,
            background:
              w.variant === "outline" ? "transparent" : w.color || "#60a5fa",
            color: w.variant === "outline" ? w.color || "#60a5fa" : "#030712",
            border: `1.5px solid ${w.color || "#60a5fa"}`,
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {w.text}
        </button>
      );
    case "submit":
      return (
        <button
          className="wp"
          style={{
            "--wp-op": op,
            background: w.color || "#4ade80",
            color: "#030712",
            border: "none",
            borderRadius: 7,
            padding: "9px 20px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Outfit',sans-serif",
            width: w.fullWidth ? "100%" : "auto",
          }}
        >
          {w.text}
        </button>
      );
    case "link":
      return (
        <a
          href="#"
          className="wp"
          style={{
            "--wp-op": op,
            color: w.color || "#60a5fa",
            fontSize: 11,
            textDecoration: w.underline ? "underline" : "none",
            fontFamily: "'Outfit',sans-serif",
          }}
        >
          {w.text} →
        </a>
      );
    case "stat_card":
      return (
        <div className="wp-stat-card" style={{ "--wp-op": op }}>
          <div className="wp-stat-label">
            {w.icon} {w.label}
          </div>
          <div className="wp-stat-value">{w.value}</div>
          <div
            className={`wp-stat-change wp-stat-change--${w.changeType === "positive" ? "pos" : "neg"}`}
          >
            {w.change}
          </div>
        </div>
      );
    case "kv_display":
      return (
        <div
          className={`wp-kv-row ${w.divider ? "divider" : ""}`}
          style={{ "--wp-op": op }}
        >
          <span className="wp-kv-key">{w.key}</span>
          <span className="wp-kv-value">{w.value}</span>
        </div>
      );
    case "chart_bar": {
      const mx = Math.max(...(w.data || [1]));
      return (
        <div className="wp" style={{ "--wp-op": op }}>
          <div className="wp-chart-bars">
            {(w.data || []).map((v, i) => (
              <div key={i} className="wp-chart-bar-col">
                <div
                  className="wp-chart-bar"
                  style={{
                    background: w.color || "#60a5fa",
                    height: `${(v / mx) * 32}px`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="wp-chart-labels">
            {(w.labels || []).map((l, i) => (
              <div key={i} className="wp-chart-label">
                {l}
              </div>
            ))}
          </div>
        </div>
      );
    }
    default:
      return <div className="wp-default">[{w.type}]</div>;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// PROP CONTROLS
// ═══════════════════════════════════════════════════════════════════════════════
function PF({ label, children }) {
  return (
    <div className="pf">
      <label className="pf__label">{label}</label>
      {children}
    </div>
  );
}
function TP({ val, set, placeholder, mono }) {
  return (
    <input
      value={val ?? ""}
      onChange={(e) => set(e.target.value)}
      placeholder={placeholder || ""}
      className={`ctrl ${mono ? "" : "ctrl--sans"}`}
    />
  );
}
function SP({ val, set, opts }) {
  return (
    <select
      value={val ?? ""}
      onChange={(e) => set(e.target.value)}
      className="ctrl"
    >
      {opts.map((o) => (
        <option key={o.v ?? o} value={o.v ?? o}>
          {o.l ?? o}
        </option>
      ))}
    </select>
  );
}
function CK({ val, set, label }) {
  return (
    <label className="ck-label">
      <div
        className={`ck-box ${val ? "checked" : ""}`}
        onClick={() => set(!val)}
      >
        {val && <span className="ck-box__check">✓</span>}
      </div>
      {label && <span className="ck-text">{label}</span>}
    </label>
  );
}
function ColorP({ val, set }) {
  return (
    <div className="color-palette">
      {COLORS.map((c) => (
        <div
          key={c}
          className={`color-swatch ${val === c ? "active" : ""}`}
          style={{ background: c }}
          onClick={() => set(c)}
        />
      ))}
      <input
        type="color"
        value={val || "#60a5fa"}
        onChange={(e) => set(e.target.value)}
        className="color-native"
      />
    </div>
  );
}
function ListE({ val, set, addLabel }) {
  const items = val || [];
  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="list-editor__row">
          <input
            value={it}
            onChange={(e) => {
              const n = [...items];
              n[i] = e.target.value;
              set(n);
            }}
            className="ctrl list-editor__input"
          />
          <button
            className="list-editor__remove"
            onClick={() => set(items.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="list-editor__add"
        onClick={() =>
          set([...items, `${addLabel || "Ítem"} ${items.length + 1}`])
        }
      >
        + Agregar
      </button>
    </div>
  );
}

function WidgetPropsPanel({ widget, onChange }) {
  if (!widget)
    return <div className="props-panel__empty">← Selecciona un widget</div>;
  const p = widget;
  const u = (k, v) => onChange({ ...p, [k]: v });
  const common = (
    <>
      <PF label="Field Key">
        <TP val={p.fieldKey} set={(v) => u("fieldKey", v)} mono />
      </PF>
      <PF label="Etiqueta">
        <TP val={p.label} set={(v) => u("label", v)} />
      </PF>
      <PF label="Requerido">
        <CK
          val={p.required}
          set={(v) => u("required", v)}
          label="Campo obligatorio"
        />
      </PF>
    </>
  );

  const fs = () => {
    switch (p.type) {
      case "text_input":
      case "email_input":
      case "number_input":
      case "password_input":
        return (
          <>
            {common}
            <PF label="Placeholder">
              <TP val={p.placeholder} set={(v) => u("placeholder", v)} mono />
            </PF>
            {p.type === "number_input" && (
              <>
                <PF label="Mínimo">
                  <TP val={p.min} set={(v) => u("min", v)} mono />
                </PF>
                <PF label="Máximo">
                  <TP val={p.max} set={(v) => u("max", v)} mono />
                </PF>
              </>
            )}
          </>
        );
      case "textarea":
        return (
          <>
            {common}
            <PF label="Placeholder">
              <TP val={p.placeholder} set={(v) => u("placeholder", v)} />
            </PF>
            <PF label="Filas">
              <TP val={p.rows} set={(v) => u("rows", Number(v))} mono />
            </PF>
          </>
        );
      case "date_picker":
        return (
          <>
            {common}
            <PF label="Incluir hora">
              <CK
                val={p.includeTime}
                set={(v) => u("includeTime", v)}
                label="Con hora"
              />
            </PF>
          </>
        );
      case "time_picker":
        return (
          <>
            {common}
            <PF label="Formato">
              <SP
                val={p.format}
                set={(v) => u("format", v)}
                opts={["12h", "24h"]}
              />
            </PF>
          </>
        );
      case "color_picker":
        return (
          <>
            {common}
            <PF label="Color inicial">
              <ColorP val={p.defaultColor} set={(v) => u("defaultColor", v)} />
            </PF>
          </>
        );
      case "file_upload":
        return (
          <>
            {common}
            <PF label="Tipos">
              <TP val={p.accept} set={(v) => u("accept", v)} mono />
            </PF>
            <PF label="Múltiples">
              <CK
                val={p.multiple}
                set={(v) => u("multiple", v)}
                label="Varios archivos"
              />
            </PF>
          </>
        );
      case "select":
      case "multiselect":
        return (
          <>
            {common}
            <PF label="Opciones">
              <ListE val={p.options} set={(v) => u("options", v)} />
            </PF>
            <PF label="Placeholder">
              <TP val={p.placeholder} set={(v) => u("placeholder", v)} />
            </PF>
          </>
        );
      case "radio_group":
      case "checkbox_group":
        return (
          <>
            {common}
            <PF label="Opciones">
              <ListE val={p.options} set={(v) => u("options", v)} />
            </PF>
            <PF label="Layout">
              <SP
                val={p.layout}
                set={(v) => u("layout", v)}
                opts={["vertical", "horizontal"]}
              />
            </PF>
          </>
        );
      case "checkbox":
        return (
          <>
            {common}
            <PF label="Marcado por defecto">
              <CK
                val={p.checked}
                set={(v) => u("checked", v)}
                label="Checked"
              />
            </PF>
          </>
        );
      case "toggle":
        return (
          <>
            {common}
            <PF label="Label activo">
              <TP val={p.activeLabel} set={(v) => u("activeLabel", v)} />
            </PF>
            <PF label="Label inactivo">
              <TP val={p.inactiveLabel} set={(v) => u("inactiveLabel", v)} />
            </PF>
            <PF label="ON por defecto">
              <CK
                val={p.defaultValue}
                set={(v) => u("defaultValue", v)}
                label="Encendido"
              />
            </PF>
          </>
        );
      case "rating":
        return (
          <>
            {common}
            <PF label="Máx estrellas">
              <TP val={p.max} set={(v) => u("max", Number(v))} mono />
            </PF>
          </>
        );
      case "slider":
        return (
          <>
            {common}
            <PF label="Mínimo">
              <TP val={p.min} set={(v) => u("min", Number(v))} mono />
            </PF>
            <PF label="Máximo">
              <TP val={p.max} set={(v) => u("max", Number(v))} mono />
            </PF>
            <PF label="Paso">
              <TP val={p.step} set={(v) => u("step", Number(v))} mono />
            </PF>
          </>
        );
      case "heading":
        return (
          <>
            <PF label="Texto">
              <TP val={p.text} set={(v) => u("text", v)} />
            </PF>
            <PF label="Nivel">
              <SP
                val={p.level}
                set={(v) => u("level", v)}
                opts={["h1", "h2", "h3", "h4"]}
              />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
            <PF label="Alineación">
              <SP
                val={p.align}
                set={(v) => u("align", v)}
                opts={["left", "center", "right"]}
              />
            </PF>
          </>
        );
      case "paragraph":
        return (
          <>
            <PF label="Texto">
              <textarea
                value={p.text}
                onChange={(e) => u("text", e.target.value)}
                rows={3}
                className="ctrl ctrl--textarea"
              />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
            <PF label="Tamaño">
              <SP
                val={p.size}
                set={(v) => u("size", v)}
                opts={["sm", "md", "lg"]}
              />
            </PF>
          </>
        );
      case "badge":
        return (
          <>
            <PF label="Texto">
              <TP val={p.text} set={(v) => u("text", v)} />
            </PF>
            <PF label="Color texto">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
            <PF label="Color fondo">
              <ColorP val={p.bgColor} set={(v) => u("bgColor", v)} />
            </PF>
            <PF label="Forma">
              <SP
                val={p.shape}
                set={(v) => u("shape", v)}
                opts={["pill", "square"]}
              />
            </PF>
          </>
        );
      case "alert":
        return (
          <>
            <PF label="Mensaje">
              <TP val={p.message} set={(v) => u("message", v)} />
            </PF>
            <PF label="Tipo">
              <SP
                val={p.variant}
                set={(v) => u("variant", v)}
                opts={["info", "warning", "error", "success"]}
              />
            </PF>
          </>
        );
      case "divider":
        return (
          <>
            <PF label="Estilo">
              <SP
                val={p.style}
                set={(v) => u("style", v)}
                opts={["solid", "dashed", "dotted"]}
              />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
            <PF label="Grosor">
              <TP
                val={p.thickness}
                set={(v) => u("thickness", Number(v))}
                mono
              />
            </PF>
          </>
        );
      case "spacer":
        return (
          <PF label="Altura (px)">
            <TP val={p.height} set={(v) => u("height", Number(v))} mono />
          </PF>
        );
      case "section":
        return (
          <>
            <PF label="Título">
              <TP val={p.title} set={(v) => u("title", v)} />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
          </>
        );
      case "tabs":
        return (
          <PF label="Pestañas">
            <ListE val={p.tabs} set={(v) => u("tabs", v)} addLabel="Pestaña" />
          </PF>
        );
      case "table":
        return (
          <PF label="Columnas">
            <ListE
              val={p.columns}
              set={(v) => u("columns", v)}
              addLabel="Columna"
            />
          </PF>
        );
      case "button":
      case "submit":
        return (
          <>
            <PF label="Texto">
              <TP val={p.text} set={(v) => u("text", v)} />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
            {p.type === "button" && (
              <PF label="Variante">
                <SP
                  val={p.variant}
                  set={(v) => u("variant", v)}
                  opts={["primary", "outline", "ghost"]}
                />
              </PF>
            )}
            <PF label="Ancho completo">
              <CK
                val={p.fullWidth}
                set={(v) => u("fullWidth", v)}
                label="100%"
              />
            </PF>
          </>
        );
      case "stat_card":
        return (
          <>
            <PF label="Etiqueta">
              <TP val={p.label} set={(v) => u("label", v)} />
            </PF>
            <PF label="Valor">
              <TP val={p.value} set={(v) => u("value", v)} mono />
            </PF>
            <PF label="Tipo cambio">
              <SP
                val={p.changeType}
                set={(v) => u("changeType", v)}
                opts={["positive", "negative", "neutral"]}
              />
            </PF>
          </>
        );
      case "kv_display":
        return (
          <>
            <PF label="Clave">
              <TP val={p.key} set={(v) => u("key", v)} mono />
            </PF>
            <PF label="Valor">
              <TP val={p.value} set={(v) => u("value", v)} />
            </PF>
          </>
        );
      case "chart_bar":
        return (
          <>
            <PF label="Título">
              <TP val={p.title} set={(v) => u("title", v)} />
            </PF>
            <PF label="Labels (,)">
              <TP
                val={(p.labels || []).join(",")}
                set={(v) =>
                  u(
                    "labels",
                    v.split(",").map((s) => s.trim()),
                  )
                }
                mono
              />
            </PF>
            <PF label="Datos (,)">
              <TP
                val={(p.data || []).join(",")}
                set={(v) =>
                  u(
                    "data",
                    v.split(",").map((s) => Number(s.trim())),
                  )
                }
                mono
              />
            </PF>
            <PF label="Color">
              <ColorP val={p.color} set={(v) => u("color", v)} />
            </PF>
          </>
        );
      default:
        return <div className="wp-default">Sin opciones</div>;
    }
  };

  const meta = WIDGET_CATALOG.find((w) => w.type === p.type);
  return (
    <div className="props-panel">
      <div className="props-panel__header">
        <div className="props-panel__icon">{meta?.icon}</div>
        <div className="props-panel__label">{meta?.label}</div>
      </div>
      {fs()}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN BUILDER
// ═══════════════════════════════════════════════════════════════════════════════
function AdminBuilder({ onClose }) {
  const [meta, setMeta] = useState({
    id: `func_${Date.now()}`,
    label: "Nueva funcionalidad",
    icon: "📦",
    color: "#60a5fa",
    category: "operaciones",
    desc: "",
    tags: [],
  });
  const [widgets, setWidgets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wGroup, setWGroup] = useState("all");
  const [wSearch, setWSearch] = useState("");
  const [rightTab, setRightTab] = useState("props");
  const [dragOver, setDragOver] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  const filteredW = WIDGET_CATALOG.filter(
    (w) =>
      (wGroup === "all" || w.group === wGroup) &&
      (!wSearch || w.label.toLowerCase().includes(wSearch.toLowerCase())),
  );

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const type = e.dataTransfer.getData("widget-type");
    if (!type) return;
    const w = defaultProps(type);
    setWidgets((p) => [...p, w]);
    setSelected(w.id);
  }, []);

  const updateW = (updated) =>
    setWidgets((p) => p.map((w) => (w.id === updated.id ? updated : w)));
  const deleteW = (id) => {
    setWidgets((p) => p.filter((w) => w.id !== id));
    if (selected === id) setSelected(null);
  };
  const moveW = (id, dir) =>
    setWidgets((p) => {
      const i = p.findIndex((w) => w.id === id);
      if ((dir === "up" && i === 0) || (dir === "down" && i === p.length - 1))
        return p;
      const n = [...p];
      const s = dir === "up" ? i - 1 : i + 1;
      [n[i], n[s]] = [n[s], n[i]];
      return n;
    });
  const dupW = (id) => {
    const w = widgets.find((x) => x.id === id);
    if (!w) return;
    const c = {
      ...JSON.parse(JSON.stringify(w)),
      id: uid(),
      fieldKey: (w.fieldKey || "field") + "_copy",
    };
    setWidgets((p) => {
      const i = p.findIndex((x) => x.id === id);
      const n = [...p];
      n.splice(i + 1, 0, c);
      return n;
    });
    setSelected(c.id);
  };

  const addTag = (t) => {
    const tag = (t || tagInput).trim().toLowerCase();
    if (!tag || meta.tags.includes(tag)) return;
    setMeta((p) => ({ ...p, tags: [...p.tags, tag] }));
    setTagInput("");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        "https://tworkplate-api.onrender.com/api/funcionalidades",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_usuario: 1,
            json_fun: {
              ...meta,
              content: { widgets },
            },
          }),
        },
      );
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setSavedOk(true);
      setTimeout(() => {
        setSavedOk(false);
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Error al guardar funcionalidad:", err);
      alert("Error al guardar. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const selW = widgets.find((w) => w.id === selected) || null;
  const accent = meta.color || "#60a5fa";

  const [prevOn, setPrevOn] = useState(new Set());
  useEffect(() => {
    setPrevOn(new Set(widgets.map((w) => w.fieldKey || w.id)));
  }, [widgets.length]);

  const saveBtnClass = `builder__save-btn${savedOk ? " builder__save-btn--saved" : saving ? " builder__save-btn--saving" : ""}`;

  return (
    <div className="builder" style={{ "--accent": accent }}>
      {/* Topbar */}
      <div className="builder__topbar">
        <button className="builder__back-btn" onClick={onClose}>
          ← Volver
        </button>
        <div className="builder__func-icon">{meta.icon}</div>
        <input
          className="builder__name-input"
          value={meta.label}
          onChange={(e) => setMeta((p) => ({ ...p, label: e.target.value }))}
        />
        <select
          className="builder__cat-select"
          value={meta.category}
          onChange={(e) => setMeta((p) => ({ ...p, category: e.target.value }))}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 2 }}>
          {[
            "#60a5fa",
            "#4ade80",
            "#f59e0b",
            "#f472b6",
            "#a78bfa",
            "#fb923c",
            "#22d3ee",
            "#7dd3fc",
          ].map((c) => (
            <div
              key={c}
              className={`builder__color-swatch ${meta.color === c ? "active" : ""}`}
              style={{ background: c }}
              onClick={() => setMeta((p) => ({ ...p, color: c }))}
            />
          ))}
        </div>
        <div className="builder__spacer" />
        <span className="builder__widget-count">{widgets.length} widgets</span>
        <button
          className={saveBtnClass}
          onClick={handleSave}
          disabled={saving || !meta.label.trim() || widgets.length === 0}
        >
          {savedOk
            ? "✓ Guardado"
            : saving
              ? "Guardando..."
              : "⬆ Subir funcionalidad"}
        </button>
      </div>

      <div className="builder__body">
        {/* Left palette */}
        <div className="builder__palette">
          <div className="builder__meta">
            <div className="section-label">Metadata</div>

            {/* Icon picker */}
            <div className="section-label section-label--sm">Icono</div>
            <div className="builder__icons-grid">
              {ICONS.map((ic) => (
                <div
                  key={ic}
                  className={`builder__icon-btn ${meta.icon === ic ? "active" : ""}`}
                  onClick={() => setMeta((p) => ({ ...p, icon: ic }))}
                >
                  {ic}
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="section-label section-label--sm">Descripción</div>
            <textarea
              value={meta.desc}
              onChange={(e) => setMeta((p) => ({ ...p, desc: e.target.value }))}
              rows={2}
              placeholder="Para el usuario..."
              className="ctrl builder__desc-area"
              style={{ marginBottom: 8 }}
            />

            {/* Tags */}
            <div className="section-label section-label--sm">
              Etiquetas de búsqueda
            </div>
            <div className="tag-list">
              {meta.tags.map((t) => (
                <span
                  key={t}
                  className="tag-chip"
                  onClick={() =>
                    setMeta((p) => ({
                      ...p,
                      tags: p.tags.filter((x) => x !== t),
                    }))
                  }
                >
                  {t} ✕
                </span>
              ))}
            </div>
            <div className="tag-input-row">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") addTag();
                }}
                placeholder="etiqueta..."
                className="ctrl"
                style={{ flex: 1, fontSize: 9 }}
              />
              <button className="tag-add-btn" onClick={() => addTag()}>
                +
              </button>
            </div>
            <div className="tag-list">
              {TAG_SUGGESTIONS.filter((t) => !meta.tags.includes(t))
                .slice(0, 10)
                .map((t) => (
                  <span
                    key={t}
                    className="tag-suggestion"
                    onClick={() => addTag(t)}
                  >
                    +{t}
                  </span>
                ))}
            </div>
          </div>

          {/* Widget catalog */}
          <div className="builder__catalog-header">
            <div className="section-label">Widgets</div>
            <input
              value={wSearch}
              onChange={(e) => setWSearch(e.target.value)}
              placeholder="Buscar..."
              className="ctrl builder__catalog-search"
              style={{ fontSize: 9 }}
            />
            <div className="builder__group-filters">
              {WIDGET_GROUPS.map((g) => (
                <button
                  key={g.id}
                  className={`group-filter-btn ${wGroup === g.id ? "active" : ""}`}
                  onClick={() => setWGroup(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="builder__catalog-list">
            {filteredW.map((w) => (
              <div
                key={w.type}
                className="catalog-item"
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("widget-type", w.type)
                }
              >
                <span className="catalog-item__icon">{w.icon}</span>
                <div>
                  <div className="catalog-item__name">{w.label}</div>
                  <div className="catalog-item__desc">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center canvas */}
        <div className="builder__canvas-wrap">
          <div
            className={`builder__canvas ${dragOver ? "builder__canvas--dragover" : ""}`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => setSelected(null)}
          >
            {widgets.length === 0 && (
              <div className="builder__canvas-empty">
                <div>
                  <div className="builder__canvas-empty-icon">⬡</div>
                  <div className="builder__canvas-empty-text">
                    Arrastra widgets para construir la funcionalidad
                  </div>
                </div>
              </div>
            )}
            <div className="builder__canvas-inner">
              {widgets.map((w) => {
                const isSel = selected === w.id;
                return (
                  <div
                    key={w.id}
                    className={`canvas-widget ${isSel ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelected(w.id);
                    }}
                  >
                    <div className="canvas-widget__key-badge">{w.fieldKey}</div>
                    <div className="canvas-widget__actions">
                      {[
                        ["↑", "up"],
                        ["↓", "down"],
                      ].map(([t, d]) => (
                        <button
                          key={d}
                          className="canvas-widget__action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            moveW(w.id, d);
                          }}
                        >
                          {t}
                        </button>
                      ))}
                      <button
                        className="canvas-widget__action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          dupW(w.id);
                        }}
                      >
                        ⧉
                      </button>
                      <button
                        className="canvas-widget__action-btn canvas-widget__action-btn--delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteW(w.id);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                    <WPreview w={w} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="builder__right">
          <div className="right-tabs">
            {[
              { id: "props", label: "⚙ Props" },
              { id: "user", label: "👁 Preview" },
              { id: "json", label: "{ } JSON" },
            ].map((t) => (
              <button
                key={t.id}
                className={`right-tab ${rightTab === t.id ? "active" : ""}`}
                onClick={() => setRightTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="right-panel-body">
            {rightTab === "props" && (
              <WidgetPropsPanel widget={selW} onChange={updateW} />
            )}
            {rightTab === "user" && (
              <div className="user-preview">
                <div className="user-preview__hint">
                  Activa/desactiva campos
                </div>
                {widgets.length === 0 ? (
                  <div className="user-preview__empty">Sin widgets aún</div>
                ) : (
                  widgets.map((w) => {
                    const key = w.fieldKey || w.id;
                    const isOn = prevOn.has(key);
                    return (
                      <div
                        key={w.id}
                        className={`preview-toggle-row ${isOn ? "on" : "off"}`}
                        onClick={() =>
                          setPrevOn((p) => {
                            const n = new Set(p);
                            n.has(key) ? n.delete(key) : n.add(key);
                            return n;
                          })
                        }
                      >
                        <div
                          className={`preview-toggle-knob-wrap ${isOn ? "on" : "off"}`}
                        >
                          <div
                            className={`preview-toggle-knob ${isOn ? "on" : "off"}`}
                          />
                        </div>
                        <div className="preview-toggle-row__content">
                          <WPreview w={w} dimmed={!isOn} />
                        </div>
                        {!isOn && (
                          <div className="preview-toggle-row__overlay" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
            {rightTab === "json" && (
              <div className="json-panel">
                <div className="json-block">
                  <div className="json-label">
                    Schema que va a BD (campo content)
                  </div>
                  <pre className="json-pre">
                    {JSON.stringify(
                      {
                        id: meta.id,
                        label: meta.label,
                        icon: meta.icon,
                        color: meta.color,
                        category: meta.category,
                        desc: meta.desc,
                        tags: meta.tags,
                        content: { widgets },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
function UserSide() {
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

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [side, setSide] = useState("user");
  const [showAdminBuilder, setShowAdminBuilder] = useState(false);

  return (
    <div className="app-root">
      {/* Role switcher */}
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
            {_DB_FUNCTIONALITIES.map((f) => (
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
                  {JSON.parse(f.content).widgets?.length || 0} widgets definidos
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
