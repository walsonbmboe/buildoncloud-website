import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import logo from '../../assets/high-level-description-a-premium-futuris_f3vHQt_SWbScCaxkD5y_kw_UlApLCgFRFmxf_vEPckIXw_cover.jpg'

interface LoadingScreenProps {
  onComplete: () => void
}

const MIN_DISPLAY_MS = 800
const MAX_DISPLAY_MS = 3000
const FADE_OUT_MS = 300

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false)
  const hasTriggeredRef = useRef(false)

  useEffect(() => {
    let minTimerElapsed = false
    let fontsReady = false
    let maxTimerFired = false

    function triggerFadeOut() {
      if (hasTriggeredRef.current) return
      hasTriggeredRef.current = true
      setIsFadingOut(true)

      setTimeout(() => {
        onComplete()
      }, FADE_OUT_MS)
    }

    function checkReady() {
      if (minTimerElapsed && fontsReady) {
        triggerFadeOut()
      }
    }

    // Minimum timer
    const minTimer = setTimeout(() => {
      minTimerElapsed = true
      checkReady()
    }, MIN_DISPLAY_MS)

    // Maximum timer — force dismiss regardless
    const maxTimer = setTimeout(() => {
      maxTimerFired = true
      triggerFadeOut()
    }, MAX_DISPLAY_MS)

    // Wait for fonts to be ready
    const fontsPromise = document.fonts?.ready ?? Promise.resolve()
    fontsPromise.then(() => {
      if (!maxTimerFired) {
        fontsReady = true
        checkReady()
      }
    })

    return () => {
      clearTimeout(minTimer)
      clearTimeout(maxTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: FADE_OUT_MS / 1000, ease: 'easeOut' }}
      aria-label="Loading"
      role="status"
    >
      {/* Animated logo */}
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-500/30 flex-shrink-0"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <img
            src={logo}
            alt="BuildOnCloud Technologies"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Subtle loading indicator */}
        <motion.div
          className="w-12 h-0.5 bg-gradient-to-r from-electric-500 to-purple-500 rounded-full"
          animate={{
            scaleX: [0.3, 1, 0.3],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
