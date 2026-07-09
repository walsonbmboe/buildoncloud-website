import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BackToTopButton } from './BackToTopButton'

// Mock useScrollPosition hook
vi.mock('../../hooks/useScrollPosition', () => ({
  useScrollPosition: vi.fn(() => 0),
}))

import { useScrollPosition } from '../../hooks/useScrollPosition'
const mockUseScrollPosition = vi.mocked(useScrollPosition)

describe('BackToTopButton', () => {
  beforeEach(() => {
    mockUseScrollPosition.mockReturnValue(0)
  })

  it('is hidden when scroll position is below 400px', () => {
    mockUseScrollPosition.mockReturnValue(200)
    render(<BackToTopButton />)
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
  })

  it('is visible when scroll position exceeds 400px', () => {
    mockUseScrollPosition.mockReturnValue(500)
    render(<BackToTopButton />)
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })

  it('has correct aria-label for accessibility', () => {
    mockUseScrollPosition.mockReturnValue(500)
    render(<BackToTopButton />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Back to top')
  })

  it('has fixed positioning above WhatsApp button (bottom-24 right-6)', () => {
    mockUseScrollPosition.mockReturnValue(500)
    render(<BackToTopButton />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('fixed')
    expect(button.className).toContain('bottom-24')
    expect(button.className).toContain('right-6')
    expect(button.className).toContain('z-40')
  })

  it('calls window.scrollTo with smooth behavior on click', () => {
    mockUseScrollPosition.mockReturnValue(500)
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<BackToTopButton />)
    fireEvent.click(screen.getByRole('button'))
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    scrollToSpy.mockRestore()
  })

  it('is keyboard focusable (rendered as button element)', () => {
    mockUseScrollPosition.mockReturnValue(500)
    render(<BackToTopButton />)
    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('is not visible at exactly 400px scroll position', () => {
    mockUseScrollPosition.mockReturnValue(400)
    render(<BackToTopButton />)
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
  })

  it('is visible at 401px scroll position', () => {
    mockUseScrollPosition.mockReturnValue(401)
    render(<BackToTopButton />)
    expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
  })
})
