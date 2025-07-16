import { useEffect, useRef } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { mermaid } from 'codemirror-lang-mermaid'
import { cn } from '@/lib/utils'

interface EditorProps {
  value: string
  onChange: (value: string) => void
}

export function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)

  // Keep onChange ref up to date
  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  // Initialize editor (only once)
  useEffect(() => {
    if (!editorRef.current || viewRef.current) return

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        mermaid(),
        EditorView.theme({
          '.cm-content': {
            lineHeight: '1.6',
            fontFamily: '"JetBrains Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Droid Sans Mono", monospace'
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
        'focus-within:ring-1 focus-within:ring-ring',
        // Responsive font sizing using CSS
        'text-xs sm:text-sm md:text-base'
      )}
      style={{
        fontSize: 'clamp(10px, 2.5vw, 15px)'
      }}
    />
  )
} 