import { Typewriter } from "@/components/typewriter";

export const Hero = () => {

  const phrases = [
    "Transformamos tus ideas en realidad digital",
    "Desarrollo web y móvil a medida",
    "Soluciones tecnológicas innovadoras",
    "Expertos en experiencia de usuario",
    "Creamos el futuro digital de tu empresa"
  ];

  return (
    <section className="pt-42 pb-30 bg-[#E1EDF0]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0B4059] mb-6">
            Transformamos ideas en soluciones digitales
          </h1>
          <p className="text-xl text-[#0B4059] mb-10 opacity-90">
            Somos JDM, tu equipo de consultoría de software especializado en crear experiencias digitales excepcionales que impulsan tu negocio.
          </p>

          <section className="py-5">
            <div className="container mx-auto px-6 text-center">
              <Typewriter
                phrases={phrases}
                typingSpeed={70}
                deletingSpeed={50}
                pauseTime={1800}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};