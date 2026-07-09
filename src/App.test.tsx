import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HomePage from './pages/HomePage'

describe('App', () => {
  it('renders the home page by default', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    )
    expect(
      screen.getByText('Empowering African Businesses Through Digital Transformation')
    ).toBeInTheDocument()
  })
})
