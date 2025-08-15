// frontend/src/pages/admin/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem("token", data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Decoración de fondo (no interfiere con tu AppBackground) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-30"
             style={{background: "radial-gradient(#344CB7, transparent 60%)"}} />
        <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full blur-3xl opacity-30"
             style={{background: "radial-gradient(#577BC1, transparent 60%)"}} />
      </div>

      <div className="w-full max-w-md">
        {/* Tarjeta glass */}
        <div className="relative rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
          {/* Borde/halo superior */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#344CB7]/40 via-[#577BC1]/30 to-transparent -z-10" />
          
          <div className="p-8">
            {/* Logo/Título */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-3 h-12 w-12 rounded-xl grid place-items-center bg-gradient-to-br from-[#344CB7] to-[#577BC1] shadow-lg">
                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white">
                  <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5Zm0 7L2 4v13l10 5 10-5V4l-10 5Z"/>
                </svg>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">Panel de Administración</h1>
              <p className="mt-1 text-sm text-white/70">Inicia sesión para gestionar tus blogs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Usuario */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/80">Usuario</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="h-5 w-5 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"/>
                    </svg>
                  </span>
                  <input
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-10 py-3 text-white placeholder-white/50 outline-none focus:border-[#FFEB00]/60 focus:ring-2 focus:ring-[#FFEB00]/20 transition"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/80">Contraseña</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <svg className="h-5 w-5 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 8V7a5 5 0 1 0-10 0v1H5v14h14V8h-2Zm-8 0V7a3 3 0 1 1 6 0v1H9Z"/>
                    </svg>
                  </span>
                  <input
                    type={showPass ? "text" : "password"}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-10 py-3 text-white placeholder-white/50 outline-none focus:border-[#FFEB00]/60 focus:ring-2 focus:ring-[#FFEB00]/20 transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10 transition"
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPass ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              {/* Acciones */}
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 select-none">
                  <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-transparent text-[#FFEB00] focus:ring-[#FFEB00]/30" />
                  <span className="text-white/80">Recordarme</span>
                </label>
                <span className="text-white/60">Demo: <code className="text-white/90">admin / admin123</code></span>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#344CB7] via-[#577BC1] to-[#344CB7] px-4 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl disabled:opacity-70"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading && (
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4A4 4 0 0 0 8 12H4z"/>
                    </svg>
                  )}
                  {loading ? "Entrando..." : "Entrar"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition group-hover:translate-x-0" />
              </button>
            </form>
          </div>
        </div>

        {/* Pie con copy/sugerencia */}
        <p className="mt-4 text-center text-xs text-white/60">
          Acceso restringido. Si no tienes permisos, contacta con el administrador.
        </p>
      </div>
    </div>
  );
}
