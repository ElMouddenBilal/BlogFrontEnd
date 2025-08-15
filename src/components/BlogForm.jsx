import React, { useState, useEffect } from "react";
import api from "../lib/api"; // cliente axios con token

const BlogForm = ({ onNewBlog, onUpdated, initialData }) => {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Si hay datos iniciales (modo edición), rellenar el formulario
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        summary: initialData.summary || "",
        content: initialData.content || "",
        imageUrl: initialData.imageUrl || "",
        category: initialData.category || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.summary || !form.content) {
      setErr("Completa los campos obligatorios (título, resumen y contenido).");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      let res;
      if (initialData) {
        // Editar blog existente
        res = await api.put(`/blogs/${initialData._id}`, form);
        onUpdated?.(res.data);
      } else {
        // Crear blog nuevo
        res = await api.post("/blogs", form);
        onNewBlog?.(res.data);
        setForm({
          title: "",
          summary: "",
          content: "",
          imageUrl: "",
          category: "",
        });
      }
    } catch (error) {
      console.error("Error al guardar el blog:", error);
      if (error?.response?.status === 401) {
        setErr("No autorizado. Inicia sesión en /admin/login e inténtalo de nuevo.");
      } else {
        setErr("Hubo un error al guardar el blog.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
      {err && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
          {err}
        </div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#344CB7] 
                     text-gray-900 placeholder-gray-400 caret-[#344CB7]"
          placeholder="Ej. El futuro de la IA"
        />
      </div>

      {/* Resumen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Resumen *</label>
        <textarea
          name="summary"
          value={form.summary}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-none 
                     focus:outline-none focus:ring-2 focus:ring-[#344CB7] 
                     text-gray-900 placeholder-gray-400 caret-[#344CB7]"
          placeholder="Resumen breve del artículo..."
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contenido *</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm resize-y 
                     focus:outline-none focus:ring-2 focus:ring-[#344CB7] 
                     text-gray-900 placeholder-gray-400 caret-[#344CB7]"
          placeholder="Contenido completo del blog..."
        />
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (URL)</label>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#344CB7] 
                     text-gray-900 placeholder-gray-400 caret-[#344CB7]"
          placeholder="https://..."
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-[#344CB7] 
                     text-gray-900 placeholder-gray-400 caret-[#344CB7]"
          placeholder="Ej. Programación, IA, Tecnología..."
        />
      </div>

      {/* Botón */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#344CB7] hover:bg-[#577BC1] disabled:opacity-70 
                     text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          {loading ? (initialData ? "Guardando..." : "Creando...") : (initialData ? "Guardar cambios" : "Publicar blog")}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
