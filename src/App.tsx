import Router from './router'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function App() {
  return (
    <TooltipProvider>
      <Router />
    </TooltipProvider>
  )
}
