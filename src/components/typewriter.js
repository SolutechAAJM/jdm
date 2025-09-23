"use client";
import { useState, useEffect } from 'react';

export const Typewriter = ({ phrases, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;

    const currentPhrase = phrases[currentIndex];
    
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && !isPaused) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.substring(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B4059] mb-4">
          {currentText}
          <span className="inline-block w-1 h-8 bg-[#0B4059] ml-1 animate-pulse"></span>
        </h2>
      </div>
    </div>
  );
};
