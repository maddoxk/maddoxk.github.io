import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import PageTransition from '../fx/PageTransition'
import BootSequence from '../fx/BootSequence'
import { useLenis } from '@/hooks/useLenis'

export default function Layout() {
  useLenis()
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <BootSequence />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-card focus:text-primary focus:px-4 focus:py-2 focus:border focus:border-border"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main" className="flex-1 pt-16 relative z-10">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
