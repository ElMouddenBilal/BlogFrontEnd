// src/components/BlogList.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

const MAX_RETRIES = 5;
const TRANSIENT_STATUSES = [502, 503, 504];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // { status?, message? }
  const [retryCount, setRetryCount] = useState(0);
  const retryTimerRef = useRef(null);

  const clearRetryTimer = () => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  };

  const loadBlogs = async (attempt = 0) => {
    try {
      // Solo ponemos loading “duro” en el primer intento para no parpadear la UI
      if (attempt === 0) setLoading(true);
      const res = await api.get("/blogs");
      setBlogs(Array.isArray(res.data) ? res.data : []);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      const status = err?.response?.status;
      // Reintento exponencial si el backend está despertando
      if (TRANSIENT_STATUSES.includes(status) && attempt < MAX_RETRIES) {
        const nextAttempt = attempt + 1;
        const delay = Math.min(1000 * 2 ** attempt, 8000); // 1s,2s,4s,8s,8s…
        setRetryCount(nextAttempt);
        setError({
          status,
          message:
            "Inicializando servidor… puede tardar unos segundos la primera vez.",
        });
        clearRetryTimer();
        retryTimerRef.current = setTimeout(() => loadBlogs(nextAttempt), delay);
        return;
      }
      // Error definitivo
      setError({
        status,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Error cargando artículos",
      });
    } finally {
      if (attempt === 0) setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs(0);
    return () => clearRetryTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRetryNow = () => {
    clearRetryTimer();
    loadBlogs(0);
  };

  return (
    <section id="blog-section" className="px-4 sm:px-6 lg:px-8 py-20">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Artículos Recientes
        </h2>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          Descubre ideas, guías y reflexiones sobre tecnología, IA y desarrollo.
        </p>
      </div>

      {/* Estados: loading / error */}
      {loading && blogs.length === 0 && (
        <div className="max-w-7xl mx-auto text-center text-white/80">
          <div className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-4 py-3">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4A4 4 0 0 0 8 12H4z" />
            </svg>
            <span>Cargando artículos…</span>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mb-8 text-center">
          {TRANSIENT_STATUSES.includes(error.status) ? (
            <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-4">
              <p className="text-yellow-200 text-sm">
                {error.message} (Intento {retryCount}/{MAX_RETRIES})
              </p>
              <button
                onClick={handleRetryNow}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-black text-sm font-semibold hover:bg-yellow-300 transition"
              >
                Reintentar ahora
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4">
              <p className="text-red-200 text-sm">
                {error.message || "Error cargando artículos."}
              </p>
              <button
                onClick={handleRetryNow}
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-white text-sm font-semibold hover:bg-white/30 transition"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Lista de blogs */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group border border-white/10">
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#002060] group-hover:text-[#C19E4B] transition-colors duration-300 mb-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {blog.summary}
                </p>

                <div className="mt-auto">
                  <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-[#FF8040]/10 text-[#FF8040]">
                    {blog.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Vacío sin errores */}
      {!loading && !error && blogs.length === 0 && (
        <div className="max-w-7xl mx-auto mt-8 text-center text-white/70">
          No hay artículos aún.
        </div>
      )}
    </section>
  );
};

export default BlogList;
