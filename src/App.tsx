import React, { useState, useRef, useCallback } from 'react'
import { Editor } from './components/Editor'
import { Preview } from './components/Preview'
import type { PreviewRef } from './components/Preview'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Download, Trash2 } from 'lucide-react'

function App() {
  const [code, setCode] = useState(`sequenceDiagram
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

    Note over User,Tool: Function calling workflow`)

  const [editorWidth, setEditorWidth] = useState(50) // Percentage
  const [isDragging, setIsDragging] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<PreviewRef>(null)

  const handleClear = () => {
    setCode('')
  }

  const handleExportPng = async () => {
    if (!previewRef.current) return
    
    if (!code.trim()) {
      alert('No diagram to export. Please create a diagram first.')
      return
    }

    setIsExporting(true)
    try {
      await previewRef.current.exportToPng({
        filename: 'mermaid-diagram',
        scale: 2,
        backgroundColor: '#ffffff'
      })
    } catch (error) {
      console.error('Export failed:', error)
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsExporting(false)
    }
  }

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const containerWidth = containerRect.width
    const mouseX = e.clientX - containerRect.left
    
    // Calculate new width as percentage (with constraints)
    const newWidth = Math.min(Math.max((mouseX / containerWidth) * 100, 20), 80)
    setEditorWidth(newWidth)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }, [])

  // Attach global mouse events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background">
        <header className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">Mermaid Editor</h1>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleExportPng}
                    disabled={isExporting || !code.trim()}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export diagram as PNG</p>
                </TooltipContent>
              </Tooltip>
              
            <Tooltip>
              <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleClear}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear the editor content</p>
              </TooltipContent>
            </Tooltip>
            </div>
          </div>
        </header>
        
        <div ref={containerRef} className="flex-1 flex min-h-0 p-4">
          <Card 
            className="flex flex-col min-w-0 transition-all duration-75"
            style={{ width: `${editorWidth}%` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Editor</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <Editor value={code} onChange={setCode} />
            </CardContent>
          </Card>
          
          {/* Resize Handle */}
          <div className="relative flex items-center justify-center w-4 mx-2">
            <div
              className={`absolute inset-y-0 w-1 bg-border hover:bg-primary/20 transition-colors cursor-col-resize rounded-full ${
                isDragging ? 'bg-primary/30' : ''
              }`}
              onMouseDown={handleMouseDown}
            />
            <div
              className="absolute inset-y-0 w-4 cursor-col-resize"
              onMouseDown={handleMouseDown}
            />
          </div>
          
          <Card 
            className="flex flex-col min-w-0 transition-all duration-75"
            style={{ width: `${100 - editorWidth}%` }}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <Preview ref={previewRef} code={code} />
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App
