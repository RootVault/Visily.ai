import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Settings } from "lucide-react";
import { cn } from '@/lib/utils';
import { generateMermaidDiagram } from '@/utils/api';
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const LLM_PROVIDERS = [
  { label: 'OpenAI (GPT-4o, GPT-3.5, etc.)', value: 'openai' },
  { label: 'Anthropic (Claude)', value: 'anthropic' },
  { label: 'Google Gemini', value: 'gemini' },
];

interface AIPromptProps {
  prompt: string;
  onDiagramGenerated: (diagram: string) => void;
  className?: string;
}

const AIPrompt: React.FC<AIPromptProps> = ({ prompt, onDiagramGenerated, className }) => {
  const [loading, setLoading] = useState(false);
  const [apiKeyPopoverOpen, setApiKeyPopoverOpen] = useState(false);
  const [llmProvider, setLlmProvider] = useState<string>('openai');
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    // Load provider and key from localStorage
    const storedProvider = localStorage.getItem('llm_provider') || 'openai';
    setLlmProvider(storedProvider);
    const storedKey = localStorage.getItem(`${storedProvider}_api_key`) || '';
    setApiKey(storedKey);
  }, []);

  useEffect(() => {
    // When provider changes, load its key
    const storedKey = localStorage.getItem(`${llmProvider}_api_key`) || '';
    setApiKey(storedKey);
  }, [llmProvider]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value;
    setLlmProvider(provider);
    localStorage.setItem('llm_provider', provider);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    localStorage.setItem(`${llmProvider}_api_key`, e.target.value);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of the diagram you want to create",
        variant: "destructive",
      });
      return;
    }
    // Check if API key is set for selected provider
    if (!apiKey) {
      setApiKeyPopoverOpen(true);
      toast({
        title: "API Key Required",
        description: `Please add your ${llmProvider.charAt(0).toUpperCase() + llmProvider.slice(1)} API key first`,
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      // Pass provider and key to the API (update generateMermaidDiagram as needed)
      const diagram = await generateMermaidDiagram(prompt, llmProvider, apiKey);
      onDiagramGenerated(diagram);
      toast({
        title: "Diagram generated",
        description: "Your diagram has been generated successfully",
      });
    } catch (error) {
      console.error('Error generating diagram:', error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate diagram",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <Button 
        onClick={handleGenerate} 
        disabled={loading || !prompt.trim()} 
        className="min-w-32 bg-primary/90 hover:bg-primary transition-all duration-300"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </>
        )}
      </Button>
      <Popover open={apiKeyPopoverOpen} onOpenChange={setApiKeyPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4 space-y-4">
          <div>
            <label htmlFor="llm-provider" className="block text-sm font-medium mb-2">LLM Provider</label>
            <select
              id="llm-provider"
              value={llmProvider}
              onChange={handleProviderChange}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LLM_PROVIDERS.map((provider) => (
                <option key={provider.value} value={provider.value}>{provider.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium mb-2">API Key</label>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              placeholder={`Enter your ${llmProvider.charAt(0).toUpperCase() + llmProvider.slice(1)} API key`}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="default" onClick={() => {
                localStorage.setItem(`${llmProvider}_api_key`, apiKey);
                toast({
                  title: 'API Key Saved',
                  description: `API key for ${llmProvider.charAt(0).toUpperCase() + llmProvider.slice(1)} saved successfully.`,
                });
              }}>Save</Button>
              <Button size="sm" variant="destructive" onClick={() => {
                localStorage.removeItem(`${llmProvider}_api_key`);
                setApiKey('');
                toast({
                  title: 'API Key Deleted',
                  description: `API key for ${llmProvider.charAt(0).toUpperCase() + llmProvider.slice(1)} deleted.`,
                });
              }}>Delete</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Using {LLM_PROVIDERS.find(p => p.value === llmProvider)?.label}
      </p>
    </div>
  );
};

export default AIPrompt;
