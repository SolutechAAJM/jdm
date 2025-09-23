import { useRouter } from "next/navigation";

export const Projects = () => {

  const router = useRouter();

  const projects = [
    {
      title: "Plataforma E-commerce",
      description: "Desarrollo de una plataforma de comercio electrónico con integración de pagos y gestión de inventario.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Premium Academy",
      description: "Se desarrolló plataforma web de cursos online para la gestión, creación y publicación de cursos online. Software a la medida con integraciones de pagos, suscripciones, transmisiones en vivo desde el aplicativo, calendario de eventos, tracker de visitas y comentarios, IA integrada para la personalizacion del contenido y la optimizacion de la experiencia del usuario.",
      image: "/files/photos/premium_academy.png",
      route: "https://premiumacademy.pro/"
    },
    {
      title: "Adopta tu mascota",
      description: "Sistema web para la gestion y adopción de mascotas. Creacion y gestion de centros de adopción, mascotas, cuidados de mascotas y mascotas de la comunidad.",
      image: "files/photos/adoption_pets.png",
      route: "https://petsaa.netlify.app/"
    }
  ];

  const navigateTo = (project) => {
    window.open(project.route, "_blank");
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0B4059] mb-4">Proyectos destacados</h2>
          <p className="text-xl text-[#0B4059] max-w-2xl mx-auto opacity-80">
            Algunos de los trabajos que hemos realizado para nuestros clientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-[#E1EDF0] rounded-2xl overflow-hidden hover:shadow-lg transition" onClick={() => project.route ? navigateTo(project) : null}>
              <div className="h-60 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#0B4059] mb-2">{project.title}</h3>
                <p className="text-[#0B4059] opacity-80">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};