import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import CustomCursor from '../fx/CustomCursor'
import Scanlines from '../fx/Scanlines'
import PageTransition from '../fx/PageTransition'
import { useLenis } from '@/hooks/useLenis'

const TronGridScene = lazy(() => import('../../scenes/TronGridScene'))

export default function Layout() {
  useLenis()
  return (
    <div className="min-h-screen flex flex-col relative">
      <Suspense fallback={null}>
        <TronGridScene />
      </Suspense>
      <Scanlines />
      <CustomCursor />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-deep focus:text-cyan-neon focus:px-4 focus:py-2 focus:border focus:border-cyan-neon"
      >
        &gt; SKIP_TO_CONTENT
      </a>
      <Nav />
      <main id="main" className="flex-1 pt-20 relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
