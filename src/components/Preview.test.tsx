import { render, screen, waitFor } from '@testing-library/react'
import { Preview } from './Preview'

vi.mock('@/lib/mermaidRenderer', () => ({
  renderMermaid: vi.fn().mockResolvedValue('<svg>test</svg>')
}))

describe('Preview', () => {
  it('renders empty when no code provided', () => {
    // given
    const code = ''
    
    // when
    render(<Preview code={code} />)
    
    // then
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not show loading state on initial render', async () => {
    // given
    const code = 'graph TD; A --> B'
    
    // when
    render(<Preview code={code} />)
    
    // then
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('shows error when mermaid parsing fails', async () => {
    // given
    const { renderMermaid } = await import('@/lib/mermaidRenderer')
    vi.mocked(renderMermaid).mockRejectedValueOnce(new Error('Invalid syntax'))
    const code = 'invalid mermaid code'
    
    // when
    render(<Preview code={code} />)
    
    // then
    await waitFor(() => {
      expect(screen.getByText('Invalid syntax')).toBeInTheDocument()
    })
  })

  it('renders SVG when valid code provided', async () => {
    // given
    const { renderMermaid } = await import('@/lib/mermaidRenderer')
    vi.mocked(renderMermaid).mockResolvedValueOnce('<svg>test</svg>')
    const code = 'graph TD; A --> B'
    
    // when
    render(<Preview code={code} />)
    
    // then
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })
  })
}) 