
export const Footer = () => {
  return (
    <footer className="bg-[#0B4059] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">JDM</div>
            <p className="opacity-80">Consultoría de software de alto nivel</p>
            <a href="tel:+573001188573" className="text-white text-sm opacity-80 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.3c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.4-.5-3.6 0-.5-.5-1-1-1H4c-1.1 0-2 .9-2 2 0 9.4 7.6 17 17 17 1.1 0 2-.9 2-2v-3.5c0-.5-.5-1-1-1z" />
              </svg>
              Contactar
            </a>
            <p className="pt-2 text-white text-sm opacity-80 flex items-center gap-2">Si no funciona el botón de arriba, puedes lmarcar desde tu teléfono móvil. +57 300 1188573</p>
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