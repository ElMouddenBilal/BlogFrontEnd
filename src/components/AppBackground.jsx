// src/components/AppBackground.jsx
export default function AppBackground({ isAdmin }) {
  if (isAdmin) {
    // Fondo simple para /admin (como tenías)
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ background: "#000957" }}
      />
    );
  }

  // Fondo global para el sitio público (continuo sin cortes)
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        background:
          "linear-gradient(135deg, #000957 0%, #1a1a80 50%, #344CB7 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Círculos decorativos globales (sutiles, no interfieren con contenidos) */}
      <div className="pointer-events-none absolute top-12 left-12 w-24 h-24 rounded-full border border-white/20 opacity-30 hidden md:block" />
      <div className="pointer-events-none absolute bottom-20 right-16 w-20 h-20 rounded-full border border-white/10 opacity-20 hidden md:block" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-14 h-14 rounded-full border border-white/30 opacity-30 hidden lg:block" />
    </div>
  );
}
