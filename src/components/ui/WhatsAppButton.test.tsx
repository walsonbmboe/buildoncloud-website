import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { WhatsAppButton } from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('renders with correct aria-label', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    expect(screen.getByRole('button', { name: /contact us on whatsapp/i })).toBeInTheDocument()
  })

  it('has fixed positioning classes (bottom-6 right-6 z-40)', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('fixed')
    expect(button.className).toContain('bottom-6')
    expect(button.className).toContain('right-6')
    expect(button.className).toContain('z-40')
  })

  it('has minimum 44x44px touch target (w-14 h-14 = 56px)', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('w-14')
    expect(button.className).toContain('h-14')
  })

  it('has green background color', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('bg-[#25D366]')
  })

  it('has pulse animation class', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('animate-pulse-slow')
  })

  it('opens WhatsApp link with encoded message on click', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(
      <WhatsAppButton phoneNumber="441234567890" message="Hello BuildOnCloud!" />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(openSpy).toHaveBeenCalledWith(
      'https://wa.me/441234567890?text=Hello%20BuildOnCloud!',
      '_blank',
      'noopener,noreferrer'
    )
    openSpy.mockRestore()
  })

  it('is round (rounded-full)', () => {
    render(<WhatsAppButton phoneNumber="441234567890" message="Hello" />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('rounded-full')
  })
})
