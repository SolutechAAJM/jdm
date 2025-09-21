export const Hero = () => {
  return (
    <section className="pt-32 pb-20 bg-[#E1EDF0]">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0B4059] mb-6">
            Transformamos ideas en soluciones digitales
          </h1>
          <p className="text-xl text-[#0B4059] mb-10 opacity-90">
            Somos JDM, tu equipo de consultoría de software especializado en crear experiencias digitales excepcionales que impulsan tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#0B4059] text-white px-8 py-4 rounded-full hover:bg-[#4BC1F2] transition font-medium">
              Consultoría gratuita
            </button>
            <button className="border border-[#0B4059] text-[#0B4059] px-8 py-4 rounded-full hover:bg-[#0B4059] hover:text-white transition font-medium">
              Ver proyectos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};