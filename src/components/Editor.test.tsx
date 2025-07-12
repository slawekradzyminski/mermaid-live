import { render, screen } from '@testing-library/react'
import { Editor } from './Editor'

describe('Editor', () => {
  it('renders without crashing', () => {
    // given
    const mockOnChange = vi.fn()
    
    // when
    render(<Editor value="" onChange={mockOnChange} />)
    
    // then
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with initial value', () => {
    // given
    const mockOnChange = vi.fn()
    const initialValue = 'graph TD; A --> B'
    
    // when
    render(<Editor value={initialValue} onChange={mockOnChange} />)
    
    // then
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
}) 