
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container-custom flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-blue font-poppins">Event Dekho</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-base font-medium hover:text-brand-purple transition-colors">
            Home
          </Link>
          <Link to="/events" className="text-base font-medium hover:text-brand-purple transition-colors">
            Events
          </Link>
          <Link to="/contact" className="text-base font-medium hover:text-brand-purple transition-colors">
            Contact Us
          </Link>
          <Button variant="outline" className="ml-2">
            <Link to="/login">Login</Link>
          </Button>
          <Button className="bg-brand-blue hover:bg-brand-purple transition-colors">
            <Link to="/signup">Register</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 shadow-md bg-white">
          <nav className="flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-base font-medium py-2 hover:text-brand-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className="text-base font-medium py-2 hover:text-brand-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/contact" 
              className="text-base font-medium py-2 hover:text-brand-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="flex flex-col space-y-3 pt-3 border-t">
              <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Link to="/login" className="w-full">Login</Link>
              </Button>
              <Button className="w-full bg-brand-blue hover:bg-brand-purple transition-colors" onClick={() => setIsMenuOpen(false)}>
                <Link to="/signup" className="w-full">Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
