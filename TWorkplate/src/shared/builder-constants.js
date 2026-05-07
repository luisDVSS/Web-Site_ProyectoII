// ═══════════════════════════════════════════════════════════════════════════════
// BUILDER CONSTANTS — shared between AdminBuilder and UserSide
// ═══════════════════════════════════════════════════════════════════════════════

export const COLORS = [
  "#f8fafc", "#94a3b8", "#60a5fa", "#4ade80", "#f59e0b",
  "#f472b6", "#a78bfa", "#fb923c", "#34d399", "#22d3ee",
  "#f87171", "#e879f9", "#fbbf24", "#2dd4bf", "#7dd3fc",
];

export const ICONS = [
  "📦", "👥", "💰", "📅", "🗄️", "🔑", "🧾", "📊",
  "🏥", "✂️", "🧘", "🛒", "🍽️", "📋", "⚡", "🚚",
  "🔔", "📈", "💳", "🏦", "⚙️", "🎫", "📝", "🎁",
  "🪑", "👤", "🔐", "⏱",
];

export const TAG_SUGGESTIONS = [
  "inventario", "personal", "clientes", "finanzas", "ventas",
  "citas", "reportes", "RRHH", "productos", "servicios",
  "logística", "pagos", "facturación", "médico", "spa",
  "barbería", "restaurante", "renta", "tienda",
];

export const CATEGORIES = [
  "operaciones", "personal", "clientes", "catalogo",
  "finanzas", "logistica", "reportes",
];

export const TABLE_FRIENDLY_TYPES = new Set([
  "text_input", "number_input", "email_input", "date_picker",
  "time_picker", "select", "multiselect", "checkbox",
  "toggle", "textarea", "rating", "slider",
]);

export const WIDGET_CATALOG = [
  { type: "text_input",    group: "inputs",     label: "Text Input",  icon: "▤",  desc: "Texto libre" },
  { type: "number_input",  group: "inputs",     label: "Number",      icon: "##", desc: "Campo numérico" },
  { type: "email_input",   group: "inputs",     label: "Email",       icon: "@",  desc: "Email con validación" },
  { type: "password_input", group: "inputs",    label: "Password",    icon: "••", desc: "Contraseña" },
  { type: "textarea",      group: "inputs",     label: "Textarea",    icon: "≡",  desc: "Texto multilínea" },
  { type: "date_picker",   group: "inputs",     label: "Date Picker", icon: "📅", desc: "Selector de fecha" },
  { type: "time_picker",   group: "inputs",     label: "Time Picker", icon: "🕐", desc: "Selector de hora" },
  { type: "file_upload",   group: "inputs",     label: "File Upload", icon: "⬆",  desc: "Carga de archivos" },
  { type: "color_picker",  group: "inputs",     label: "Color Picker", icon: "🎨", desc: "Selector de color" },
  { type: "select",        group: "selectors",  label: "Dropdown",    icon: "⌄",  desc: "Lista desplegable" },
  { type: "multiselect",   group: "selectors",  label: "Multi Select", icon: "⌄⌄", desc: "Selección múltiple" },
  { type: "radio_group",   group: "selectors",  label: "Radio Group", icon: "◎",  desc: "Opciones excluyentes" },
  { type: "checkbox",      group: "selectors",  label: "Checkbox",    icon: "☑",  desc: "Casilla" },
  { type: "toggle",        group: "selectors",  label: "Toggle",      icon: "⟳",  desc: "On/Off" },
  { type: "checkbox_group", group: "selectors", label: "Checkbox Group", icon: "☑☑", desc: "Varias casillas" },
  { type: "rating",        group: "selectors",  label: "Rating Stars", icon: "★",  desc: "Calificación" },
  { type: "slider",        group: "selectors",  label: "Slider",      icon: "⟺",  desc: "Deslizador" },
  { type: "heading",       group: "display",    label: "Heading",     icon: "H",   desc: "Título" },
  { type: "paragraph",     group: "display",    label: "Paragraph",   icon: "P",   desc: "Texto" },
  { type: "badge",         group: "display",    label: "Badge",       icon: "⬟",  desc: "Etiqueta" },
  { type: "alert",         group: "display",    label: "Alert",       icon: "⚠",  desc: "Alerta" },
  { type: "divider",       group: "display",    label: "Divider",     icon: "─",  desc: "Separador" },
  { type: "spacer",        group: "display",    label: "Spacer",      icon: "↕",  desc: "Espacio" },
  { type: "image",         group: "display",    label: "Image",       icon: "🖼",  desc: "Imagen" },
  { type: "avatar",        group: "display",    label: "Avatar",      icon: "👤",  desc: "Avatar" },
  { type: "progress",      group: "display",    label: "Progress",    icon: "▬",  desc: "Progreso" },
  { type: "card",          group: "layout",     label: "Card",        icon: "▭",  desc: "Tarjeta" },
  { type: "section",       group: "layout",     label: "Section",     icon: "⬜",  desc: "Sección" },
  { type: "tabs",          group: "layout",     label: "Tabs",        icon: "⬚",  desc: "Pestañas" },
  { type: "table",         group: "layout",     label: "Data Table",  icon: "⊟",  desc: "Tabla de datos" },
  { type: "button",        group: "actions",    label: "Button",      icon: "⬛",  desc: "Botón" },
  { type: "submit",        group: "actions",    label: "Submit",      icon: "→",  desc: "Enviar" },
  { type: "link",          group: "actions",    label: "Link",        icon: "🔗",  desc: "Enlace" },
  { type: "stat_card",     group: "data",       label: "Stat Card",   icon: "📊",  desc: "Métrica" },
  { type: "kv_display",    group: "data",       label: "Key-Value",   icon: "⇒",  desc: "Clave-valor" },
  { type: "chart_bar",     group: "data",       label: "Bar Chart",   icon: "📈",  desc: "Gráfica" },
];

