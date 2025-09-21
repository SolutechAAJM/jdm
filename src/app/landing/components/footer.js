
export const Footer = () => {
  return (
    <footer className="bg-[#0B4059] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">JDM</div>
            <p className="opacity-80">Consultoría de software de alto nivel</p>
          </div>
          
          <div className="flex space-x-6">
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} JDM Consultoría. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};