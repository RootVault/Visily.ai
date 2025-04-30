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
import { Github, Linkedin } from "lucide-react";
import { Link } from 'react-router-dom';

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
        <div className="relative overflow-hidden py-20 px-6">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-blue-900/20" />
          
          <div className="max-w-7xl mx-auto relative">
            {/* Main Hero Content */}
            <div className="text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] pb-2 font-jakarta">
                <span className="block">Transform Text to Mermaid</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Flowcharts with AI
                </span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 font-inter">
                Generate beautiful Mermaid.js visualizations instantly using AI. Perfect for developers, architects, and teams.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px] h-12 text-lg"
                  onClick={() => {
                    const editorSection = document.querySelector('.glass-panel');
                    editorSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start for free
                </Button>
                <Link to="/examples">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="min-w-[200px] h-12 text-lg"
                  >
                    View Examples
                  </Button>
                </Link>
              </div>

              {/* Feature Checkmarks */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm md:text-base text-slate-600 dark:text-slate-400 mt-8">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  No design skills needed
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  AI-powered generation
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Export in multiple formats
                </div>
              </div>

              {/* Alert Banner */}
              <div className="mt-8">
                <AlertBanner />
              </div>
            </div>
          </div>
        </div>

        {/* Editor Section */}
        <div className="container px-6 mt-4">
          <div className="border-2 border-[#86efac] rounded-xl p-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="container px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What users love about Mapi.ai
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Smart AI Generation</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Transform your ideas into diagrams instantly with our AI-powered generation. No technical expertise needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Lightning Fast</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Create and edit diagrams in seconds. Real-time preview helps you visualize changes instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold">Easy Export</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Download your diagrams in PNG format with one click. Perfect for presentations and documentation.
              </p>
            </div>
          </div>
        </div>
        
        {/* Final CTA Section */}
        <div className="container px-6">
          <div className="glass-panel p-8 text-center mt-8 animate-slide-in rounded-2xl" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your ideas into diagrams?</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Join thousands of users who are already creating beautiful diagrams with AI
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white min-w-[200px] h-12 text-lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="py-8 px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-black/30 backdrop-blur-sm mt-12">
        <div className="container max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/df225085-55f9-4137-bb6a-199243daaf3c.png" 
                alt="Mapi.ai Logo" 
                className="h-8 w-8"
              />
              <span className="text-lg font-medium">Mapi.ai</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Home</a>
              <a href="/support" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Support</a>
              <a href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col items-center">
            <div className="flex h-5 items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
              <a
                href="https://github.com/usemapi/Mapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github size={20} />
              </a>
              <Separator orientation="vertical" className="h-4" />
              <a
                href="https://www.linkedin.com/company/mapi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <Separator className="my-4 w-[60%]" />
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p>© 2025 Mapi.ai. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
