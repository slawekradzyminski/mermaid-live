import mermaid from 'mermaid'

let initDone = false
let seq = 0

export async function renderMermaid(code: string): Promise<string> {
  if (!initDone) {
    mermaid.initialize({ 
      startOnLoad: false, 
      securityLevel: 'strict',
      theme: 'default'
    })
    initDone = true
  }
  
  const id = `preview-${seq++}`
  await mermaid.parse(code)
  const { svg } = await mermaid.render(id, code)
  return svg
}

// Hot Module Replacement guard to prevent re-initialization during development
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    initDone = false
    seq = 0
  })
} 