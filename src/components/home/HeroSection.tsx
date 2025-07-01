
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    image: "/lovable-uploads/d90dde4b-fcdf-452e-9612-348fa7878292.png",
    title: "Empowering Legal Minds Since Decades",
    subtitle: "Your trusted partner in legal publishing, journals, and law books."
  },
  {
    image: "/lovable-uploads/20716325-0e93-4a46-bfec-60bd22b17411.png",
    title: "Premium Legal Publications",
    subtitle: "Quality content for legal professionals across India"
  },
  {
    image: "/lovable-uploads/ea49d3b2-43d9-4804-a469-5140b187a2cd.png",
    title: "Trusted by Legal Professionals",
    subtitle: "Excellence in legal education and professional development"
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center animate-ken-burns"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                  {slide.subtitle}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link to="/books">
                    <Button className="h-14 px-8 bg-[#F9A826] hover:bg-[#F9A826]/90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      📚 Our Books
                    </Button>
                  </Link>
                  <Link to="/visit-store">
                    <Button className="h-14 px-8 bg-[#3454D1] hover:bg-[#3454D1]/90 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      📍 Visit Store
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-[#F9A826] scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
