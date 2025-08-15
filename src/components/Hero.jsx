import React from "react";
import { ArrowRight, Flame, Lightbulb, Bot, Brain } from "lucide-react";

const Hero = () => {
  const scrollToBlogs = () => {
    const section = document.getElementById("blog-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Contenido principal */}
      <div className="relative z-10 max-w-6xl mx-auto text-center text-white pt-28 md:pt-0">
        {/* Encabezado principal */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight mb-4">
          Descubre el Futuro
        </h1>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#FFEB00] mb-6">
          de la Tecnología e IA
        </h2>

        {/* Subtítulo */}
        <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed text-white/90 mb-10 max-w-3xl mx-auto">
          Artículos seleccionados para inspirarte, educarte y llevarte al siguiente nivel digital. <br />
          Desde avances en inteligencia artificial hasta ideas que transforman el mundo.
        </p>

        {/* Botones CTA */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
          <button
            onClick={scrollToBlogs}
            className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-[#FFEB00] text-[#000957] hover:bg-[#ffe600] transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            <span className="flex items-center gap-2">
              Leer Artículos
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>

          <a
            href="#about"
            className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold rounded-full bg-white bg-opacity-10 border border-white hover:bg-white hover:text-[#000957] transition-all duration-300 transform hover:scale-105 shadow-md text-white"
          >
            <span className="flex items-center gap-2">
              ¿De qué va este blog?
              <Lightbulb className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </span>
          </a>
        </div>

        {/* Beneficios destacados */}
        <div className="flex flex-col sm:flex-row justify-center flex-wrap gap-4 text-white/80 text-base sm:text-lg">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
            <Flame className="h-5 w-5 text-[#FFEB00]" />
            Tendencias tecnológicas
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
            <Lightbulb className="h-5 w-5 text-[#FFEB00]" />
            Ideas que inspiran
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
            <Bot className="h-5 w-5 text-[#FFEB00]" />
            Avances en IA
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full">
            <Brain className="h-5 w-5 text-[#FFEB00]" />
            Tips prácticos y útiles
          </div>
        </div>
      </div>

      {/* Indicador scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
