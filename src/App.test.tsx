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
    <div data-testid="preview">Preview: {code}</div>
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
    expect(screen.getByLabelText('editor').value).toContain('graph TD')
    expect(screen.getByTestId('preview').textContent).toContain('graph TD')
  })

  it('clears editor content when clear button is clicked', async () => {
    // given
    const user = userEvent.setup()
    render(<App />)
    
    // when
    await user.click(screen.getByRole('button', { name: /clear/i }))
    
    // then
    expect(screen.getByLabelText('editor')).toHaveValue('')
    expect(screen.getByTestId('preview')).toHaveTextContent('Preview:')
  })

  it('updates preview when editor content changes', async () => {
    // given
    const user = userEvent.setup()
    render(<App />)
    const editor = screen.getByLabelText('editor')
    
    // when
    await user.clear(editor)
    await user.type(editor, 'graph LR; A --> B')
    
    // then
    expect(screen.getByTestId('preview')).toHaveTextContent('graph LR; A --> B')
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
    const resizeHandle = document.querySelector('[class*="cursor-col-resize"]')
    
    // when
    fireEvent.mouseDown(resizeHandle!)
    
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
    const container = document.querySelector('[class*="flex-1"][class*="flex"][class*="min-h-0"]')
    const resizeHandle = document.querySelector('[class*="cursor-col-resize"]')
    
    // Mock container dimensions
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 1000,
        right: 1000,
        top: 0,
        bottom: 600,
        height: 600
      })
    })
    
    // when - normal resize
    fireEvent.mouseDown(resizeHandle!)
    fireEvent.mouseMove(document, { clientX: 300 })
    
    // then
    expect(screen.getByTestId('editor').closest('[style*="width"]')).toHaveStyle('width: 30%')
    expect(screen.getByTestId('preview').closest('[style*="width"]')).toHaveStyle('width: 70%')
    
    // when - constrain to minimum
    fireEvent.mouseMove(document, { clientX: 100 })
    
    // then
    expect(screen.getByTestId('editor').closest('[style*="width"]')).toHaveStyle('width: 20%')
    
    // when - constrain to maximum
    fireEvent.mouseMove(document, { clientX: 900 })
    
    // then
    expect(screen.getByTestId('editor').closest('[style*="width"]')).toHaveStyle('width: 80%')
  })

  it('stops resizing when mouse is released', () => {
    // given
    render(<App />)
    const container = document.querySelector('[class*="flex-1"][class*="flex"][class*="min-h-0"]')
    const resizeHandle = document.querySelector('[class*="cursor-col-resize"]')
    
    Object.defineProperty(container, 'getBoundingClientRect', {
      value: () => ({
        left: 0,
        width: 1000,
        right: 1000,
        top: 0,
        bottom: 600,
        height: 600
      })
    })
    
    // when
    fireEvent.mouseDown(resizeHandle!)
    fireEvent.mouseMove(document, { clientX: 300 })
    fireEvent.mouseUp(document)
    fireEvent.mouseMove(document, { clientX: 700 }) // Should not resize
    
    // then
    expect(screen.getByTestId('editor').closest('[style*="width"]')).toHaveStyle('width: 30%')
    expect(screen.getByTestId('preview').closest('[style*="width"]')).toHaveStyle('width: 70%')
  })
}) 