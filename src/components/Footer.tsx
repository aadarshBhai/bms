
import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white py-6">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg font-poppins">Event Dekho</span>
          </div>
          <div className="flex items-center">
            <Mail size={18} className="mr-2" />
            <a href="mailto:contact@eventdekho.com" className="hover:text-brand-lightpurple transition-colors">
              contact@eventdekho.com
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-blue-800 pt-6 text-center text-sm opacity-80">
          &copy; {new Date().getFullYear()} Event Dekho. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
