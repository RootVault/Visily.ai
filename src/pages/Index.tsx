
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import AIPrompt from '@/components/AIPrompt';
import FeatureSteps from '@/components/FeatureSteps';
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button"; // Added this import
import { saveAs } from 'file-saver';

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
      let filename = 'visily-diagram.svg';
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
      
      <main className="flex-1 container py-6 flex flex-col gap-6">
        <div className="text-center py-8 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Create Beautiful Diagrams with AI
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6 animate-slide-in">
            Transform your ideas into professional diagrams instantly with the power of AI
          </p>
        </div>
        
        <FeatureSteps />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-4">
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
        
        <div className="glass-panel p-6 text-center mt-8 animate-slide-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-medium mb-2">Ready to visualize your ideas?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Start creating professional diagrams in seconds with Visily.ai
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            Get Started Now
          </Button>
        </div>
      </main>
      
      <footer className="py-8 px-6 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-black/30 backdrop-blur-sm mt-12">
        <div className="container max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/df225085-55f9-4137-bb6a-199243daaf3c.png" 
                alt="Visily.ai Logo" 
                className="h-8 w-8"
              />
              <span className="text-lg font-medium">Visily.ai</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Home</a>
              <a href="/support" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Support</a>
              <a href="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
          
          <div className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            <p>© 2025 Visily.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
