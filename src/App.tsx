import React, { Suspense, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import { LoadingScreen } from './components/layout/LoadingScreen'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'))
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage'))
const PricingPage = React.lazy(() => import('./pages/PricingPage'))
const BlogPage = React.lazy(() => import('./pages/BlogPage'))
const BlogArticlePage = React.lazy(() => import('./pages/BlogArticlePage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <HelmetProvider>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
