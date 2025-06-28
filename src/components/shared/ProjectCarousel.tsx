"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ProjectCarouselProps {
  title: string;
  images: CarouselImage[];
  description: string;
  className?: string;
}

export default function ProjectCarousel({ 
  title, 
  images, 
  description, 
  className = "" 
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`project-carousel ${className}`}>
      <div className="project-carousel-content">
        {/* Title */}
        <h3 className="project-carousel-title">{title}</h3>
        
        {/* Carousel Container */}
        <div className="carousel-wrapper">
          {/* Images */}
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ 
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              {images.map((image, index) => (
                <div key={index} className="carousel-slide">
                  <div className="carousel-image-container">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="carousel-image"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  className="carousel-nav carousel-prev"
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
                <button 
                  className="carousel-nav carousel-next"
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
          
          {/* Dots Indicator */}
          {images.length > 1 && (
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Description */}
        <div className="project-carousel-description">
          {description.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}