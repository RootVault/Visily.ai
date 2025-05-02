import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, FileText, Rocket, Zap, Users, Award, Sparkles, Download } from "lucide-react";

const UseCaseShowcase = () => {
  // Define use cases with icons, titles, and descriptions
  const useCases = [
    {
      icon: <Sparkles className="text-blue-500" />,
      title: "Turn text into diagrams with AI",
      description: "Transform your ideas and requirements into professional diagrams instantly using our AI-powered generation"
    },
    {
      icon: <FileText className="text-purple-500" />,
      title: "Documentation Flow",
      description: "Create clear documentation flows and system architecture diagrams for technical teams"
    },
    {
      icon: <Rocket className="text-amber-500" />,
      title: "Project Planning",
      description: "Map out project phases and dependencies for seamless team collaboration"
    },
    {
      icon: <Zap className="text-green-500" />,
      title: "Decision Trees",
      description: "Model complex decision paths and business logic with easy-to-follow diagrams"
    },
    {
      icon: <Database className="text-indigo-500" />,
      title: "Data Relationships",
      description: "Visualize database schemas and entity relationships for better system design"
    },
    {
      icon: <Users className="text-rose-500" />,
      title: "User Journeys",
      description: "Map out user flows and experience journeys for product development"
    },
    {
      icon: <Award className="text-emerald-500" />,
      title: "Process Optimization",
      description: "Identify bottlenecks and optimize workflows with visual process diagrams"
    },
    {
      icon: <Download className="text-cyan-500" />,
      title: "Export",
      description: "Download your diagrams in multiple formats including SVG, PNG, and PDF for any use case"
    }
  ];

  return (
    <section className="w-full py-16 px-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-transparent blur-2xl"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
              Unlimited diagram possibilities
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From simple flowcharts to complex system architectures, Mapi.ai adapts to your visualization needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="glass-panel hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {useCase.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{useCase.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {useCase.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCaseShowcase;
