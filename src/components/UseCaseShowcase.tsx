
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, FileText, Rocket, Zap, Users, Award } from "lucide-react";

const UseCaseShowcase = () => {
  // Define use cases with icons, titles, and descriptions
  const useCases = [
    {
      icon: <FileText className="text-blue-500" />,
      title: "Documentation Flow",
      description: "Create clear documentation flows and system architecture diagrams for technical teams"
    },
    {
      icon: <Rocket className="text-purple-500" />,
      title: "Project Planning",
      description: "Map out project phases and dependencies for seamless team collaboration"
    },
    {
      icon: <Zap className="text-amber-500" />,
      title: "Decision Trees",
      description: "Model complex decision paths and business logic with easy-to-follow diagrams"
    },
    {
      icon: <Database className="text-green-500" />,
      title: "Data Relationships",
      description: "Visualize database schemas and entity relationships for better system design"
    },
    {
      icon: <Users className="text-indigo-500" />,
      title: "User Journeys",
      description: "Map out user flows and experience journeys for product development"
    },
    {
      icon: <Award className="text-rose-500" />,
      title: "Process Optimization",
      description: "Identify bottlenecks and optimize workflows with visual process diagrams"
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

        <div className="relative">
          {/* Left side content */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/5 mb-8 md:mb-0 animate-slide-in">
              <div className="glass-panel p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-2xl font-semibold mb-4">Turn text into diagrams with AI</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Use Mapi.ai's powerful AI to transform your ideas, requirements, and processes into professional diagrams with just a few clicks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 p-1 mr-3 mt-0.5">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Natural language processing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 p-1 mr-3 mt-0.5">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Automatic layout organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 p-1 mr-3 mt-0.5">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>Smart relationship detection</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right side use cases */}
            <div className="md:w-3/5 md:pl-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300 animate-slide-in" style={{animationDelay: `${index * 100}ms`}}>
                    <CardContent className="p-6">
                      <div className="rounded-full w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        {useCase.icon}
                      </div>
                      <h3 className="font-medium text-lg mb-2">{useCase.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{useCase.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseShowcase;
