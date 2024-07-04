
// Carousel.js
import React, { useState, useEffect } from 'react';
import one from '../../assets/one.png'
import two from '../../assets/two.png'
import three from '../../assets/three.png'
import back from '../../assets/back.png'
import next from '../../assets/next.png'
import '../css/landpage.css'; // Assuming your CSS is in Navbar.css

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: one },
    { image: two },
    { image: three }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {/* <div className="carousel-controls">
        <img src={back} onClick={prevSlide} className="control-icon" alt="Previous Slide" />
        <img src={next} onClick={nextSlide} className="control-icon" alt="Next Slide" />
      </div> */}
    </div>
  );
};

export default Carousel;
