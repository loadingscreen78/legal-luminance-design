
import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop",
    title: "Empowering Legal Minds Since Decades",
    subtitle: "Your trusted partner in legal education and professional development"
  },
  {
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop",
    title: "Explore. Learn. Lead the Law",
    subtitle: "Comprehensive collection of legal books and journals"
  },
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&h=1080&fit=crop",
    title: "Shaping Legal Future of Odisha",
    subtitle: "Premium law books and journals for legal professionals"
  }
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0616]">
      <Navigation />
      
      {/* Hero Slideshow */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0616]/80 via-[#0F0616]/60 to-transparent" />
            
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                    {slide.subtitle}
                  </p>
                  
                  {/* Navigation Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                    <Link to="/journals">
                      <Button className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#f4d03f] text-[#0F0616] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl shadow-[#D4AF37]/20">
                        📘 Our Journals
                      </Button>
                    </Link>
                    <Link to="/books">
                      <Button className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#f4d03f] text-[#0F0616] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl shadow-[#D4AF37]/20">
                        📚 Our Books
                      </Button>
                    </Link>
                    <Link to="/founder">
                      <Button className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#f4d03f] text-[#0F0616] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl shadow-[#D4AF37]/20">
                        🧑‍⚖️ Founder's Message
                      </Button>
                    </Link>
                    <Link to="/shop">
                      <Button className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#f4d03f] text-[#0F0616] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl shadow-[#D4AF37]/20">
                        🛍️ Shop Now
                      </Button>
                    </Link>
                    <Link to="/visit-store">
                      <Button className="w-full h-16 bg-gradient-to-r from-[#D4AF37] to-[#f4d03f] text-[#0F0616] hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl shadow-[#D4AF37]/20">
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
                index === currentSlide ? 'bg-[#D4AF37] scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
