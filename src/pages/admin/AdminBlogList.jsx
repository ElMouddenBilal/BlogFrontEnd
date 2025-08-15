import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../lib/api";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error al obtener blogs:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error al eliminar blog:", err);
      alert("No tienes permisos o se produjo un error.");
    }
  };

  return (
    <div className="min-h-screen bg-[#000957] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-3xl font-bold">Panel de Administración</h2>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-red-500/90 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-md transition"
              title="Cerrar sesión"
            >
              ⎋ Cerrar sesión
            </button>
            <Link
              to="/admin/crear"
              className="inline-flex items-center gap-2 bg-[#344CB7] hover:bg-[#577BC1] text-white text-sm font-semibold py-2 px-4 rounded-md transition"
            >
              <span className="text-lg">＋</span> Crear nuevo blog
            </Link>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-100 text-[#000957] uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4 text-left">Título</th>
                <th className="px-6 py-4 text-left">Categoría</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-3">{blog.title}</td>
                  <td className="px-6 py-3">{blog.category}</td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:underline font-medium">
                      Ver
                    </Link>
                    <Link to={`/admin/editar/${blog._id}`} className="text-yellow-600 hover:underline font-medium">
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:underline font-medium">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No hay blogs aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminBlogList;
