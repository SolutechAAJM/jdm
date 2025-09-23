"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const programmingIcons = [
  "💻", "🚀", "⚡", "🔧", "🛠️", "📱", "🌐", "💾", "📊", "🔍",
  "🎯", "✨", "🔥", "💡", "📈", "🔄", "⚙️", "🔮", "🎨", "📝"
];

const FloatingIcon = ({ icon, index }) => {
  const duration = 15 + Math.random() * 10; 
  const delay = Math.random() * 5; 

  return (
    <motion.div
      className="absolute text-2xl opacity-20 select-none pointer-events-none"
      initial={{
        x: Math.random() * 100 + 'vw',
        y: '-10%',
        scale: 0.5 + Math.random() * 0.5,
        rotate: Math.random() * 360
      }}
      animate={{
        y: '110vh',
        x: Math.random() * 100 - 50 + 'px',
        rotate: Math.random() * 360
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        fontSize: `${1 + Math.random() * 2}rem`,
      }}
    >
      {icon}
    </motion.div>
  );
};

export const BackgroundAnimation = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const initialIcons = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      icon: programmingIcons[Math.floor(Math.random() * programmingIcons.length)]
    }));
    setIcons(initialIcons);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((item) => (
        <FloatingIcon key={item.id} icon={item.icon} index={item.id} />
      ))}
    </div>
  );
};
