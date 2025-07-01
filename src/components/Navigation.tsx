
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
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
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
                        ? 'bg-[#3454D1] text-white font-semibold' 
                        : `${isScrolled ? 'text-[#222222]' : 'text-white'} hover:text-[#3454D1] hover:bg-[#3454D1]/10`
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
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
                className={`${isScrolled ? 'text-[#222222]' : 'text-white'}`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.path) 
                          ? 'bg-[#3454D1] text-white' 
                          : 'text-[#222222] hover:text-[#3454D1] hover:bg-[#3454D1]/10'
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
