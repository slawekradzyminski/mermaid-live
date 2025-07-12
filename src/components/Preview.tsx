import { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { renderMermaid } from '@/lib/mermaidRenderer'

interface PreviewProps {
  code: string
}

export function Preview({ code }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Start without loading overlay
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (!code.trim()) {
      if (previewRef.current) {
        previewRef.current.innerHTML = ''
      }
      setError(null)
      setIsLoading(false)
      return
    }

    const renderDiagram = async () => {
      // Only show loading for subsequent renders, not the initial one
      if (!isInitialRender.current) {
        setIsLoading(true)
      }
      setError(null)

      try {
        const svg = await renderMermaid(code)
        
        if (previewRef.current) {
          previewRef.current.innerHTML = svg
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to render diagram')
        if (previewRef.current) {
          previewRef.current.innerHTML = ''
        }
      } finally {
        setIsLoading(false)
        isInitialRender.current = false
      }
    }

    renderDiagram()
  }, [code])

  return (
    <div className="h-full relative border border-border rounded-md">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Loading...
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 p-4 z-20">
          <Alert variant="destructive" className="h-full">
            <AlertDescription className="font-mono text-sm whitespace-pre-wrap overflow-auto">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      <div 
        ref={previewRef}
        className={cn(
          "h-full p-4 overflow-auto flex items-center justify-center",
          "[&_svg]:max-w-full [&_svg]:max-h-full [&_svg]:w-auto [&_svg]:h-auto"
        )}
      />
    </div>
  )
} 