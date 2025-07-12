import { useState } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

function App() {
  const [code, setCode] = useState(`graph TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    B -->|No| D[End]`)

  const handleClear = () => {
    setCode('')
  }

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background">
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Mermaid Editor</h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleClear}>
                  Clear
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear the editor content</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>
        
        <div className="flex-1 flex min-h-0 gap-4 p-4">
          <Card className="flex-1 flex flex-col min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <Editor value={code} onChange={setCode} />
            </CardContent>
          </Card>
          
          <Card className="flex-1 flex flex-col min-w-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <Preview code={code} />
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App
