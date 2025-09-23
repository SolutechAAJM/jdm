
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const router = useRouter();

    return (
        <header className="bg-white shadow-sm fixed w-full z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center" onClick={() => router.push('/')}>
                        <img src="/files/photos/logo_type.jpeg" alt="logo" className="h-10 rounded-full" />
                        <div className="pl-2 text-2xl font-bold text-[#0B4059]">JDM</div>
                    </div>

                    <nav className="hidden md:flex space-x-10">
                        <a href="#services" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Servicios</a>
                        <a href="#team" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Equipo</a>
                        <a href="#projects" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Proyectos</a>
                        <a href="#contact" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Contacto</a>
                    </nav>

                    <button className="hidden md:block bg-[#0B4059] text-white px-6 py-2 rounded-full hover:bg-[#4BC1F2] transition">
                        <a href='#contact'>Iniciar proyecto</a>
                    </button>

                    <button className="md:hidden text-[#0B4059]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <div className="flex flex-col space-y-3">
                            <a href="#services" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Servicios</a>
                            <a href="#team" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Equipo</a>
                            <a href="#projects" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Proyectos</a>
                            <a href="#contact" className="text-[#0B4059] hover:text-[#4BC1F2] transition">Contacto</a>
                            <button className="bg-[#0B4059] text-white px-6 py-2 rounded-full hover:bg-[#4BC1F2] transition w-full mt-2">
                               <a href='#contact'>Iniciar proyecto</a>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};