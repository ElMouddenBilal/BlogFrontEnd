import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import BlogForm from "../../components/BlogForm";

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error al obtener blogs:", err);
    }
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error al eliminar blog:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/editar/${id}`);
  };

  // ⬇️ NUEVO: cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#000957] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#FFEB00]">
            Panel de Administración
          </h1>

          <div className="flex items-center gap-3">
            {/* ⬇️ Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg font-semibold shadow-lg transition"
              title="Cerrar sesión"
            >
              Cerrar sesión
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#344CB7] hover:bg-[#577BC1] text-white px-5 py-3 rounded-lg font-semibold shadow-lg transition"
            >
              ➕ Crear nuevo blog
            </button>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white text-black rounded-2xl shadow-2xl p-8 w-full max-w-xl relative">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-3xl font-bold"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-[#000957] mb-6 border-b pb-3">
                Nuevo Blog
              </h2>
              <BlogForm onNewBlog={handleBlogCreated} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <table className="w-full table-auto text-sm text-gray-800">
            <thead className="bg-[#E9E9E9] text-[#000957] uppercase text-xs font-bold tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Título</th>
                <th className="px-6 py-4 text-left">Categoría</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4 font-medium text-[#344CB7]">{blog.category}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <a
                      href={`/blog/${blog._id}`}
                      className="inline-block px-3 py-1 bg-[#344CB7] text-white text-xs rounded-full hover:bg-[#577BC1] transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs rounded-full hover:bg-yellow-500 transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="inline-block px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {blogs.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
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

export default AdminDashboard;
