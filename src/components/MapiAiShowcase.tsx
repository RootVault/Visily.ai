import React from 'react';

const diagramTypes = [
  'Flowchart',
  'Sequence Diagram',
  'Class Diagram',
  'State Diagram',
  'Entity Relationship Diagram',
  'User Journey',
  'Gantt Chart',
  'Pie Chart',
  'Requirement Diagram',
  'Gitgraph Diagram',
  'Mindmap',
  'Timeline',
  'Quadrant Chart',
  'Zenuml Diagram',
];

export default function MapiAiShowcase() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto my-12 px-4">
      {/* Left: Image */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <img
          src="/Images/flow-illustrations.png"
          alt="Mapi.ai Flow Illustration"
          className="w-96 md:w-[500px] drop-shadow-2xl"
        />
      </div>
      {/* Center: Arrow Image */}
      <div className="hidden md:flex flex-col items-center justify-center h-full">
        <img
          src="/Images/arrow.png"
          alt="Arrow"
          className="w-32 md:w-40 lg:w-48 h-auto object-contain"
          style={{ minWidth: '100px' }}
        />
      </div>
      {/* Right: Single Card with Supported Diagram Types */}
      <div className="flex flex-col w-full md:w-[400px]">
        <div className="glass-panel p-8 rounded-xl shadow-lg border border-slate-200/70 bg-white/80">
          <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Supported Diagram Types
          </h4>
          <ul className="space-y-2">
            {diagramTypes.map((type) => (
              <li key={type} className="flex items-center gap-2 text-slate-700 text-base">
                <img src="/Images/checkmark.png" alt="Checkmark" className="w-5 h-5 flex-shrink-0" />
                <span>{type}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 