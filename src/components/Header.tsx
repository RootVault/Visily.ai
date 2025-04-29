
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Moon, Sun, HelpCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onExport: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onExport,
  toggleTheme,
  isDarkMode
}) => {
  return (
    <header className="w-full py-4 px-6 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm bg-white/50 dark:bg-black/30 animate-fade-in sticky top-0 z-50">
      <div className="container max-w-full flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/df225085-55f9-4137-bb6a-199243daaf3c.png" 
              alt="Mapi.ai Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Mapi.ai</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link to="/support" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <HelpCircle size={16} />
            Support
          </Link>
          <Link to="/contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <Mail size={16} />
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="glass-button" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="outline" size="sm" className="glass-button" onClick={onExport}>
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm" className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white hidden md:flex">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
