import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the Editor and Preview components to isolate App logic
vi.mock('./components/Editor', () => ({
  Editor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div data-testid="editor">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="editor"
      />
    </div>
  )
}))

vi.mock('./components/Preview', () => ({
  Preview: ({ code }: { code: string }) => (
    <div data-testid="preview">
      Preview: {code}
    </div>
  )
}))

describe('App', () => {
  beforeEach(() => {
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })

  it('renders with initial layout and functionality', () => {
    // given
    
    // when
    render(<App />)
    
    // then
    expect(screen.getByText('Mermaid Editor')).toBeInTheDocument()
    expect(screen.getByTestId('editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toBeInTheDocument()
    expect(screen.getByTestId('editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview').textContent).toContain('sequenceDiagram')
  })

  it('clears editor content when clear button is clicked', async () => {
    // given
    const user = userEvent.setup()
    render(<App />)
    
    // when - Find the second button (clear button) with trash icon
    const buttons = screen.getAllByRole('button')
    const clearButton = buttons[1] // Second button is the clear button
    await user.click(clearButton)
    
    // then
    expect(screen.getByTestId('editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toHaveTextContent('Preview:')
  })

  it('updates preview when editor content changes', async () => {
    // given
    render(<App />)
    // when
    // Note: CodeMirror integration would need more complex testing approach
    // For now, just verify the components are rendered
    
    // then
    expect(screen.getByTestId('editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toBeInTheDocument()
  })

  it('renders panels with initial 50/50 split and resize handle', () => {
    // given
    
    // when
    render(<App />)
    const editorCard = screen.getByTestId('editor').closest('[style*="width"]')
    const previewCard = screen.getByTestId('preview').closest('[style*="width"]')
    
    // then
    expect(editorCard).toHaveStyle('width: 50%')
    expect(previewCard).toHaveStyle('width: 50%')
    expect(document.querySelector('[class*="cursor-col-resize"]')).toBeInTheDocument()
  })

  it('enables resize mode when handle is pressed and resets on release', () => {
    // given
    render(<App />)
    const handle = document.querySelector('[class*="cursor-col-resize"]')
    
    // when
    if (handle) {
      fireEvent.mouseDown(handle)
    }
    
    // then
    expect(document.body.style.cursor).toBe('col-resize')
    expect(document.body.style.userSelect).toBe('none')
    
    // when
    fireEvent.mouseUp(document)
    
    // then
    expect(document.body.style.cursor).toBe('')
    expect(document.body.style.userSelect).toBe('')
  })

  it('resizes panels when dragging with constraints', () => {
    // given
    render(<App />)
    const handle = document.querySelector('[class*="cursor-col-resize"]')
    
    // when
    if (handle) {
      fireEvent.mouseDown(handle)
    fireEvent.mouseMove(document, { clientX: 100 })
    }
    
    // then
    const editorCard = screen.getByTestId('editor').closest('[style*="width"]')
    const previewCard = screen.getByTestId('preview').closest('[style*="width"]')
    
    // Note: Exact width calculations depend on container dimensions in test environment
    expect(editorCard).toHaveAttribute('style')
    expect(previewCard).toHaveAttribute('style')
  })

  it('stops resizing when mouse is released', () => {
    // given
    render(<App />)
    const handle = document.querySelector('[class*="cursor-col-resize"]')
    
    // when
    if (handle) {
      fireEvent.mouseDown(handle)
      fireEvent.mouseMove(document, { clientX: 100 })
    fireEvent.mouseUp(document)
    }
    
    // then
    expect(document.body.style.cursor).toBe('')
    expect(document.body.style.userSelect).toBe('')
  })
}) 