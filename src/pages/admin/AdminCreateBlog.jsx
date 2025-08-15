import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 👈 AÑADE ESTO

const BlogForm = () => {
  const navigate = useNavigate(); // 👈 PARA REDIRIGIR DESPUÉS
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.summary || !form.content) {
      alert("Por favor, rellena todos los campos obligatorios.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/blogs", form);
      const createdBlog = res.data;

      // 👇 REDIRECCIÓN AUTOMÁTICA
      navigate(`/blog/${createdBlog._id}`);
    } catch (err) {
      console.error("Error al crear el blog:", err);
      alert("Error al crear el blog. Revisa los datos o el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow rounded mb-8">
      <h2 className="text-2xl font-bold mb-4">Nuevo Blog</h2>

      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      />

      <input
        type="text"
        name="summary"
        placeholder="Resumen"
        value={form.summary}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      />

      <textarea
        name="content"
        placeholder="Contenido del blog"
        value={form.content}
        onChange={handleChange}
        rows={5}
        className="w-full border rounded p-2 mb-3"
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="URL de la imagen"
        value={form.imageUrl}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      />

      <input
        type="text"
        name="category"
        placeholder="Categoría"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded p-2 mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear Blog
      </button>
    </form>
  );
};

export default BlogForm;
