import AdminBuilder, {
  WPreview, WidgetPropsPanel,
} from "../../shared/builder-components";
import {
  CATEGORIES, TABLE_FRIENDLY_TYPES,
  uid, modUid, defaultProps,
  WIDGET_CATALOG,
} from "../../shared/builder-constants";

// ═══════════════════════════════════════════════════════════════════════════════
// SIMULATED API (shared - replace with real fetch() calls)
// ═══════════════════════════════════════════════════════════════════════════════

export let BD_DATA_FETCH = [
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
        { id: "e1", type: "heading", fieldKey: "titulo", label: "Empleados", text: "Datos del Empleado", level: "h2", color: "#60a5fa", align: "left", visible: true, required: false },
        { id: "e2", type: "text_input", fieldKey: "nombre", label: "Nombre", placeholder: "Nombre(s)", visible: true, required: true },
        { id: "e3", type: "text_input", fieldKey: "apellido", label: "Apellido", placeholder: "Apellido(s)", visible: true, required: true },
        { id: "e4", type: "select", fieldKey: "rol", label: "Rol", options: ["Empleado", "Supervisor", "Gerente", "Admin", "Otro"], placeholder: "-- Seleccionar --", visible: true, required: true },
        { id: "e5", type: "email_input", fieldKey: "email", label: "Correo electrónico", placeholder: "correo@empresa.com", visible: true, required: false },
        { id: "e6", type: "text_input", fieldKey: "telefono", label: "Teléfono", placeholder: "(000) 000-0000", visible: true, required: false },
        { id: "e7", type: "date_picker", fieldKey: "ingreso", label: "Fecha de ingreso", visible: true, required: false },
        { id: "e8", type: "number_input", fieldKey: "salario", label: "Salario base", placeholder: "0.00", min: "0", step: 100, visible: true, required: false },
        { id: "e9", type: "toggle", fieldKey: "activo", label: "Empleado activo", activeLabel: "Activo", inactiveLabel: "Inactivo", defaultValue: true, visible: true, required: false },
        { id: "e10", type: "submit", fieldKey: "guardar", label: "Guardar", text: "Registrar empleado", color: "#60a5fa", size: "lg", fullWidth: true, visible: true, required: false },
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
    tags: ["citas", "agenda", "reservas", "clientes", "spa", "barbería", "consultorio"],
    content: JSON.stringify({
      widgets: [
        { id: "c1", type: "heading", fieldKey: "titulo", label: "Citas", text: "Nueva Cita", level: "h2", color: "#a78bfa", align: "left", visible: true, required: false },
        { id: "c2", type: "text_input", fieldKey: "cliente", label: "Cliente", placeholder: "Nombre del cliente", visible: true, required: true },
        { id: "c3", type: "text_input", fieldKey: "profesional", label: "Profesional", placeholder: "Asignado a...", visible: true, required: true },
        { id: "c4", type: "select", fieldKey: "servicio", label: "Servicio", options: ["Consulta", "Corte", "Masaje", "Revisión", "Otro"], placeholder: "-- Tipo --", visible: true, required: true },
        { id: "c5", type: "date_picker", fieldKey: "fecha", label: "Fecha", visible: true, required: true },
        { id: "c6", type: "time_picker", fieldKey: "hora", label: "Hora", format: "12h", visible: true, required: true },
        { id: "c7", type: "select", fieldKey: "estado", label: "Estado", options: ["Pendiente", "Confirmada", "Cancelada", "Completada"], placeholder: "-- Estado --", visible: true, required: false },
        { id: "c8", type: "textarea", fieldKey: "notas", label: "Notas", placeholder: "Observaciones...", rows: 2, visible: true, required: false },
        { id: "c9", type: "submit", fieldKey: "guardar", label: "Guardar", text: "Agendar cita", color: "#a78bfa", size: "lg", fullWidth: true, visible: true, required: false },
      ],
    }),
  },
];

const API_URL = "https://tworkplate-api.onrender.com/api/funcionalidades";

export const API = {
  getFunctionalities: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return data;
  },
  saveFunctionality: async (payload) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: 1, json_fun: payload }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  },
  getUserModules: async () => {
    return _DB_USER_MODULES.map((m) => ({ ...m }));
  },
  saveUserModule: async (payload) => {
    const existing = _DB_USER_MODULES.findIndex((m) => m.id === payload.id);
    if (existing >= 0) _DB_USER_MODULES[existing] = payload;
    else _DB_USER_MODULES.push(payload);
    return { ok: true, id: payload.id };
  },
  deleteUserModule: async (id) => {
    _DB_USER_MODULES = _DB_USER_MODULES.filter((m) => m.id !== id);
    return { ok: true };
  },
};

export let _DB_USER_MODULES = [];

// Re-export AdminBuilder as default (same component used by Dashboard)
export default AdminBuilder;

// Re-export shared utilities for any consumers
export {
  WPreview, WidgetPropsPanel,
  CATEGORIES, TABLE_FRIENDLY_TYPES,
  uid, modUid, defaultProps,
  WIDGET_CATALOG,
};
