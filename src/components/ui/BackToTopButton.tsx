import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollPosition } from '../../hooks/useScrollPosition'

/**
 * Floating back-to-top button — visible when scrollY > 400px.
 * Positioned above the WhatsApp button with 10px+ spacing.
 * Validates: Requirements 18.1, 18.2, 18.3, 18.4
 */
export function BackToTopButton() {
  const scrollY = useScrollPosition()
  const isVisible = scrollY > 400

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-600 shadow-card hover:shadow-card-hover hover:text-heading transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-electric-500 focus:ring-offset-2 focus:ring-offset-white"
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
