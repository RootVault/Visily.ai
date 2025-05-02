import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Terms = () => {
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
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Terms of Service</h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Last updated: March 2024
          </p>
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <Card>
            <CardHeader>
              <CardTitle>Terms of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  By accessing and using Mapi.ai, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">2. Use License</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Permission is granted to temporarily use Mapi.ai for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Mapi.ai</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">3. API Usage</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  When using Mapi.ai with OpenAI or other AI providers:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
                  <li>You are responsible for your own API keys and usage</li>
                  <li>You must comply with the terms of service of the respective AI providers</li>
                  <li>We do not store your API keys on our servers</li>
                  <li>You are responsible for any costs associated with API usage</li>
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">4. Disclaimer</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  The materials on Mapi.ai are provided on an 'as is' basis. Mapi.ai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">5. Limitations</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  In no event shall Mapi.ai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Mapi.ai, even if Mapi.ai or a Mapi.ai authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">6. Revisions and Errata</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  The materials appearing on Mapi.ai could include technical, typographical, or photographic errors. Mapi.ai does not warrant that any of the materials on its website are accurate, complete or current. Mapi.ai may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>
              <section>
                <h2 className="font-semibold text-lg mb-2">7. Contact Information</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  If you have any questions about these Terms of Service, please contact us at usemapi.ai@gmail.com
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Terms; 