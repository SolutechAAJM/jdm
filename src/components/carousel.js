"use client";
import { useState, useEffect } from 'react';

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
    setCurrentIndex((prevIndex) => 
      prevIndex + itemsToShow >= items.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, items.length - itemsToShow) : prevIndex - 1
    );
  };

  const getVisibleItems = () => {
    let visibleItems = items.slice(currentIndex, currentIndex + itemsToShow);
    
    if (visibleItems.length < itemsToShow) {
      visibleItems = [...visibleItems, ...items.slice(0, itemsToShow - visibleItems.length)];
    }
    
    return visibleItems;
  };

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
                  onClick={() => setCurrentIndex(index * itemsToShow)}
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

        <div className="overflow-hidden">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsToShow} gap-8`}>
            {getVisibleItems().map((item, index) => (
              <div 
                key={`${currentIndex}-${index}`} 
                onClick={onClickItem ? () => onClickItem(item) : undefined} 
                className={onClickItem ? "cursor-pointer" : ""}
              >
                {renderItem(item)}
              </div>
            ))}
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