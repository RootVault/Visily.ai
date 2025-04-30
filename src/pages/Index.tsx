import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import AIPrompt from '@/components/AIPrompt';
import FeatureSteps from '@/components/FeatureSteps';
import UseCaseShowcase from '@/components/UseCaseShowcase';
import AlertBanner from "@/components/AlertBanner";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { saveAs } from 'file-saver';
import { Github } from "lucide-react";
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Code } from "@/components/ui/code";

const DEFAULT_DIAGRAM = `graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]
    C --> E[Result]
    D --> E`;

const Index = () => {
  const [code, setCode] = useState<string>(DEFAULT_DIAGRAM);
  const [prompt, setPrompt] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Re-render the diagram with the new theme
    // This forces the Mermaid renderer to use the new theme
    const currentCode = code;
    setCode('');
    setTimeout(() => setCode(currentCode), 10);
  };

  const handleExport = () => {
    try {
      const svgElement = document.querySelector('.diagram-container svg');
      if (!svgElement) {
        toast({
          title: "Export failed",
          description: "No diagram to export",
          variant: "destructive",
        });
        return;
      }
      
      // Get SVG content
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
      
      // Generate filename from first line of diagram or use default
      let filename = 'Mapi-diagram.svg';
      const firstLine = code.split('\n')[0];
      if (firstLine) {
        const cleanName = firstLine
          .replace(/[^\w\s]/gi, '')
          .trim()
          .replace(/\s+/g, '-')
          .toLowerCase();
        if (cleanName) {
          filename = `${cleanName}.svg`;
        }
      }
      
      saveAs(svgBlob, filename);
      
      toast({
        title: "Export successful",
        description: `Saved as ${filename}`,
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export failed",
        description: "Failed to export diagram",
        variant: "destructive",
      });
    }
  };

  const handleDiagramGenerated = (generatedCode: string) => {
    setCode(generatedCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 animate-fade-in">
      <Header 
        onExport={handleExport} 
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="flex-1 flex flex-col gap-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/20" />
          
          <div className="max-w-7xl mx-auto relative">
            {/* Main Hero Content */}
            <div className="text-center space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-2 font-jakarta">
                <span className="block">Transform Text to Mermaid</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Flowcharts with AI
                </span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-inter px-4">
                Generate beautiful Mermaid.js visualizations instantly using AI. Perfect for developers, architects, and teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px] h-12 text-lg w-full sm:w-auto"
                  onClick={() => {
                    const editorSection = document.querySelector('.glass-panel');
                    editorSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start for free
                </Button>
                <Link 
                  to="/examples" 
                  className="w-full sm:w-auto"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] h-12 text-lg w-full"
                  >
                    View Examples
                  </Button>
                </Link>
              </div>

              {/* Feature Checkmarks */}
              <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-3 text-sm md:text-base text-slate-600 dark:text-slate-400 mt-6 sm:mt-8 px-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  No design skills needed
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  AI-powered generation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Export in multiple formats
                </div>
              </div>

              {/* Alert Banner */}
              <div className="mt-6 sm:mt-8 px-4">
                <AlertBanner />
              </div>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="container px-4 sm:px-6 mt-4">
          <div className="border-2 border-[#86efac] rounded-xl p-4 sm:p-6 md:p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-panel p-4 flex flex-col animate-slide-in">
                <Editor 
                  value={code} 
                  onChange={setCode} 
                  className="flex-1"
                  promptValue={prompt}
                  onPromptChange={setPrompt}
                />
                <Separator className="my-4" />
                <AIPrompt 
                  prompt={prompt} 
                  onDiagramGenerated={handleDiagramGenerated} 
                />
              </div>
              
              <div className="glass-panel p-4 flex flex-col animate-slide-in" style={{ animationDelay: '100ms' }}>
                <Preview code={code} className="flex-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the sections */}
        <FeatureSteps />
        <UseCaseShowcase />

        {/* How Mapi.ai Works Section */}
        <div className="container px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
            What users love about Mapi.ai
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Smart AI Generation</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Transform your ideas into diagrams instantly with our AI-powered generation. No technical expertise needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Lightning Fast</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Create and edit diagrams in seconds. Real-time preview helps you visualize changes instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold">Easy Export</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Download your diagrams in PNG format with one click. Perfect for presentations and documentation.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="container px-4 sm:px-6 py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
            Start Creating for Free
          </h2>
          <div className="max-w-xs mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Free Plan</h3>
                <div className="text-2xl sm:text-3xl font-bold mb-2">$0</div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Everything you need to create beautiful diagrams
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Unlimited diagram creation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Export to SVG format</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Real-time preview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>AI-powered generation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Dark mode support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Community support</span>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2"
                  size="default"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-12 sm:py-16 px-4 sm:px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-black/30 backdrop-blur-sm mt-12">
        <div className="max-w-6xl mx-auto">
          {/* Logo and Built with love */}
          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <img 
              src="/lovable-uploads/df225085-55f9-4137-bb6a-199243daaf3c.png" 
              alt="Mapi.ai Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 mb-4"
            />
            <div className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Built with <span className="text-red-500">❤</span> love.
            </div>
          </div>

          {/* Footer Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Product Column */}
            <div className="w-full">
              <h3 className="font-semibold mb-2 sm:mb-3">Product</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <Link to="/pricing" className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/examples" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>

            {/* Documentation Column */}
            <div className="w-full">
              <h3 className="font-semibold mb-2 sm:mb-3">Documentation</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a 
                    href="https://mermaid.js.org/syntax/flowchart.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Mermaid Syntax
                  </a>
                </li>
                <li>
                  <a 
                    href="https://mermaid.js.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Mermaid.js
                  </a>
                </li>
                <li>
                  <a 
                    href="https://platform.openai.com/docs/api-reference" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    OpenAI API Key
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="w-full">
              <h3 className="font-semibold mb-2 sm:mb-3">Resources</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <Link 
                    to="/support" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contact" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="w-full">
              <h3 className="font-semibold mb-2 sm:mb-3">Legal</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <Link 
                    to="/terms" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/privacy" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                      });
                    }}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div className="w-full">
              <h3 className="font-semibold mb-2 sm:mb-3">Connect</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li>
                  <a 
                    href="https://www.linkedin.com/company/mapi-ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/usemapi/Mapi.ai" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Open Source
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:usemapi.ai@gmail.com" 
                    className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    usemapi.ai@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4 sm:mb-0">
              © 2025 Mapi.ai, all rights reserved
            </div>
            
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/usemapi/Mapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mapi-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
