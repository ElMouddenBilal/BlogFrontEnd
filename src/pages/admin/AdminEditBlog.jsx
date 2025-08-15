import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../lib/api";
import BlogForm from "../../components/BlogForm";

const AdminEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/blogs/${id}`);
        setInitialData(data);
      } catch (err) {
        console.error("Error al cargar blog:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const handleUpdated = () => {
    navigate("/admin");
  };

  if (loading) return <p className="p-6">Cargando blog...</p>;
  if (!initialData) return <p className="p-6">No se encontró el blog.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar Blog</h1>
      <BlogForm initialData={initialData} onUpdated={handleUpdated} />
    </div>
  );
};

export default AdminEditBlog;
