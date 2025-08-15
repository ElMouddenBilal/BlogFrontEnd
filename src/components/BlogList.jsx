import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Error cargando blogs:", err));
  }, []);

  return (
    <section
      id="blog-section"
      className="px-4 sm:px-6 lg:px-8 py-20"
    >
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Artículos Recientes
        </h2>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          Descubre ideas, guías y reflexiones sobre tecnología, IA y desarrollo.
        </p>
      </div>

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
    </section>
  );
};

export default BlogList;
