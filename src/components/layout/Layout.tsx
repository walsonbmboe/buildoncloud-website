import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './Navbar'
import Footer from './Footer'
import { WhatsAppButton } from '../ui/WhatsAppButton'
import { BackToTopButton } from '../ui/BackToTopButton'
import { pageTransition } from '../../utils/animation'

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Floating action buttons */}
      <BackToTopButton />
      <WhatsAppButton
        phoneNumber="237671314091"
        message="Hi BuildOnCloud, I'd like to learn more about your services."
      />
    </div>
  )
}

export default Layout
