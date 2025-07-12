import { render, waitFor } from '@testing-library/react'
import { Preview } from './Preview'

vi.mock('@/lib/mermaidRenderer', () => ({
  renderMermaid: vi.fn().mockResolvedValue('<svg><g>test diagram</g></svg>')
}))

describe('Preview - Diagram Persistence', () => {
  it('should keep diagram visible after first load', async () => {
    // given
    const code = 'graph TD; A-->B'
    
    // when
    const { container, rerender } = render(<Preview code={code} />)
    
    // then
    await waitFor(() => expect(container.querySelector('svg')).toBeInTheDocument())
    
    // when - trigger a re-render which should expose the bug
    rerender(<Preview code={code + '\n'} />)
    
    // wait another animation frame to ensure diagram doesn't disappear
    await new Promise(r => setTimeout(r, 20))
    
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
}) 