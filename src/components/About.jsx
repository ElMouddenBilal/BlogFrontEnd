import { Cpu, Brain, Code2, Lightbulb } from "lucide-react";

export default function About() {
  const valores = [
    {
      icon: Cpu,
      title: "Tecnología",
      description:
        "Exploramos cómo la tecnología transforma nuestro día a día, desde innovaciones en software hasta dispositivos del futuro.",
    },
    {
      icon: Brain,
      title: "Inteligencia Artificial",
      description:
        "Analizamos el impacto real de la IA: automatización, algoritmos, ética y su influencia en salud, trabajo y creatividad.",
    },
    {
      icon: Code2,
      title: "Programación",
      description:
        "Compartimos recursos, buenas prácticas y guías amigables para programadores web, desarrolladores full-stack y entusiastas del código.",
    },
    {
      icon: Lightbulb,
      title: "Tendencias",
      description:
        "Descubre lo próximo: blockchain, Web3, metaverso, realidad aumentada y automatización explicados de forma clara.",
    },
  ];

  // Imagen desde Unsplash (libre para uso comercial)
  const ilustracionIA =
    "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section
      id="about"
      className="py-24 px-6 text-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Encabezado llamativo */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
            ¿De qué va este blog?
          </h2>
          <div className="w-24 h-1 mx-auto mb-6 bg-[#FFEB00] rounded-full"></div>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Este blog es tu guía para entender el presente y prepararte para el futuro: tecnología,
            inteligencia artificial, programación y tendencias explicadas de forma clara y útil.
          </p>
        </div>

        {/* Imagen ilustrativa + texto descriptivo */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src={ilustracionIA}
              alt="Ilustración de tecnología e IA"
              className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="space-y-6 text-white/90">
            <p className="text-lg leading-relaxed">
              Vivimos una era de avances vertiginosos: la inteligencia artificial ya no es el futuro, es el presente.
            </p>
            <p className="text-lg leading-relaxed">
              Desde ChatGPT hasta automatización doméstica, desde programación web hasta IA aplicada, este blog es tu espacio para descubrir, aprender y crecer digitalmente.
            </p>
            <p className="text-lg leading-relaxed">
              Todo explicado para principiantes o profesionales: sin jerga innecesaria, solo ideas útiles y aplicables.
            </p>
          </div>
        </div>

        {/* Cuatro valores del blog */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {valores.map((valor, index) => {
            const Icon = valor.icon;
            return (
              <div
                key={index}
                className="group bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-3xl text-center transform hover:scale-105 transition-all duration-300 border border-white/20 shadow-lg"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFEB00] mb-4 mx-auto">
                  <Icon className="h-8 w-8 text-[#000957]" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{valor.title}</h4>
                <p className="text-white/80 text-base leading-relaxed">
                  {valor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
