import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Nav from './Nav'
import Footer from './Footer'

const TronGridScene = lazy(() => import('../../scenes/TronGridScene'))

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Suspense fallback={null}>
        <TronGridScene />
      </Suspense>
      <Nav />
      <main className="flex-1 pt-20 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
