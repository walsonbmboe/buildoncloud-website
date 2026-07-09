import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )
}

describe('Footer', () => {
  it('renders the footer landmark', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders the BuildOnCloud logo link', () => {
    renderFooter()
    const logo = screen.getByLabelText('BuildOnCloud Technologies Home')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders company tagline', () => {
    renderFooter()
    expect(
      screen.getByText(/Empowering Businesses Through Cloud, AI & Digital Transformation/i)
    ).toBeInTheDocument()
  })

  it('renders all quick links', () => {
    renderFooter()
    const expectedLinks = ['Home', 'Portfolio', 'About', 'Pricing', 'Blog', 'Contact']
    expectedLinks.forEach((label) => {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    })
  })

  it('renders contact email', () => {
    renderFooter()
    const emailLink = screen.getByText('info@buildoncloud.co.uk')
    expect(emailLink.closest('a')).toHaveAttribute('href', 'mailto:info@buildoncloud.co.uk')
  })

  it('renders phone number', () => {
    renderFooter()
    expect(screen.getByText('+44 XXX XXXX')).toBeInTheDocument()
  })

  it('renders social links for LinkedIn and Facebook', () => {
    renderFooter()
    expect(screen.getByLabelText('Follow us on LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/buildoncloud'
    )
    expect(screen.getByLabelText('Follow us on Facebook')).toHaveAttribute(
      'href',
      'https://www.facebook.com/buildoncloud'
    )
  })

  it('social links open in new tab', () => {
    renderFooter()
    const linkedin = screen.getByLabelText('Follow us on LinkedIn')
    expect(linkedin).toHaveAttribute('target', '_blank')
    expect(linkedin).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders newsletter subscription form', () => {
    renderFooter()
    expect(screen.getByLabelText('Email address for newsletter')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeInTheDocument()
  })

  it('shows error when invalid email is submitted', () => {
    renderFooter()
    const input = screen.getByLabelText('Email address for newsletter')
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'invalid-email' } })
    fireEvent.click(button)

    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
  })

  it('shows success message on valid email submission', () => {
    renderFooter()
    const input = screen.getByLabelText('Email address for newsletter')
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument()
  })

  it('clears input after successful subscription', () => {
    renderFooter()
    const input = screen.getByLabelText('Email address for newsletter') as HTMLInputElement
    const button = screen.getByRole('button', { name: 'Subscribe' })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    expect(input.value).toBe('')
  })

  it('renders copyright notice', () => {
    renderFooter()
    const year = new Date().getFullYear()
    expect(
      screen.getByText(`© ${year} BuildOnCloud Technologies. All rights reserved.`)
    ).toBeInTheDocument()
  })

  it('has footer navigation with aria-label', () => {
    renderFooter()
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
  })
})
