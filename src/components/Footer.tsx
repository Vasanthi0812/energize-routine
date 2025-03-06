
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-[#1B5E20]/10">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="flex items-center justify-center text-[#1B5E20]/80 gap-1 mb-2 text-sm md:text-base animate-fade-in">
            Designed with <Heart className="h-4 w-4 text-[#C62828] animate-pulse" /> by
            <span className="font-semibold text-[#1B5E20]">S. Meghana Vasanthi</span>
          </p>
          <p className="text-[#1B5E20]/60 text-xs">
            © {new Date().getFullYear()} Fitness Flow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
