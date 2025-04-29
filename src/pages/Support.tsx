
import React from 'react';
import Header from '@/components/Header';
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);
  
  // Initialize theme on component mount
  React.useEffect(() => {
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
  };

  const faqs = [
    {
      question: "What is Visily.ai?",
      answer: "Visily.ai is an AI-powered diagram creation tool that helps you quickly generate professional diagrams using natural language descriptions."
    },
    {
      question: "Do I need an OpenAI API key to use Visily.ai?",
      answer: "Yes, you need to provide your own OpenAI API key to use the full AI features of Visily.ai. This helps us provide you with high-quality diagram generation while keeping our service sustainable."
    },
    {
      question: "What types of diagrams can I create?",
      answer: "You can create flowcharts, sequence diagrams, class diagrams, entity-relationship diagrams, state diagrams, and more - anything supported by the Mermaid syntax."
    },
    {
      question: "How do I export my diagrams?",
      answer: "You can export your diagrams as SVG files by clicking the Export button in the top navigation bar. The exported files can be used in presentations, documents, websites, and more."
    },
    {
      question: "Is my data private?",
      answer: "We do not store your diagrams or prompts on our servers. All processing happens in your browser and through secure API calls to OpenAI. Your API key is stored only in your browser's local storage."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 animate-fade-in">
      <Header 
        onExport={() => {}} 
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="flex-1 container py-12 flex flex-col gap-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Support Center</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Find answers to common questions and learn how to get the most out of Visily.ai
          </p>
        </div>
        
        <div className="glass-panel p-8 max-w-3xl mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="glass-panel p-8 max-w-3xl mx-auto mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-6">Still Need Help?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            If you couldn't find what you're looking for, feel free to reach out to our support team.
          </p>
          <div className="flex justify-center">
            <a 
              href="/contact" 
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
