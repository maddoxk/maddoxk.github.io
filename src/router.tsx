import { HashRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Gravity = lazy(() => import('./pages/projects/Gravity'))
const Elevator = lazy(() => import('./pages/projects/Elevator'))
const Huffman = lazy(() => import('./pages/projects/Huffman'))
const Hashes = lazy(() => import('./pages/projects/Hashes'))
const Covid = lazy(() => import('./pages/projects/Covid'))
const Search = lazy(() => import('./pages/projects/Search'))

function Fallback() {
  return <div className="p-8 text-cyan-neon">&gt; LOADING...</div>
}

export default function Router() {
  return (
    <HashRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/gravity" element={<Gravity />} />
            <Route path="/projects/elevator" element={<Elevator />} />
            <Route path="/projects/huffman" element={<Huffman />} />
            <Route path="/projects/hashes" element={<Hashes />} />
            <Route path="/projects/covid" element={<Covid />} />
            <Route path="/projects/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  )
}
