
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'py-4 backdrop-blur-md bg-white/80 dark:bg-black/80 shadow-sm' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="relative z-10 flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center">
            <span className="text-white dark:text-black font-semibold text-xs">IO</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">IOsense</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            className="font-medium rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            Login
          </Button>
          <Button className="rounded-full font-medium">
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-0 flex flex-col animate-fade-in">
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">
              <MobileNavLinks closeMenu={() => setIsMobileMenuOpen(false)} />
              <div className="flex flex-col w-full space-y-4 pt-8">
                <Button
                  variant="outline"
                  className="w-full rounded-full font-medium"
                >
                  Login
                </Button>
                <Button className="w-full rounded-full font-medium">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link 
        to="/products" 
        className="text-sm font-medium transition hover:text-black/70 dark:hover:text-white/70"
      >
        Products
      </Link>
      <Link 
        to="/technology" 
        className="text-sm font-medium transition hover:text-black/70 dark:hover:text-white/70"
      >
        Technology
      </Link>
      <Link 
        to="/about" 
        className="text-sm font-medium transition hover:text-black/70 dark:hover:text-white/70"
      >
        About
      </Link>
      <Link 
        to="/contact" 
        className="text-sm font-medium transition hover:text-black/70 dark:hover:text-white/70"
      >
        Contact
      </Link>
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link
        to="/products"
        className="text-xl font-medium py-2 w-full text-center"
        onClick={closeMenu}
      >
        Products
      </Link>
      <Link
        to="/technology"
        className="text-xl font-medium py-2 w-full text-center"
        onClick={closeMenu}
      >
        Technology
      </Link>
      <Link
        to="/about"
        className="text-xl font-medium py-2 w-full text-center"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        to="/contact"
        className="text-xl font-medium py-2 w-full text-center"
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  );
};

export default Header;
