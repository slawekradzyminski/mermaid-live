import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { cn } from '@/lib/utils'
import { useElementSize } from '@/hooks/useElementSize'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  const { width } = useElementSize(editorRef)

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // Calculate responsive font size based on editor panel width
  const getFontSize = (editorWidth: number): string => {
    if (editorWidth < 300) return '10px'  // Very narrow
    if (editorWidth < 400) return '11px'  // Narrow
    if (editorWidth < 500) return '12px'  // Medium narrow
    if (editorWidth < 600) return '13px'  // Medium
    if (editorWidth < 700) return '14px'  // Medium wide
    return '15px'  // Wide
  }

  const fontSize = getFontSize(width)

  // Initialize editor (only once)
  useEffect(() => {
    if (!editorRef.current || viewRef.current) return

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        EditorView.theme({
          '.cm-content': {
            fontSize: 'var(--editor-font-size, 14px)',
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Droid Sans Mono", monospace'
          },
          '.cm-editor': {
            fontSize: 'var(--editor-font-size, 14px)'
          }
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString())
          }
        })
      ]
    })

    const view = new EditorView({
      state,
      parent: editorRef.current
    })

    viewRef.current = view

    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [])

  // Update editor content when value prop changes
  useEffect(() => {
    const view = viewRef.current
    if (!view || view.state.doc.toString() === value) return

    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: value
      }
    })
  }, [value])

  return (
    <div 
      ref={editorRef} 
      className={cn(
        'h-full w-full overflow-auto border-r border-border bg-background',
        'focus-within:ring-1 focus-within:ring-ring'
      )}
      style={{
        '--editor-font-size': fontSize
      } as React.CSSProperties}
    />
  )
} 