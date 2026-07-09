import { useState } from 'react'
import { validateEmail } from '../../utils/validation'

interface NewsletterFormProps {
  /** Render variant: 'light' for standard pages, 'dark' for footer */
  variant?: 'light' | 'dark';
}

/**
 * Self-contained newsletter subscription form.
 * Validates: Requirements 16.1, 16.2, 16.3, 16.4
 */
function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address')
      return
    }

    // Valid submission — show success and clear input
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  const isDark = variant === 'dark';

  const inputClasses = isDark
    ? 'flex-1 min-w-[200px] px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors duration-200'
    : 'flex-1 min-w-[200px] px-3 py-2 bg-white border border-gray-200 rounded-lg text-heading text-sm placeholder:text-gray-400 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500 transition-colors duration-200';

  const buttonClasses = isDark
    ? 'px-4 py-2 bg-electric-500 hover:bg-electric-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a2e]'
    : 'px-4 py-2 bg-electric-500 hover:bg-electric-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white';

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'error') {
                setStatus('idle')
                setErrorMessage('')
              }
            }}
            placeholder="Enter your email"
            className={inputClasses}
            aria-label="Email address for newsletter"
            aria-describedby={status !== 'idle' ? 'newsletter-status' : undefined}
          />
          <button
            type="submit"
            className={buttonClasses}
          >
            Subscribe
          </button>
        </div>
        {status === 'error' && (
          <p id="newsletter-status" className="text-red-500 text-xs" role="alert">
            {errorMessage}
          </p>
        )}
        {status === 'success' && (
          <p id="newsletter-status" className="text-green-600 text-xs" role="alert">
            Thanks for subscribing!
          </p>
        )}
      </div>
    </form>
  )
}

export default NewsletterForm
