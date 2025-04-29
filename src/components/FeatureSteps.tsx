
import React from 'react';
import { Circle, Square, ArrowRight } from 'lucide-react';

const FeatureSteps = () => {
  const features = [
    {
      icon: <Circle className="h-8 w-8 text-blue-500" />,
      title: "Describe Your Vision",
      description: "Use natural language to tell Mapi what kind of diagram you need."
    },
    {
      icon: <Square className="h-8 w-8 text-purple-500" />,
      title: "AI Generates Diagram",
      description: "Our AI instantly converts your description into beautiful mermaid syntax."
    },
    {
      icon: <ArrowRight className="h-8 w-8 text-pink-500" />,
      title: "Customize & Export",
      description: "Fine-tune your diagram and export it in SVG format for your projects."
    }
  ];

  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-center text-2xl font-semibold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        How Mapi.ai Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-panel p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative z-10"
          >
            <div className="mb-4 p-3 rounded-full bg-slate-100 dark:bg-slate-800">
              {feature.icon}
            </div>
            <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
        
        {/* Better connecting line with dots at connection points */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2">
          <div className="relative w-full h-full">
            <div className="absolute top-0 left-[16.67%] right-[16.67%] h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70"></div>
            {/* Connection dots */}
            <div className="absolute top-1/2 left-[16.67%] w-3 h-3 rounded-full bg-blue-500 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-purple-500 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 right-[16.67%] w-3 h-3 rounded-full bg-pink-500 translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSteps;
