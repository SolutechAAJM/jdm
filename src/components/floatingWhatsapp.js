"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingWhatsApp = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      setPosition({ 
        x: window.innerWidth - 80,  
        y: window.innerHeight - 80  
      });
    }

    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (event, info) => {
    setIsDragging(true);
    setDragOffset({
      x: info.point.x - position.x,
      y: info.point.y - position.y
    });
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    if (typeof window !== 'undefined') {
      const newX = Math.max(10, Math.min(window.innerWidth - 70, info.point.x - dragOffset.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 70, info.point.y - dragOffset.y));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const openWhatsApp = () => {
    if (isDragging) return;
    
    const phoneNumber = "573001188573";
    const message = "Hola, me gustaría obtener más información sobre sus servicios";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isClient) return null;

  return (
    <motion.div
      className="fixed z-50 cursor-grab active:cursor-grabbing"
      style={{
        x: position.x,
        y: position.y,
      }}
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 10,
        right: window.innerWidth - 70,
        top: 10,
        bottom: window.innerHeight - 70,
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onHoverStart={() => setShowTooltip(true)}
      onHoverEnd={() => setShowTooltip(false)}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white text-green-600 px-4 py-2 rounded-lg shadow-lg border border-green-200 whitespace-nowrap"
          >
            <div className="text-sm font-semibold">¡Contáctanos por WhatsApp!</div>
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center ${
          isDragging ? 'shadow-2xl' : 'shadow-lg'
        }`}
        whileHover={{ backgroundColor: "#22c55e" }}
        whileTap={{ backgroundColor: "#16a34a" }}
        onClick={openWhatsApp}
      >
        <svg 
          width="30" 
          height="30" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default FloatingWhatsApp;