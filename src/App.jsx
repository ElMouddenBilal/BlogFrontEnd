import { Routes, Route, useLocation } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './pages/BlogDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEditBlog from './pages/admin/AdminEditBlog';
import AdminBlogList from './pages/admin/AdminBlogList';
import Hero from './components/Hero';
import About from './components/About';
import AppBackground from './components/AppBackground';

// ⬇️ NUEVO
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen w-full relative text-white">
      {/* Fondo global detrás de toda la app */}
      <AppBackground isAdmin={isAdminRoute} />

      {/* Hero y About solo si estamos en / */}
      {!isAdminRoute && location.pathname === '/' && (
        <>
          <Hero />
          <About />
        </>
      )}

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* ⬇️ NUEVO: login de admin */}
        <Route path="/admin/login" element={<Login />} />

        {/* ⬇️ Protegidas: requieren token */}
        <Route path="/admin" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/editar/:id" element={
          <ProtectedRoute><AdminEditBlog /></ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute><AdminBlogList /></ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
