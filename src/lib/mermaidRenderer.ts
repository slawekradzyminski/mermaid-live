import type { Mermaid } from 'mermaid'

let mermaid: Mermaid | undefined
let initDone = false
let seq = 0

export async function renderMermaid(code: string): Promise<string> {
  if (!mermaid) {
    mermaid = (await import('mermaid')).default
  }
  
  if (!initDone) {
    mermaid.initialize({ 
      startOnLoad: false, 
      securityLevel: 'strict' 
    })
    initDone = true
  }
  
  const id = `preview-${seq++}`
  await mermaid.parse(code) // throws on error
  const { svg } = await mermaid.render(id, code)
  return svg
}

// Hot Module Replacement guard to prevent re-initialization during development
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    mermaid = undefined
    initDone = false
    seq = 0
  })
} 