import type { MermaidExample } from '@/types/examples'

export const mermaidExamples: MermaidExample[] = [
  {
    id: 'sequence-ai',
    name: 'AI Function Calling',
    category: 'Sequence Diagram',
    code: `sequenceDiagram
    participant User as 👤 User
    participant App as 🤖 AI app
    participant LLM as 🧠 LLM Provider (OpenAI)
    participant Tool as ⚙️ Function/Tool

    User->>App: 💬 Prompt
    App->>LLM: 📤 Prompt + function schema
    LLM-->>App: 🛠️ function name + arguments
    App->>Tool: ⚡ Invoke function (with arguments)
    Tool-->>App: ✅ Result
    App->>LLM: 📥 Result returned as context
    LLM-->>App: 🎯 Final answer
    App-->>User: 💬 Response

    Note over User,Tool: Function calling workflow`
  },
  {
    id: 'sequence-login',
    name: 'User Login Flow',
    category: 'Sequence Diagram',
    code: `sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database

    User->>Frontend: Enter credentials
    Frontend->>Backend: POST /login
    Backend->>Database: Validate user
    Database-->>Backend: User data
    Backend-->>Frontend: JWT token
    Frontend-->>User: Login successful`
  },
  {
    id: 'flowchart-decision',
    name: 'Decision Process',
    category: 'Flowchart',
    code: `flowchart TD
    A[Start] --> B{Is it Friday?}
    B -->|Yes| C[Go to the beach]
    B -->|No| D[Work hard]
    C --> E[End]
    D --> E[End]`
  },
  {
    id: 'flowchart-system',
    name: 'System Architecture',
    category: 'Flowchart',
    code: `flowchart LR
    A[Client] --> B[Load Balancer]
    B --> C[Web Server 1]
    B --> D[Web Server 2]
    C --> E[Database]
    D --> E[Database]
    E --> F[Cache]`
  },
  {
    id: 'user-journey',
    name: 'Shopping Experience',
    category: 'User Journey',
    code: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me`
  },
  {
    id: 'gantt-chart',
    name: 'Project Timeline',
    category: 'Gantt Chart',
    code: `gantt
    title Project Development Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Requirements    :a1, 2024-01-01, 30d
    Design         :after a1, 20d
    section Development
    Frontend       :2024-02-01, 45d
    Backend        :2024-02-15, 30d
    Testing        :2024-03-15, 15d
    section Deployment
    Production     :2024-04-01, 7d`
  }
]

export const getExamplesByCategory = () => {
  const categories: Record<string, MermaidExample[]> = {}
  
  mermaidExamples.forEach(example => {
    if (!categories[example.category]) {
      categories[example.category] = []
    }
    categories[example.category].push(example)
  })
  
  return categories
}

export const getExampleById = (id: string): MermaidExample | undefined => {
  return mermaidExamples.find(example => example.id === id)
}

export const defaultExample = mermaidExamples[0] // AI Function Calling 