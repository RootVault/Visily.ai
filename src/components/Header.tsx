import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, Moon, Sun, ChevronDown, Github } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onExport: (format: 'svg' | 'png' | 'pdf') => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onExport,
  toggleTheme,
  isDarkMode
}) => {
  return (
    <header className="w-full h-14 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-black/30 backdrop-blur-sm animate-fade-in sticky top-0 z-50">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left section - Logo */}
        <div className="flex items-center space-x-2 w-[150px]">
          <Link to="/" className="h-8 w-8 rounded-lg overflow-hidden">
            <img 
              src="/lovable-uploads/df225085-55f9-4137-bb6a-199243daaf3c.png" 
              alt="Mapi.ai Logo" 
              className="h-full w-full object-contain"
            />
          </Link>
          <Link to="/" className="focus:outline-none">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:underline transition-all">Mapi.ai</h1>
          </Link>
        </div>
        
        {/* Center section - Navigation */}
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center justify-center space-x-4">
            <Link to="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <img src="/Images/Nav/Home.png" alt="Home" className="w-5 h-5" />
              Home
            </Link>
            <Link to="/examples" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <img src="/Images/Nav/Examples.png" alt="Examples" className="w-5 h-5" />
              Examples
            </Link>
            <Link to="/support" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <img src="/Images/Nav/Support.png" alt="Support" className="w-5 h-5" />
              Support
            </Link>
            <Link to="/contact" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
              <img src="/Images/Nav/Contact.png" alt="Contact" className="w-5 h-5" />
              Contact
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
                  <img src="/Images/Nav/Legal.png" alt="Legal" className="w-5 h-5" />
                  Legal
                  <ChevronDown size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link to="/terms" className="cursor-pointer">
                    Terms of Service
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy" className="cursor-pointer">
                    Privacy Policy
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        
        {/* Right section - Actions */}
        <div className="flex items-center space-x-2 w-[180px] justify-end">
          <Button variant="outline" size="sm" className="glass-button" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <a href="https://github.com/usemapi/Mapi.ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <Github size={20} className="text-slate-700 dark:text-white" />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass-button">
                <Download size={16} className="mr-2" />
                Export
                <ChevronDown size={16} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onExport('svg')}>
                SVG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('png')}>
                PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport('pdf')}>
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="default" 
            size="sm" 
            className="glass-button bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            onClick={() => {
              const editorSection = document.querySelector('.glass-panel');
              editorSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
