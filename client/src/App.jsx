import { useEffect, useMemo, useState } from "react";
import { UsersAPI } from "./api/users";
import UserModal from "./components/UserModal";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selected, setSelected] = useState(null); // usuario para editar
  const [saving, setSaving] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
const totalPages = useMemo(() => Math.max(1, Math.ceil(users.length / pageSize)), [users, pageSize]);
  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return users.slice(start, start + pageSize);
  }, [users, page, pageSize]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await UsersAPI.list();
      setUsers(Array.isArray(data) ? data : data?.content || []); // por si tu API regresa {content: [...]} estilo Spring Data
      setPage(1);
    } catch (e) {
      setError(e.message || "Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreate = () => {
    setModalMode("create");
    setSelected({ name: "", email: "", phone: "" });
    setShowModal(true);
  };

  const openEdit = (u) => {
    setModalMode("edit");
    setSelected({ id: u.id, name: u.name, email: u.email, phone: u.phone });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (form) => {
    try {
      setSaving(true);
      if (modalMode === "create") {
        await UsersAPI.create(form);
        alert("Usuario creado con éxito");
      } else {
        await UsersAPI.update(selected.id, form);
        alert("Usuario actualizado con éxito");
      }
      await loadUsers();
      setShowModal(false);
    } catch (e) {
      alert(e.message || "Ocurrió un error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (u) => {
    if (!confirm(`¿Eliminar a ${u.name}?`)) return;
    try {
      await UsersAPI.remove(u.id);
      await loadUsers();
      alert("Usuario eliminado con éxito");
    } catch (e) {
      alert(e.message || "No se pudo eliminar");
    }
  };

  return (
    
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">Usuarios</h3>
        <button className="btn btn-primary" onClick={openCreate}>
          + Nuevo
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="d-flex gap-2 align-items-center mb-3">
            <label className="form-label m-0">Filas por página:</label>
            <select
              className="form-select w-auto"
              value={pageSize}
              onChange={(e) => setPageSize(parseInt(e.target.value) || 5)}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <button className="btn btn-outline-secondary ms-auto" onClick={loadUsers} disabled={loading}>
              {loading ? "Actualizando..." : "Refrescar"}
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th style={{ width: "15%" }} className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagedUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4">{loading ? "Cargando..." : "Sin datos"}</td>
                  </tr>
                )}
                {pagedUsers.map((u, idx) => (
                  <tr key={u.id ?? `${u.email}-${idx}`}>
                    <td>{(page - 1) * pageSize + idx + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.phone}</td>
                    <td className="text-end">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => openEdit(u)}>
                          Editar
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(u)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div>
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </div>
            <div className="btn-group">
              <button className="btn btn-outline-secondary" onClick={() => setPage(1)} disabled={page === 1}>
                « Primero
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                ‹ Anterior
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Siguiente ›
              </button>
              <button className="btn btn-outline-secondary" onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                Último »
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserModal
        show={showModal}
        mode={modalMode}
        initialData={selected || { name: "", email: "", phone: "" }}
        onClose={closeModal}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </div>
  )
}

export default App
