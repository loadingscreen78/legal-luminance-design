
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/contexts/CartContext';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/journals', label: '📘 Our Journals' },
    { path: '/books', label: '📚 Our Books' },
    { path: '/founder', label: '🧑‍⚖️ Founder\'s Message' },
    { path: '/shop', label: '🛍️ Shop Now' },
    { path: '/visit-store', label: '📍 Visit Store' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0F0616]/95 backdrop-blur-md shadow-2xl shadow-[#D4AF37]/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="hover:scale-105 transition-transform">
              <AnimatedLogo />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                      isActive(item.path) 
                        ? 'bg-[#D4AF37] text-[#0F0616] font-semibold' 
                        : 'text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                  </Button>
                </Link>
              ))}
              
              <CartDrawer />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <CartDrawer />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#D4AF37]"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-[#D4AF37]/20">
              <div className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.path) 
                          ? 'bg-[#D4AF37] text-[#0F0616]' 
                          : 'text-white hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
