/**
 * API utility for generating Mermaid diagrams using GPT-4o-mini
 */

const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// Check if we should use the mock API or the real one
// Using mock when no API key is available
const shouldUseMock = () => {
  return !localStorage.getItem('openai_api_key');
};

export const generateMermaidDiagram = async (prompt: string, provider: string = 'openai', apiKey?: string): Promise<string> => {
  if (shouldUseMock()) {
    // For demo purposes, simulate API call with a delay
    console.log('Using MOCK generation with prompt:', prompt);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a sample diagram based on the prompt
    if (prompt.toLowerCase().includes('flowchart')) {
      return `flowchart TD
    A[Start] --> B{Is it raining?}
    B -->|Yes| C[Take umbrella]
    B -->|No| D[Enjoy the sun]
    C --> E[Go outside]
    D --> E
    E --> F[End]`;
    } else if (prompt.toLowerCase().includes('sequence')) {
      return `sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Request data
    System->>Database: Query data
    Database-->>System: Return results
    System-->>User: Display results`;
    } else if (prompt.toLowerCase().includes('class')) {
      return `classDiagram
    class Animal {
      +name: string
      +age: int
      +makeSound(): void
    }
    class Dog {
      +breed: string
      +fetch(): void
    }
    class Cat {
      +color: string
      +climb(): void
    }
    Animal <|-- Dog
    Animal <|-- Cat`;
    } else {
      return `graph TD
    A[${prompt.substring(0, 20)}...] --> B[Generated]
    B --> C[Diagram]
    C --> D[Example]`;
    }
  }
  
  try {
    if (!apiKey) {
      throw new Error('API key is required. Please add your API key.');
    }

    let endpoint = API_ENDPOINT;
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    };
    let body: any = {};

    const mermaidSystemPrompt = `You are a diagram expert specializing in creating Mermaid syntax diagrams.\n\nSTRICT INSTRUCTIONS:\n- Respond ONLY with valid, complete Mermaid code.\n- Do NOT include explanations, markdown code blocks, or any extra text.\n- The response MUST start with a valid Mermaid diagram type (e.g., graph, flowchart, sequenceDiagram, classDiagram, stateDiagram, erDiagram, gantt, pie, gitGraph, mindmap, timeline, quadrantChart, zenuml).\n- Do NOT wrap the code in triple backticks or any markdown.\n- Ensure the diagram is clean, well-organized, and correctly formatted.\n- If the prompt is ambiguous, make reasonable assumptions and generate a best-effort diagram.`;

    if (provider === 'openai') {
      body = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: mermaidSystemPrompt
          },
          {
            role: 'user',
            content: `Create a Mermaid diagram based on this description: ${prompt}`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      };
    } else if (provider === 'anthropic') {
      endpoint = 'https://api.anthropic.com/v1/messages';
      headers = {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      };
      body = {
        model: 'claude-3-opus-20240229',
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: `${mermaidSystemPrompt}\nCreate a Mermaid diagram based on this description: ${prompt}`
          }
        ]
      };
    } else if (provider === 'gemini') {
      endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
      headers = {
        'Content-Type': 'application/json',
      };
      body = {
        contents: [
          {
            parts: [
              {
                text: `${mermaidSystemPrompt}\nCreate a Mermaid diagram based on this description: ${prompt}`
              }
            ]
          }
        ]
      };
    } else if (provider === 'grok') {
      endpoint = 'https://api.grok.x.ai/v1/chat/completions'; // Example endpoint, update if needed
      headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      };
      body = {
        model: 'grok-1', // Update model name if needed
        messages: [
          {
            role: 'system',
            content: mermaidSystemPrompt,
          },
          {
            role: 'user',
            content: `Create a Mermaid diagram based on this description: ${prompt}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      };
    }

    console.log(`Sending request to ${provider} with prompt:`, prompt);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    let generatedText = '';
    if (provider === 'openai') {
      const data = await response.json();
      console.log('OpenAI API response:', data);
      generatedText = data.choices[0].message.content.trim();
    } else if (provider === 'anthropic') {
      const data = await response.json();
      console.log('Anthropic API response:', data);
      generatedText = data.content[0].text.trim();
    } else if (provider === 'gemini') {
      const data = await response.json();
      console.log('Gemini API response:', data);
      generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    } else if (provider === 'grok') {
      const data = await response.json();
      console.log('Grok API response:', data);
      generatedText = data.choices[0].message.content.trim();
    }
    // Remove markdown code block wrappers and trim whitespace
    let cleaned = generatedText
      .replace(/```mermaid([\s\S]*?)```/gi, '$1')
      .replace(/```([\s\S]*?)```/gi, '$1')
      .replace(/^[`\s]+|[`\s]+$/g, '')
      .trim();

    // Validate that the code starts with a valid Mermaid diagram type
    const validTypes = [
      'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
      'erDiagram', 'gantt', 'pie', 'gitGraph', 'mindmap', 'timeline', 'quadrantChart', 'zenuml'
    ];
    const startsWithValidType = validTypes.some(type => cleaned.startsWith(type));
    if (!startsWithValidType) {
      throw new Error('The AI did not return valid Mermaid code. Please try rephrasing your prompt or make it more specific.');
    }
    return cleaned;
  } catch (error) {
    console.error('Error in API call:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate diagram. Please try again later.');
  }
};
