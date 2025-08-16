import React from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/BlogForm";

const AdminCreateBlog = () => {
  const navigate = useNavigate();

  const handleCreated = (createdBlog) => {
    // redirige al detalle del blog recién creado
    navigate(`/blog/${createdBlog._id}`);
  };

  return (
    <div className="min-h-screen bg-[#000957] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto bg-white text-[#000957] rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-6">Nuevo Blog</h1>
        <BlogForm onNewBlog={handleCreated} />
      </div>
    </div>
  );
};

export default AdminCreateBlog;
