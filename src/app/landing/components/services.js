import { Carousel } from '@/components/carousel';

export const Services = () => {
  const services = [
    {
      title: "Páginas web & SPAs",
      description: "Sitios web modernos y aplicaciones de una sola página con diseño responsive, optimización SEO y tecnologías de vanguardia como React y Next.js",
      icon: "🌐"
    },
    {
      title: "Desarrollo a medida",
      description: "Creamos aplicaciones web y móviles escalables y de alto rendimiento adaptadas a las necesidades específicas de tu negocio.",
      icon: "💻"
    },
    {
      title: "Consultoría tecnológica",
      description: "Te ayudamos a tomar las mejores decisiones tecnológicas para optimizar tus procesos y maximizar tu ROI.",
      icon: "📊"
    },
    {
      title: "Inteligencia Artificial y Machine Learning",
      description: "Soluciones de IA avanzadas incluyendo chatbots inteligentes, análisis predictivo, automatización y procesamiento de lenguaje natural",
      icon: "🤖"
    },
    {
      title: "DevOps & Cloud",
      description: "Desplegamos tu producto en la nube para que sea accesible desde cualquier lugar y automatizamos tus procesos de desarrollo y despliegue con herramientas de DevOps.",
      icon: "☁️"
    }
  ];

  const renderServiceItem = (service) => (
    <div className="bg-[#E1EDF0] p-8 rounded-2xl hover:shadow-lg transition transform hover:-translate-y-1 h-full">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-xl font-semibold text-[#0B4059] mb-3">{service.title}</h3>
      <p className="text-[#0B4059] opacity-80">{service.description}</p>
    </div>
  );

  return (
    <Carousel
      id="services"
      items={services}
      renderItem={renderServiceItem}
      title="Nuestros servicios"
      description="Ofrecemos soluciones integrales para llevar tu negocio al siguiente nivel digital."
      itemsPerPageConfig={{ mobile: 1, tablet: 2, desktop: 4 }}
      backgroundColor="bg-white"
    />
  );
};