import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Settings2 } from "lucide-react";

const Examples = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">How to Use Mapi.ai</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Start Section */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Guide</CardTitle>
              <CardDescription>
                Get started with Mapi.ai in just a few simple steps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">1. Choose Your Method</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Mapi.ai offers two ways to create diagrams:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Manual Mermaid Code Editor - Write your own Mermaid.js code</li>
                  <li>AI-Powered Generation - Describe your diagram in natural language</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">2. Create Your Diagram</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  For manual editing, use the Mermaid.js syntax. Here's a simple example:
                </p>
                <Code className="block p-4 rounded-md bg-slate-100 dark:bg-slate-800">
                  {`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]
    C --> E[Result]
    D --> E`}
                </Code>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">3. Export Your Diagram</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Once you're happy with your diagram, you can export it as a PNG file.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mermaid Syntax Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Mermaid Syntax Guide</CardTitle>
              <CardDescription>
                Learn the basics of Mermaid.js syntax for creating diagrams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Flowcharts</h3>
                <Code className="block p-4 rounded-md bg-slate-100 dark:bg-slate-800">
                  {`graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Alternative Action]`}
                </Code>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Sequence Diagrams</h3>
                <Code className="block p-4 rounded-md bg-slate-100 dark:bg-slate-800">
                  {`sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!`}
                </Code>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Class Diagrams</h3>
                <Code className="block p-4 rounded-md bg-slate-100 dark:bg-slate-800">
                  {`classDiagram
    class Animal {
      +String name
      +int age
      +makeSound()
    }
    class Dog {
      +bark()
    }
    Animal <|-- Dog`}
                </Code>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Generation Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Using Mapi.ai with OpenAI</CardTitle>
              <CardDescription>
                Learn how to use AI to generate diagrams from natural language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">How It Works</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Simply describe your diagram in natural language, and our AI will generate the Mermaid code for you.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Add your OpenAI API key in settings</li>
                  <li>Describe your diagram in the prompt</li>
                  <li>Click generate to create your diagram</li>
                  <li>Edit the generated code if needed</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Example Prompts</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>"Create a flowchart showing the user registration process"</li>
                  <li>"Generate a sequence diagram for a login system"</li>
                  <li>"Make a class diagram for a simple e-commerce system"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Start creating beautiful diagrams today!
            </p>
            <div className="flex justify-center">
              <Link 
                to="/" 
                onClick={() => window.scrollTo(0, 0)}
              >
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Start Creating
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples; 