export const WIDGET_GROUPS = [
  { id: "all",       label: "Todos" },
  { id: "inputs",    label: "Inputs" },
  { id: "selectors", label: "Selectores" },
  { id: "display",   label: "Display" },
  { id: "layout",    label: "Layout" },
  { id: "actions",   label: "Acciones" },
  { id: "data",      label: "Datos" },
];

let _uid = 1;
export const uid = () => `w_${_uid++}_${Math.random().toString(36).slice(2, 5)}`;
export const modUid = () => `mod_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;

export const defaultProps = (type) => {
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
    select: { options: ["Opción 1", "Opción 2", "Opción 3"], placeholder: "-- Elige --" },
    multiselect: { options: ["Opción A", "Opción B", "Opción C"] },
    radio_group: { options: ["Sí", "No", "No aplica"], layout: "vertical" },
    checkbox: { checked: false },
    toggle: { activeLabel: "Sí", inactiveLabel: "No", defaultValue: false },
    checkbox_group: { options: ["Opción 1", "Opción 2"], layout: "vertical" },
    rating: { max: 5 },
    slider: { min: 0, max: 100, step: 1, showValue: true },
    heading: { text: "Título de sección", level: "h2", color: "#f8fafc", align: "left" },
    paragraph: { text: "Texto descriptivo.", color: "#94a3b8", size: "md", align: "left" },
    badge: { text: "Activo", color: "#4ade80", bgColor: "#14532d", shape: "pill" },
    alert: { message: "Información importante.", variant: "info", dismissible: true },
    divider: { style: "solid", color: "#1e293b", thickness: 1 },
    spacer: { height: 20 },
    image: { src: "", alt: "Imagen", width: "100%", rounded: true },
    avatar: { name: "Usuario", size: "md", showName: true },
    progress: { value: 65, max: 100, color: "#60a5fa", showPercent: true },
    card: { title: "Tarjeta", subtitle: "", padding: "md" },
    section: { title: "Sección", collapsible: false, color: "#60a5fa" },
    tabs: { tabs: ["General", "Detalles"] },
    table: { columns: ["Nombre", "Estado", "Fecha"], showSearch: true, showPagination: true },
    button: { text: "Acción", variant: "primary", color: "#60a5fa", size: "md", fullWidth: false },
    submit: { text: "Guardar", color: "#4ade80", size: "lg", fullWidth: true },
    link: { text: "Ver más", href: "#", color: "#60a5fa", underline: true },
    stat_card: { label: "Métrica", value: "$0", change: "+0%", changeType: "positive", icon: "📊" },
    kv_display: { key: "Campo", value: "Valor", divider: true },
    chart_bar: { title: "Gráfica", labels: ["A", "B", "C"], data: [30, 65, 45], color: "#60a5fa" },
  };
  return { ...base, ...(extras[type] || {}) };
};
