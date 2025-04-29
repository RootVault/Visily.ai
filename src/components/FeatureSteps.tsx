
import React from 'react';
import { Circle, Square, ArrowRight } from 'lucide-react';

const FeatureSteps = () => {
  const features = [
    {
      icon: <Circle className="h-8 w-8 text-blue-500" />,
      title: "Describe Your Vision",
      description: "Use natural language to tell Visily what kind of diagram you need."
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
        How Visily.ai Works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-panel p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
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
      </div>
      
      <div className="hidden md:flex justify-center mt-6 relative">
        <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      </div>
    </div>
  );
};

export default FeatureSteps;
