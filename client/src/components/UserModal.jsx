import { useEffect, useState } from "react";

export default function UserModal({
  show,
  mode = "create",
  initialData = { name: "", email: "", phone: "" },
  onClose,
  onSubmit,
  saving = false,
}) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData);
    setErrors({});
  }, [initialData, show]);

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = "Requerido";
    if (!form.email?.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.phone?.trim()) e.phone = "Requerido";
  else if (!/^[0-9]{10}$/.test(form.phone)) e.phone = "El teléfono debe tener 10 dígitos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      role="dialog" 
      aria-modal="true"
      style={{ zIndex: 1050 }}
    >
      <div className="modal-dialog" style={{ zIndex: 1055 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{mode === "create" ? "Nuevo usuario" : "Editar usuario"}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} 
              aria-label="Close"
              disabled={saving}
            ></button>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={saving}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={saving}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  disabled={saving}
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={onClose} 
                disabled={saving}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={saving}
              >
                {saving ? "Guardando..." : mode === "create" ? "Crear" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1045 }}
        onClick={handleBackdropClick}
      />
    </div>
  );
}