import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/globals.css'
import { SimplePosApp } from '@/simple-pos'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from './components/auth-provider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <SimplePosApp />
            <Toaster position="bottom-right" />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
)
