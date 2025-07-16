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
    id: 'class-diagram',
    name: 'Class Relationships',
    category: 'Class Diagram',
    code: `classDiagram
Class01 <|-- AveryLongClass : Cool
<<Interface>> Class01
Class09 --> C2 : Where am I?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
class Class10 {
  <<service>>
  int id
  size()
}`
  },
  {
    id: 'state-diagram',
    name: 'State Transitions',
    category: 'State Diagram',
    code: `stateDiagram-v2
[*] --> Still
Still --> [*]
Still --> Moving
Moving --> Still
Moving --> Crash
Crash --> [*]`
  },
  {
    id: 'pie-chart',
    name: 'Pet Distribution',
    category: 'Pie Chart',
    code: `pie
"Dogs" : 386
"Cats" : 85.9
"Rats" : 15`
  },
  {
    id: 'git-graph',
    name: 'Git Workflow',
    category: 'Git Graph',
    code: `gitGraph
  commit
  commit
  branch develop
  checkout develop
  commit
  commit
  checkout main
  merge develop
  commit
  commit`
  },
  {
    id: 'bar-chart',
    name: 'Git Issues Timeline',
    category: 'Bar Chart',
    code: `gantt
    title Git Issues - days since last update
    dateFormat  X
    axisFormat %s

    section Issue19062
    71   : 0, 71
    section Issue19401
    36   : 0, 36
    section Issue193
    34   : 0, 34
    section Issue7441
    9    : 0, 9
    section Issue1300
    5    : 0, 5`
  },
  {
    id: 'user-journey',
    name: 'Working Day Journey',
    category: 'User Journey',
    code: `journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 3: Me`
  },
  {
    id: 'c4-diagram',
    name: 'Internet Banking System',
    category: 'C4 Diagram',
    code: `C4Context
title System Context diagram for Internet Banking System

Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
Person(customerB, "Banking Customer B")
Person_Ext(customerC, "Banking Customer C")
System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

Enterprise_Boundary(b1, "BankBoundary") {

  SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

  System_Boundary(b2, "BankBoundary2") {
    System(SystemA, "Banking System A")
    System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts.")
  }

  System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
  SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

  Boundary(b3, "BankBoundary3", "boundary") {
    SystemQueue(SystemF, "Banking System F Queue", "A system of the bank, with personal bank accounts.")
    SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
  }
}

BiRel(customerA, SystemAA, "Uses")
BiRel(SystemAA, SystemE, "Uses")
Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
Rel(SystemC, customerA, "Sends e-mails to")`
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