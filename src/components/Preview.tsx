import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'
import { renderMermaid } from '@/lib/mermaidRenderer'
import { exportSvgFromContainer } from '@/lib/exportUtils'
import type { ExportOptions } from '@/lib/exportUtils'

interface PreviewProps {
  code: string
}

export interface PreviewRef {
  exportToPng: (options?: ExportOptions) => Promise<void>
}

export const Preview = forwardRef<PreviewRef, PreviewProps>(({ code }, ref) => {
  const previewRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const isInitialRender = useRef(true)

  useImperativeHandle(ref, () => ({
    exportToPng: async (options?: ExportOptions) => {
      if (!previewRef.current) {
        throw new Error('Preview container not found')
      }
      
      if (!code.trim()) {
        throw new Error('No diagram to export')
      }

      setIsExporting(true)
      try {
        await exportSvgFromContainer(previewRef.current, options)
      } finally {
        setIsExporting(false)
      }
    }
  }))

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
    <div data-testid="preview" className="h-full relative border border-border rounded-md">
      {(isLoading || isExporting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {isExporting ? 'Exporting...' : 'Loading...'}
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
})

Preview.displayName = 'Preview' 