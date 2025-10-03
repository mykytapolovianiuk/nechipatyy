import { BrowserRouter } from 'react-router-dom'
import AppRouter from './routes/AppRouter'
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop'
import DevToolsProtection from './components/common/DevToolsProtection/DevToolsProtection'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <DevToolsProtection />
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

