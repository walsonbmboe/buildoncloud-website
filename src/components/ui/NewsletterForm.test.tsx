import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NewsletterForm from './NewsletterForm'

describe('NewsletterForm', () => {
  it('renders an email input with min-width 200px', () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText('Email address for newsletter')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('min-w-[200px]')
  })

  it('renders a Subscribe button', () => {
    render(<NewsletterForm />)
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('shows error message for invalid email and preserves input value', () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText('Email address for newsletter') as HTMLInputElement
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'bad-email' } })
    fireEvent.click(button)

    expect(screen.getByRole('alert')).toHaveTextContent('Please enter a valid email address')
    expect(input.value).toBe('bad-email')
  })

  it('shows success message and clears input on valid submission', () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText('Email address for newsletter') as HTMLInputElement
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'hello@example.com' } })
    fireEvent.click(button)

    expect(screen.getByRole('alert')).toHaveTextContent('Thanks for subscribing!')
    expect(input.value).toBe('')
  })

  it('clears error state when user types after an error', () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText('Email address for newsletter')
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'nope' } })
    fireEvent.click(button)

    expect(screen.getByRole('alert')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'nope2' } })
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('has aria-describedby pointing to status message when visible', () => {
    render(<NewsletterForm />)
    const input = screen.getByLabelText('Email address for newsletter')
    const button = screen.getByRole('button', { name: 'Subscribe' })

    // No status initially
    expect(input).not.toHaveAttribute('aria-describedby')

    // Trigger error
    fireEvent.change(input, { target: { value: 'x' } })
    fireEvent.click(button)

    expect(input).toHaveAttribute('aria-describedby', 'newsletter-status')
  })
})
