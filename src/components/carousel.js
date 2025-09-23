"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const Carousel = ({
  items,
  renderItem,
  onClickItem,
  title,
  description,
  itemsPerPageConfig = { mobile: 1, tablet: 2, desktop: 4 },
  backgroundColor = "bg-white",
  id
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerPageConfig.desktop);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [direction, setDirection] = useState(0); 

  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerPageConfig.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerPageConfig.tablet);
      } else {
        setItemsToShow(itemsPerPageConfig.desktop);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);

    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [itemsPerPageConfig]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= items.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, items.length - itemsToShow) : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index * itemsToShow);
  };

  const getVisibleItems = () => {
    let visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);

    if (visibleItems.length < itemsToShow) {
      visibleItems = [...visibleItems, ...items.slice(0, itemsToShow - visibleItems.length)];
    }

    return visibleItems;
  };

  const itemVariants = {
    enter: (direction) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.5
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 200, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.5,
      transition: {
        y: { type: "spring", stiffness: 200, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setCurrentX(clientX);
    setSlideOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);

    const offset = startX - clientX;
    setSlideOffset(offset);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const dragDistance = startX - currentX;
    const minSwipeDistance = 50;

    if (Math.abs(dragDistance) > minSwipeDistance) {
      if (dragDistance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    } else {
      setDirection(0);
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
    setSlideOffset(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setSlideOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setCurrentX(e.clientX);

    const offset = startX - e.clientX;
    setSlideOffset(offset);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const visibleItems = getVisibleItems();

  return (
    <section id={id} className={`py-20 ${backgroundColor} relative`}>
      <div className="container mx-auto px-6">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && <h2 className="text-4xl font-bold text-[#0B4059] mb-4">{title}</h2>}
            {description && <p className="text-xl text-[#0B4059] max-w-2xl mx-auto opacity-80">{description}</p>}
          </div>
        )}

        {items.length > itemsToShow && (
          <>
            <div className="flex justify-center mb-8">
              <button
                onClick={prevSlide}
                className="bg-[#0B4059] text-white p-3 rounded-full mr-4 hover:bg-[#4BC1F2] transition"
                aria-label="Elementos anteriores"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={nextSlide}
                className="bg-[#0B4059] text-white p-3 rounded-full hover:bg-[#4BC1F2] transition"
                aria-label="Siguientes elementos"
              >
                <ChevronRightIcon />
              </button>
            </div>

            <div className="flex justify-center mb-8">
              {Array.from({ length: Math.ceil(items.length / itemsToShow) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 mx-1 rounded-full transition-all ${
                    currentIndex >= index * itemsToShow && currentIndex < (index + 1) * itemsToShow
                      ? 'bg-[#0B4059] w-8'
                      : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`Ir al grupo ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div
          ref={carouselRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsToShow} gap-8 select-none relative`}>
            <AnimatePresence mode="wait" custom={direction}>
              {visibleItems.map((item, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  custom={direction}
                  variants={itemVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onClick={onClickItem ? () => onClickItem(item) : undefined}
                  className={onClickItem ? "cursor-pointer" : ""}
                  onDragStart={handleDragStart}
                >
                  {renderItem(item)}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {items.length > itemsToShow && (
          <div className="mt-8 text-center">
            <p className="text-sm text-[#0B4059] opacity-70">
              Desliza hacia los lados para ver más
            </p>
          </div>
        )}
      </div>
    </section>
  );
};