import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
}

/**
 * Floating WhatsApp contact button — fixed bottom-right corner.
 * Opens wa.me link with pre-populated phone number and greeting.
 * Validates: Requirements 17.1, 17.2, 17.3, 17.4, 17.5
 */
export function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg animate-pulse-slow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-white"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </button>
  )
}
