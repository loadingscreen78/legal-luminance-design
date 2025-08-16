
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatedLogo } from './AnimatedLogo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, User, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
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
                        : 'text-foreground hover:text-[#3454D1] hover:bg-[#3454D1]/10'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Button>
                </Link>
              ))}
              
              {/* Auth Section */}
              {!loading && (
                <div className="flex items-center space-x-3">
                  {user ? (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-lg">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {user.email?.split('@')[0] || 'User'}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Button>
                    </Link>
                  )}
                </div>
              )}
              
              <ThemeToggle />
              <CartDrawer />
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <CartDrawer />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-border">
              <div className="flex flex-col space-y-2 mt-4">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive(item.path) 
                          ? 'bg-[#3454D1] text-white' 
                          : 'text-foreground hover:text-[#3454D1] hover:bg-[#3454D1]/10'
                      }`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
                
                {/* Mobile Auth Section */}
                {!loading && (
                  <div className="pt-3 border-t border-border mt-3">
                    {user ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {user.email?.split('@')[0] || 'User'}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={() => {
                            handleSignOut();
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
