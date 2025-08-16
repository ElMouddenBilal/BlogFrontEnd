import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import api from "../lib/api";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error("Error al obtener blog:", err);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl font-medium text-[#FFEB00]">Cargando artículo...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-[#FFEB00] text-[#000957] rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen px-2 sm:px-6 lg:px-12 py-20 text-white flex justify-center items-start">
      <div className="max-w-7xl w-full bg-white text-[#000957] rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in">
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 flex items-center gap-2 bg-white text-[#000957] px-3 py-2 rounded-full shadow hover:bg-[#FFEB00] hover:text-[#000957] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-semibold">Volver</span>
        </button>

        {/* Imagen principal */}
        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-64 md:h-96 lg:h-[28rem] xl:h-[32rem] object-cover rounded-t-3xl"
          />
        )}

        {/* Contenido */}
        <div className="p-6 sm:p-10 lg:p-14">
          <span className="inline-block text-xs font-semibold px-4 py-1 rounded-full bg-gradient-to-r from-[#FF8040] to-[#FFB347] text-white mb-4">
            {blog.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-5">{blog.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.date || blog.createdAt)}</span>
          </div>

          <div className="prose prose-lg max-w-none text-gray-800">
            {blog.content.split("\n").map((paragraph, i) => (
              <p key={i} className="whitespace-pre-line mb-5 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
