# Mermaid Editor

A modern, real-time Mermaid diagram editor built with React, TypeScript, and Vite. Create, edit, and preview Mermaid diagrams with live updates and diagram persistence.

## 🚀 Features

- **Real-time Preview**: See your Mermaid diagrams update as you type
- **Syntax Highlighting**: CodeMirror-powered editor with Mermaid syntax support
- **Diagram Persistence**: Your diagrams are automatically saved and restored
- **Modern UI**: Clean, responsive interface built with Tailwind CSS and Radix UI
- **TypeScript**: Full type safety and excellent developer experience
- **Comprehensive Testing**: Unit tests with Vitest and E2E tests with Playwright

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Editor**: CodeMirror 6 with Mermaid language support
- **Styling**: Tailwind CSS, Radix UI components
- **Diagrams**: Mermaid.js
- **Testing**: Vitest (unit tests), Playwright (E2E tests)
- **Build**: Vite with modern ES modules
- **Deployment**: GitHub Actions → GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/my-mermaid-editor.git
cd my-mermaid-editor

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🎯 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm preview      # Preview production build

# Building
pnpm build        # Build for production
pnpm lint         # Run ESLint

# Testing
pnpm test         # Run unit tests
pnpm test:watch   # Run tests in watch mode
pnpm test:ui      # Run tests with UI
pnpm test:e2e     # Run E2E tests
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. **Push to main/master**: Triggers build and deployment
2. **Pull Requests**: Runs tests and builds (no deployment)
3. **GitHub Pages**: Serves the built application

### Manual Deployment Setup

1. **Enable GitHub Pages** in your repository settings
2. **Set Source** to "GitHub Actions"
3. **Push to main/master** to trigger deployment

The deployment workflow:
- Installs dependencies with pnpm
- Runs all tests
- Builds the production bundle
- Deploys to GitHub Pages

## 🧪 Testing

### Unit Tests
```bash
pnpm test           # Run all unit tests
pnpm test:watch     # Watch mode for development
```

### E2E Tests
```bash
pnpm test:e2e       # Run Playwright tests
```

The project includes comprehensive test coverage:
- **Component tests**: Editor, Preview components
- **Integration tests**: Diagram persistence
- **E2E tests**: Full user workflows

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Editor.tsx      # Code editor component
│   ├── Preview.tsx     # Diagram preview component
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── mermaidRenderer.ts  # Mermaid rendering logic
│   └── utils.ts        # General utilities
├── types/              # TypeScript type definitions
└── test/               # Test setup and utilities
```

## 🔧 Configuration

### TypeScript
- `tsconfig.app.json`: Main application configuration
- `tsconfig.test.json`: Test-specific configuration
- `tsconfig.node.json`: Node.js tooling configuration

### Testing
- `vitest.config.ts`: Unit test configuration
- `playwright.config.ts`: E2E test configuration

### Build
- `vite.config.ts`: Build and development configuration
- Configured for GitHub Pages deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `pnpm test && pnpm test:e2e`
5. Commit changes: `git commit -m 'Add amazing feature'`
6. Push to branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Mermaid.js](https://mermaid.js.org/) for the diagram rendering
- [CodeMirror](https://codemirror.net/) for the code editor
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
