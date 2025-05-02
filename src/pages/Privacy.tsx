import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 animate-fade-in">
      <Header 
        onExport={() => {}} 
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      
      <main className="flex-1 container py-12 flex flex-col gap-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Privacy Policy</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Last updated: March 2024
          </p>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="font-semibold text-lg mb-2">1. Information We Collect</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Mapi.ai is committed to protecting your privacy. We collect minimal information necessary to provide our services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>API keys (stored locally in your browser)</li>
                  <li>Usage data (diagrams and prompts, processed in your browser)</li>
                  <li>Basic analytics (page views, feature usage)</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">2. How We Use Your Information</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  The information we collect is used to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Provide and improve our services</li>
                  <li>Process your diagram generation requests</li>
                  <li>Analyze and enhance user experience</li>
                  <li>Communicate with you about our services</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">3. Data Storage and Security</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We take data security seriously:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Your diagrams and prompts are processed in your browser</li>
                  <li>API keys are stored only in your browser's local storage</li>
                  <li>We do not store your data on our servers</li>
                  <li>All API communications are encrypted</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">4. Third-Party Services</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We use the following third-party services:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>OpenAI API for diagram generation</li>
                  <li>Google Analytics for usage statistics</li>
                  <li>Cloudflare for security and performance</li>
                </ul>
                <p className="text-slate-600 dark:text-slate-400 mt-4">
                  These services have their own privacy policies and terms of service.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">5. Your Rights</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Access your personal data</li>
                  <li>Delete your data from your browser</li>
                  <li>Opt-out of analytics</li>
                  <li>Request information about how your data is used</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">6. Changes to This Policy</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">7. Contact Us</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about this Privacy Policy, please contact us at usemapi.ai@gmail.com
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Privacy; 